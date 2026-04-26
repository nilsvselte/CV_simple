"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

const eagerRouteCount = 2;

const getInternalRoutes = (routes: string) =>
  Array.from(new Set(routes.split("\n")))
    .map((route) => route.trim())
    .filter((route) => route.startsWith("/") && !route.startsWith("//"));

export function IdleRoutePrefetcher({
  routes,
  delayMs = 1200,
  warmDocuments = false,
}: {
  routes: string[];
  delayMs?: number;
  warmDocuments?: boolean;
}) {
  const router = useRouter();
  const routeKey = routes.join("\n");
  const eagerCount = eagerRouteCount;

  useEffect(() => {
    const internalRoutes = getInternalRoutes(routeKey);

    if (internalRoutes.length === 0) {
      return;
    }

    const connection = (navigator as NavigatorWithConnection).connection;

    if (connection?.saveData) {
      return;
    }

    let cancelled = false;
    const controller = new AbortController();
    let delayId: ReturnType<typeof setTimeout> | undefined;
    let fallbackId: ReturnType<typeof setTimeout> | undefined;
    let eagerId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    const eagerRoutes = internalRoutes.slice(0, eagerCount);
    const idleRoutes = internalRoutes.slice(eagerCount);

    const warmRouteDocuments = async (routesToWarm: string[]) => {
      await Promise.all(
        routesToWarm.map(async (route) => {
          if (cancelled) {
            return;
          }

          try {
            await fetch(route, {
              cache: "force-cache",
              credentials: "same-origin",
              signal: controller.signal,
            });
          } catch (error) {
            if (!controller.signal.aborted) {
              console.warn(`Unable to warm route "${route}".`, error);
            }
          }
        })
      );
    };

    const prefetchRoutes = (routesToPrefetch: string[]) => {
      if (cancelled || routesToPrefetch.length === 0) {
        return;
      }

      for (const route of routesToPrefetch) {
        router.prefetch(route);
      }

      if (warmDocuments) {
        void warmRouteDocuments(routesToPrefetch);
      }
    };

    const prefetchEagerRoutes = () => prefetchRoutes(eagerRoutes);

    const prefetchIdleRoutes = () => {
      if (idleRoutes.length === 0) {
        return;
      }

      prefetchRoutes(idleRoutes);
    };

    const scheduleIdlePrefetch = () => {
      if (idleRoutes.length === 0) {
        return;
      }

      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(prefetchIdleRoutes, {
          timeout: 3000,
        });
        return;
      }

      fallbackId = setTimeout(prefetchIdleRoutes, 0);
    };

    const schedulePrefetch = () => {
      eagerId = setTimeout(prefetchEagerRoutes, 0);
      delayId = setTimeout(scheduleIdlePrefetch, delayMs);
    };

    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", schedulePrefetch, {
        once: true,
      });
    } else {
      schedulePrefetch();
    }

    return () => {
      cancelled = true;
      controller.abort();
      window.removeEventListener("DOMContentLoaded", schedulePrefetch);

      if (eagerId !== undefined) {
        clearTimeout(eagerId);
      }

      if (delayId !== undefined) {
        clearTimeout(delayId);
      }

      if (fallbackId !== undefined) {
        clearTimeout(fallbackId);
      }

      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [delayMs, eagerCount, routeKey, router, warmDocuments]);

  return null;
}

"use client";

import { useId, useState } from "react";
import { Group } from "@visx/group";
import { scaleLinear, scalePoint } from "@visx/scale";

const colors = {
  ink: "#1c1a16",
  muted: "#5c564d",
  line: "#d8d0c2",
  green: "#9dbd6b",
  yellow: "#efd073",
  gold: "#d5b76c",
  final: "#4a4337",
};

const familyColors: Record<string, string> = {
  detector: colors.green,
  ensemble: colors.gold,
  classifier: colors.yellow,
  final: colors.final,
};

function valueOr(value: number | undefined, fallback = 0) {
  return value ?? fallback;
}

function wrapText(value: string, maxLength: number) {
  const words = value.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function wrapAxisLabel(value: string, maxLength: number) {
  if (value.startsWith("+ ")) {
    return [value];
  }

  if (value.length <= maxLength) {
    return [value];
  }

  if (value.includes("-")) {
    const pieces = value.split("-");
    const lines: string[] = [];
    let current = "";

    for (const [index, piece] of pieces.entries()) {
      const segment = index < pieces.length - 1 ? `${piece}-` : piece;
      const next = current ? `${current}${segment}` : segment;

      if (next.length > maxLength && current) {
        lines.push(current);
        current = segment;
      } else {
        current = next;
      }
    }

    if (current) {
      lines.push(current);
    }

    return lines;
  }

  return wrapText(value, maxLength);
}

function buildTrendSegment(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  barWidth: number
) {
  const halfBarWidth = barWidth / 2;

  return {
    x1: startX + halfBarWidth,
    y1: startY,
    x2: endX - halfBarWidth,
    y2: endY,
  };
}

export function ScoreProgressChart({
  points,
  showDots = true,
}: {
  points: Array<{
    name: string;
    shortLabel: string;
    family: string;
    weightedScore: number;
    detail: string;
  }>;
  showDots?: boolean;
}) {
  const [activePoint, setActivePoint] = useState<(typeof points)[number] | null>(
    null
  );
  const chartId = useId().replace(/:/g, "");

  const width = 1280;
  const height = 380;
  const margin = { top: 38, right: 36, bottom: 88, left: 92 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const mobileWidth = 340;
  const mobileHeight = 360;
  const mobileMargin = { top: 34, right: 14, bottom: 104, left: 14 };
  const mobileInnerWidth = mobileWidth - mobileMargin.left - mobileMargin.right;
  const mobileInnerHeight = mobileHeight - mobileMargin.top - mobileMargin.bottom;
  const minY = Math.min(...points.map((point) => point.weightedScore)) - 0.015;
  const maxY = Math.max(...points.map((point) => point.weightedScore)) + 0.01;
  const desktopPatternId = `${chartId}-score-dots-desktop`;
  const mobilePatternId = `${chartId}-score-dots-mobile`;

  const xScale = scalePoint<string>({
    domain: points.map((point) => point.shortLabel),
    range: [0, innerWidth],
    padding: 0.7,
  });

  const yScale = scaleLinear<number>({
    domain: [minY, maxY],
    range: [innerHeight, 0],
  });
  const mobileXScale = scalePoint<string>({
    domain: points.map((point) => point.shortLabel),
    range: [0, mobileInnerWidth],
    padding: 0.38,
  });
  const mobileYScale = scaleLinear<number>({
    domain: [minY, maxY],
    range: [mobileInnerHeight, 0],
  });

  const gridValues = [0.71, 0.75, 0.79, 0.83];
  const mobileGridValues = [0.75, 0.79, 0.83];
  const activeX = activePoint
    ? valueOr(xScale(activePoint.shortLabel)) + margin.left
    : 0;
  const activeY = activePoint
    ? yScale(activePoint.weightedScore) + margin.top
    : 0;
  const tooltipLeftPercent = activePoint
    ? Math.min(Math.max((activeX / width) * 100, 18), 82)
    : 0;
  const tooltipLines = activePoint ? wrapText(activePoint.detail, 34) : [];
  const desktopBarWidth = 48;
  const mobileBarWidth = 26;
  const trendSegments = points.slice(0, -1).map((point, index) => {
    const nextPoint = points[index + 1];

    return buildTrendSegment(
      valueOr(xScale(point.shortLabel)),
      yScale(point.weightedScore),
      valueOr(xScale(nextPoint.shortLabel)),
      yScale(nextPoint.weightedScore),
      desktopBarWidth
    );
  });
  const mobileTrendSegments = points.slice(0, -1).map((point, index) => {
    const nextPoint = points[index + 1];

    return buildTrendSegment(
      valueOr(mobileXScale(point.shortLabel)),
      mobileYScale(point.weightedScore),
      valueOr(mobileXScale(nextPoint.shortLabel)),
      mobileYScale(nextPoint.weightedScore),
      mobileBarWidth
    );
  });

  return (
    <div className="relative">
      <div className="md:hidden">
        <svg viewBox={`0 0 ${mobileWidth} ${mobileHeight}`} className="h-auto w-full">
          <defs>
            <pattern
              id={mobilePatternId}
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1.1" fill="#eadfbc" />
            </pattern>
          </defs>
          {showDots ? (
            <rect width={mobileWidth} height={mobileHeight} fill={`url(#${mobilePatternId})`} />
          ) : null}
          <Group left={mobileMargin.left} top={mobileMargin.top}>
            {mobileGridValues.map((value) => (
              <line
                key={`mobile-grid-${value}`}
                x1={0}
                x2={mobileInnerWidth}
                y1={mobileYScale(value)}
                y2={mobileYScale(value)}
                stroke={colors.line}
                opacity={0.72}
              />
            ))}

            {points.map((point) => {
              const x = valueOr(mobileXScale(point.shortLabel));
              const y = mobileYScale(point.weightedScore);
              const fill = familyColors[point.family] ?? colors.yellow;
              const labelLines = wrapAxisLabel(point.shortLabel, 8);

              return (
                <g key={`mobile-${point.name}`}>
                  <line
                    x1={x}
                    x2={x}
                    y1={y}
                    y2={mobileInnerHeight}
                    stroke={colors.line}
                    opacity={0.82}
                  />
                  <rect
                    x={x - mobileBarWidth / 2}
                    y={y}
                    width={mobileBarWidth}
                    height={mobileInnerHeight - y}
                    fill={fill}
                    stroke={colors.ink}
                    strokeWidth={1.4}
                  />
                  <text
                    x={x}
                    y={mobileInnerHeight + 24}
                    textAnchor="middle"
                    fontSize={9}
                    fill={colors.muted}
                  >
                    {labelLines.map((line, index) => (
                      <tspan
                        key={`${point.name}-label-${index}`}
                        x={x}
                        dy={index === 0 ? 0 : 10}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}

            {mobileTrendSegments.map((segment, index) => (
              <line
                key={`mobile-trend-${points[index].name}-${points[index + 1].name}`}
                x1={segment.x1}
                y1={segment.y1}
                x2={segment.x2}
                y2={segment.y2}
                stroke={colors.ink}
                strokeWidth={2.2}
                strokeDasharray="6 4"
                strokeLinecap="butt"
              />
            ))}

            {points.map((point) => {
              const x = valueOr(mobileXScale(point.shortLabel));
              const y = mobileYScale(point.weightedScore);

              return (
                <g key={`mobile-marker-${point.name}`}>
                  <circle cx={x} cy={y} r={3.5} fill={colors.ink} />
                  <text
                    x={x}
                    y={y - 10}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={700}
                    fill={colors.ink}
                  >
                    {point.weightedScore.toFixed(4)}
                  </text>
                </g>
              );
            })}
          </Group>
        </svg>
      </div>

      <div className="hidden md:block">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full"
          onMouseLeave={() => setActivePoint(null)}
        >
          <defs>
            <pattern
              id={desktopPatternId}
              width="18"
              height="18"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1.2" fill="#eadfbc" />
            </pattern>
          </defs>
          {showDots ? (
            <rect width={width} height={height} fill={`url(#${desktopPatternId})`} />
          ) : null}
          <Group left={margin.left} top={margin.top}>
            {gridValues.map((value) => (
              <g key={value}>
                <line
                  x1={0}
                  x2={innerWidth}
                  y1={yScale(value)}
                  y2={yScale(value)}
                  stroke={colors.line}
                />
                <text
                  x={-38}
                  y={yScale(value) + 5}
                  textAnchor="start"
                  fontSize={12}
                  fill={colors.muted}
                >
                  {value.toFixed(2)}
                </text>
              </g>
            ))}

            {points.map((point) => {
              const x = valueOr(xScale(point.shortLabel));
              const y = yScale(point.weightedScore);
              const fill = familyColors[point.family] ?? colors.yellow;
              const isActive = activePoint?.name === point.name;

              return (
                <g
                  key={point.name}
                  onMouseEnter={() => setActivePoint(point)}
                  onFocus={() => setActivePoint(point)}
                  tabIndex={0}
                >
                  <line
                    x1={x}
                    x2={x}
                    y1={y}
                    y2={innerHeight}
                    stroke={colors.line}
                  />
                  <rect
                    x={x - 24}
                    y={y}
                    width={48}
                    height={innerHeight - y}
                    fill={fill}
                    stroke={colors.ink}
                    strokeWidth={1.5}
                  />
                  <text
                    x={x}
                    y={innerHeight + 28}
                    textAnchor="middle"
                    fontSize={11}
                    fill={isActive ? colors.ink : colors.muted}
                  >
                    {point.shortLabel}
                  </text>
                  <title>{point.detail}</title>
                </g>
              );
            })}

            {trendSegments.map((segment, index) => (
              <line
                key={`trend-${points[index].name}-${points[index + 1].name}`}
                x1={segment.x1}
                y1={segment.y1}
                x2={segment.x2}
                y2={segment.y2}
                stroke={colors.ink}
                strokeWidth={3}
                strokeDasharray="6 4"
                strokeLinecap="butt"
              />
            ))}

            {points.map((point) => {
              const x = valueOr(xScale(point.shortLabel));
              const y = yScale(point.weightedScore);
              const isActive = activePoint?.name === point.name;

              return (
                <g key={`${point.name}-marker`}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? 4.5 : 3.5}
                    fill={colors.ink}
                  />
                  <text
                    x={x}
                    y={y - 14}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill={colors.ink}
                  >
                    {point.weightedScore.toFixed(4)}
                  </text>
                </g>
              );
            })}
          </Group>
        </svg>
      </div>

      {activePoint && (
        <div
          className="pointer-events-none absolute z-10 w-72 border border-black/10 bg-[var(--paper)] px-4 py-3"
          style={{
            left: `${tooltipLeftPercent}%`,
            top: `${(activeY / height) * 100}%`,
            transform: "translate(-50%, calc(-100% - 14px))",
          }}
        >
          <p className="text-[11px] uppercase tracking-[0.18em] text-(--muted)">
            {activePoint.shortLabel}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {tooltipLines.map((line, index) => (
              <span key={`${activePoint.name}-${index}`}>
                {line}
                {index < tooltipLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}

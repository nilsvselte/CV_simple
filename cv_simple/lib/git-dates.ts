import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

type GitDates = {
  publishedAt?: string;
  updatedAt?: string;
};

const fileDateCache = new Map<string, Promise<GitDates>>();

async function getGitLogDate(
  relativePath: string,
  args: string[]
): Promise<string | undefined> {
  try {
    const { stdout } = await execFileAsync("git", [...args, "--", relativePath], {
      cwd: process.cwd(),
    });
    const [date] = stdout
      .trim()
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return date || undefined;
  } catch {
    return undefined;
  }
}

export async function getFileGitDates(relativePath: string): Promise<GitDates> {
  const cached = fileDateCache.get(relativePath);
  if (cached) {
    return cached;
  }

  const promise = (async () => {
    const publishedAt = await getGitLogDate(relativePath, [
      "log",
      "--follow",
      "--reverse",
      "--format=%ad",
      "--date=short",
    ]);
    const updatedAt = await getGitLogDate(relativePath, [
      "log",
      "--follow",
      "-1",
      "--format=%ad",
      "--date=short",
    ]);

    return {
      publishedAt,
      updatedAt,
    };
  })();

  fileDateCache.set(relativePath, promise);
  return promise;
}

export async function getTrackedGitDates(
  relativePaths: string[]
): Promise<GitDates> {
  const uniquePaths = Array.from(new Set(relativePaths));
  const dates = await Promise.all(uniquePaths.map(getFileGitDates));
  const publishedDates = dates
    .map((date) => date.publishedAt)
    .filter((date): date is string => Boolean(date))
    .sort();
  const updatedDates = dates
    .map((date) => date.updatedAt)
    .filter((date): date is string => Boolean(date))
    .sort();

  return {
    publishedAt: publishedDates[0],
    updatedAt: updatedDates.at(-1),
  };
}

import { execFile } from "node:child_process";
import { access } from "node:fs/promises";
import sharp from "sharp";

export async function generatePosterBlur(videoPath, { width = 10 } = {}) {
  if (!Number.isInteger(width) || width < 1) {
    throw new Error("Width must be a positive integer");
  }

  await access(videoPath).catch(() => {
    throw new Error(`Video file not found: ${videoPath}`);
  });

  const frameBuffer = await extractFrame(videoPath);

  if (!frameBuffer.length) {
    throw new Error(
      "ffmpeg produced no output. The file may not contain video streams.",
    );
  }

  const resized = await sharp(frameBuffer).resize({ width }).png().toBuffer();

  return `data:image/png;base64,${resized.toString("base64")}`;
}

function extractFrame(videoPath) {
  return new Promise((resolve, reject) => {
    const proc = execFile(
      "ffmpeg",
      ["-i", videoPath, "-vframes", "1", "-f", "image2pipe", "-vcodec", "png", "pipe:1"],
      { encoding: "buffer", maxBuffer: 10 * 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          if (error.code === "ENOENT") {
            reject(
              new Error(
                "ffmpeg is not installed or not in PATH. Install it: brew install ffmpeg",
              ),
            );
            return;
          }
          const hint = stderr?.toString().split("\n").filter(Boolean).pop() ?? "";
          reject(new Error(`ffmpeg failed to extract frame: ${hint}`));
          return;
        }
        resolve(stdout);
      },
    );
  });
}

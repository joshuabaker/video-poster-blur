#!/usr/bin/env node

import { parseArgs } from "node:util";
import { generatePosterBlur } from "./core.mjs";

const HELP = `Usage: video-poster-blur <video-path> [options]

Generate a Base64 data URI blur placeholder from a video.

Options:
  -w, --width <px>  Width of output image in pixels (default: 10)
  -h, --help        Show this help`;

try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      width: { type: "string", short: "w" },
      help: { type: "boolean", short: "h" },
    },
  });

  if (values.help) {
    console.error(HELP);
    process.exit(0);
  }

  const videoPath = positionals[0];
  if (!videoPath) {
    console.error("Error: video path is required\n");
    console.error(HELP);
    process.exit(1);
  }

  const width = values.width ? parseInt(values.width, 10) : undefined;

  const dataUri = await generatePosterBlur(videoPath, { width });
  process.stdout.write(dataUri);
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}

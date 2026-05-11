# video-poster-blur

CLI tool that generates a Base64 data URI blur placeholder from a video's first frame.

## Quick start

```bash
npm install
node cli/index.mjs <video-path>
```

## Architecture

- `cli/core.mjs` — core logic: spawns ffmpeg to extract the first frame, resizes with sharp, returns a base64 data URI
- `cli/index.mjs` — CLI entry point with arg parsing, prints the data URI to stdout
- `skill/video-poster-blur/SKILL.md` — Claude Code skill definition

## Dependencies

- **sharp** (npm) — image resizing
- **ffmpeg** (system) — video frame extraction

## Conventions

- ESM (`"type": "module"`, `.mjs` extensions)
- No build step
- stdout is reserved for the data URI output; all other messages go to stderr

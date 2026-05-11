---
name: video-poster-blur
description: >
  Generate a blurred placeholder image from a video file for use as an HTML
  video poster attribute. Use when inserting <video> elements and a blur-up
  poster placeholder is needed, or when the user asks for a video poster,
  video placeholder, blur preview, or LQIP from a video.
allowed-tools: [Bash]
---

# video-poster-blur

Generate a tiny Base64 data URI image from a video's first frame. When used as a `poster` attribute and scaled up by the browser, it produces a natural blur-up placeholder effect.

## Prerequisites

- `ffmpeg` must be installed (`brew install ffmpeg`)

## Usage

Run the CLI and capture the output:

```bash
npx @joshuabaker/video-poster-blur path/to/video.mp4
```

With a custom width (default is 10px):

```bash
npx @joshuabaker/video-poster-blur path/to/video.mp4 --width 20
```

The command prints a `data:image/png;base64,...` string to stdout.

## Integration

Insert the output as the `poster` attribute on a `<video>` element:

```html
<video
  src="video.mp4"
  poster="data:image/png;base64,..."
  style="object-fit: cover;"
>
</video>
```

The tiny image will be stretched by the browser, creating a natural blur effect as a loading placeholder.

## Troubleshooting

- **"ffmpeg is not installed"** — Run `brew install ffmpeg`
- **"Video file not found"** — Check the file path is correct and the file exists
- **No output** — The file may not contain a video stream (e.g., audio-only file)

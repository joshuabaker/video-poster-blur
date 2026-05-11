# Video Poster Blur

Blur placeholder images from video files, built on ffmpeg and sharp.

🎬 Grabs the first frame from any video format

🔬 Shrinks it down to a tiny image that blurs naturally when scaled up

📦 Outputs a ready-to-use data URI for `<video poster="...">`

🤖 Includes a Claude Code skill for agent integration

## Prerequisites

[ffmpeg](https://ffmpeg.org/) must be installed:

```bash
brew install ffmpeg
```

## Usage

```bash
npx @joshuabaker/video-poster-blur video.mp4
# data:image/png;base64,iVBORw0KGgo...

npx @joshuabaker/video-poster-blur video.mp4 --width 20
```

### Options

| Flag | Default | Description |
|------|---------|-------------|
| `-w, --width` | `10` | Width of output image in pixels |
| `-h, --help` | | Show help |

## HTML

```html
<video
  src="video.mp4"
  poster="data:image/png;base64,..."
  style="object-fit: cover;"
>
</video>
```

## Claude Code Skill

A Claude Code skill is included at `skill/video-poster-blur/SKILL.md` for agent integration. Install the skill so that Claude Code automatically generates blur posters when inserting `<video>` elements.

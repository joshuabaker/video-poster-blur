# video-poster-blur

Generate a Base64 data URI blur placeholder from a video for use as a `poster` attribute on `<video>` elements.

The tool extracts the first frame of a video, resizes it to a tiny image (default 10px wide), and outputs a Base64 data URI. When the browser scales this tiny image up to fill the video element, it produces a natural blur-up placeholder effect.

## Install

```bash
npm install -g video-poster-blur
```

Requires [ffmpeg](https://ffmpeg.org/) to be installed:

```bash
brew install ffmpeg
```

## Usage

```bash
video-poster-blur video.mp4
# data:image/png;base64,iVBORw0KGgo...

video-poster-blur video.mp4 --width 20
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

## License

MIT

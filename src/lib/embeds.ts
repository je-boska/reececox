/** URL -> embeddable iframe src for video/audio providers. */

export type VideoEmbed =
  | { kind: "youtube" | "vimeo"; src: string }
  | { kind: "unknown"; src: string };

export function resolveVideo(rawUrl: string): VideoEmbed {
  const url = rawUrl.trim();

  // YouTube: youtu.be/ID, watch?v=ID, /embed/ID, /shorts/ID
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i,
  );
  if (yt) {
    return { kind: "youtube", src: `https://www.youtube.com/embed/${yt[1]}` };
  }

  // Vimeo: vimeo.com/123456789 (optionally with /hash)
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/i);
  if (vimeo) {
    const hash = vimeo[2] ? `?h=${vimeo[2]}` : "";
    return {
      kind: "vimeo",
      src: `https://player.vimeo.com/video/${vimeo[1]}${hash}`,
    };
  }

  return { kind: "unknown", src: url };
}

export type AudioEmbed =
  | { kind: "soundcloud" | "bandcamp"; src: string; tall: boolean }
  | { kind: "unknown"; src: string };

export function resolveAudio(rawUrl: string): AudioEmbed {
  const url = rawUrl.trim();

  if (/soundcloud\.com/i.test(url)) {
    // Playlists/sets render taller (visual track list).
    const tall = /\/sets\//i.test(url);
    const params = new URLSearchParams({
      url,
      color: "#000000",
      auto_play: "false",
      hide_related: "true",
      show_comments: "false",
      show_user: "true",
      show_reposts: "false",
      visual: "false",
    });
    return {
      kind: "soundcloud",
      src: `https://w.soundcloud.com/player/?${params.toString()}`,
      tall,
    };
  }

  if (/bandcamp\.com/i.test(url)) {
    // Only a pre-built EmbeddedPlayer URL can be iframed directly.
    if (/EmbeddedPlayer/i.test(url)) {
      return { kind: "bandcamp", src: url, tall: /album=/i.test(url) };
    }
    return { kind: "unknown", src: url };
  }

  return { kind: "unknown", src: url };
}

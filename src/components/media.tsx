import { resolveAudio, resolveVideo } from "@/lib/embeds";
import { urlFor } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";

import styles from "./Viewer.module.css";

const IMG_WIDTHS = [640, 960, 1280, 1600, 2000];

export function SanityPicture({
  image,
  sizes = "(max-width: 768px) 100vw, 60vw",
}: {
  image: SanityImage;
  sizes?: string;
}) {
  if (!image?.asset?.url) return null;

  const asset = image.asset;
  const dims = asset.dimensions;
  const build = (w: number) =>
    urlFor({ asset }).width(w).fit("max").auto("format").url();
  const src = build(1600);
  const srcSet = IMG_WIDTHS.map((w) => `${build(w)} ${w}w`).join(", ");

  return (
    <figure className={styles.figure}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.image}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        width={dims?.width}
        height={dims?.height}
        alt={image.alt ?? ""}
        loading="lazy"
        decoding="async"
        style={
          image.asset.lqip
            ? { backgroundImage: `url(${image.asset.lqip})` }
            : undefined
        }
      />
      {image.caption ? (
        <figcaption className={styles.caption}>{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function FallbackLink({ url, label }: { url: string; label: string }) {
  return (
    <a
      className={styles.fallback}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label} ↗
    </a>
  );
}

export function VideoEmbed({
  url,
  caption,
}: {
  url: string;
  caption?: string;
}) {
  const video = resolveVideo(url);
  if (video.kind === "unknown") {
    return <FallbackLink url={url} label={caption || "Watch video"} />;
  }
  return (
    <figure className={styles.figure}>
      <div className={styles.video}>
        <iframe
          src={video.src}
          title={caption || "Video"}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          allowFullScreen
        />
      </div>
      {caption ? (
        <figcaption className={styles.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function AudioEmbed({
  url,
  caption,
}: {
  url: string;
  caption?: string;
}) {
  const audio = resolveAudio(url);
  if (audio.kind === "unknown") {
    return <FallbackLink url={url} label={caption || "Listen"} />;
  }
  const height =
    audio.kind === "soundcloud"
      ? audio.tall
        ? 450
        : 166
      : audio.tall
        ? 420
        : 120;
  return (
    <figure className={styles.figure}>
      <iframe
        className={styles.audio}
        src={audio.src}
        height={height}
        title={caption || "Audio"}
        loading="lazy"
        allow="autoplay"
      />
      {caption ? (
        <figcaption className={styles.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}

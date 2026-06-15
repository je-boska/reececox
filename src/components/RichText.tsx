import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";

import { AudioEmbed, SanityPicture, VideoEmbed } from "./media";
import styles from "./Viewer.module.css";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => <SanityPicture image={value} />,
    videoEmbed: ({ value }) => (
      <VideoEmbed url={value.url} caption={value.caption} />
    ),
    audioEmbed: ({ value }) => (
      <AudioEmbed url={value.url} caption={value.caption} />
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:/i.test(href);
      return (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className={styles.richText}>
      <PortableText value={value} components={components} />
    </div>
  );
}

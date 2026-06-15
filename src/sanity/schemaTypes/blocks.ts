import { ImageIcon, MicrophoneIcon, VideoIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Rich-text block used inside a project's content. Deliberately flat: a single
 * text style at one size/weight. The ONLY typographic variation allowed on the
 * whole site is bold/italic applied here, inside rich text.
 */
export const richTextBlock = defineArrayMember({
  type: "block",
  styles: [{ title: "Normal", value: "normal" }],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
  ],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
    ],
    annotations: [
      defineArrayMember({
        name: "link",
        type: "object",
        title: "Link",
        fields: [
          defineField({
            name: "href",
            type: "url",
            title: "URL",
            validation: (rule) =>
              rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
          }),
        ],
      }),
    ],
  },
});

export const imageBlock = defineArrayMember({
  type: "image",
  icon: ImageIcon,
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alt text",
      description: "Describe the image for screen readers + SEO.",
    }),
    defineField({
      name: "caption",
      type: "string",
      title: "Caption",
    }),
  ],
  preview: {
    select: { media: "asset", title: "caption", subtitle: "alt" },
    prepare: ({ media, title, subtitle }) => ({
      media,
      title: title || subtitle || "Image",
    }),
  },
});

export const videoEmbed = defineType({
  name: "videoEmbed",
  type: "object",
  title: "Video",
  icon: VideoIcon,
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "Video URL",
      description: "Paste a Vimeo or YouTube link.",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({ name: "caption", type: "string", title: "Caption" }),
  ],
  preview: {
    select: { title: "caption", subtitle: "url" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Video",
      subtitle,
    }),
  },
});

export const audioEmbed = defineType({
  name: "audioEmbed",
  type: "object",
  title: "Audio",
  icon: MicrophoneIcon,
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "Audio URL",
      description:
        "Paste a SoundCloud track/playlist link, or a Bandcamp EmbeddedPlayer URL (from Bandcamp's Share → Embed).",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({ name: "caption", type: "string", title: "Caption" }),
  ],
  preview: {
    select: { title: "caption", subtitle: "url" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Audio",
      subtitle,
    }),
  },
});

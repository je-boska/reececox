// One-off test-data seeder. Run with:
//   node --env-file=.env.local scripts/seed.mjs
//
// Idempotent: every document has a fixed _id and is written with
// createOrReplace inside a single transaction (all-or-nothing). Re-running
// overwrites the same docs. Needs a token with WRITE access (Editor), not just
// the Viewer read token.
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or a Sanity token.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-06-01",
  token,
  useCdn: false,
});

// ---- helpers -------------------------------------------------------------
let k = 0;
const key = () => `k${(k++).toString(36)}`;

const block = (text) => ({
  _type: "block",
  _key: key(),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

const video = (url, caption) => ({
  _type: "videoEmbed",
  _key: key(),
  url,
  ...(caption ? { caption } : {}),
});

const audio = (url, caption) => ({
  _type: "audioEmbed",
  _key: key(),
  url,
  ...(caption ? { caption } : {}),
});

const ref = (id) => ({ _type: "reference", _ref: id });

// LexoRank-compatible, ascending. The plugin can re-rank between these.
const rank = (n) => `0|${(n * 100000).toString(36).padStart(6, "0")}`;

// ---- content -------------------------------------------------------------
const categories = [
  { _id: "category.music", title: "Music", orderRank: rank(1) },
  { _id: "category.performance", title: "Performance", orderRank: rank(2) },
  {
    _id: "category.video",
    title: "Video & Installation",
    orderRank: rank(3),
  },
].map((c) => ({
  _type: "category",
  ...c,
  slug: { _type: "slug", current: c._id.split(".")[1] },
}));

const projects = [
  {
    _id: "project.plaster-cast",
    title: "Plaster Cast",
    year: "2024",
    medium: "Stereo audio, 38 min.",
    category: ref("category.music"),
    orderRank: rank(1),
    content: [
      block(
        "A long-form stereo piece built from field recordings and modular synthesis, released as a single continuous track.",
      ),
      audio(
        "https://soundcloud.com/forss/flickermood",
        "Plaster Cast (excerpt)",
      ),
    ],
  },
  {
    _id: "project.hard-glow",
    title: "Hard Glow",
    year: "2023",
    medium: "Audio",
    category: ref("category.music"),
    orderRank: rank(2),
    content: [
      block("Four tracks of high-contrast club music. Mastered for vinyl."),
      audio("https://soundcloud.com/forss/flickermood"),
    ],
  },
  {
    _id: "project.vanishing-point",
    title: "Vanishing Point",
    year: "2023",
    medium: "Performance, 45 min.",
    category: ref("category.performance"),
    orderRank: rank(1),
    content: [
      block(
        "A solo performance for voice, light and a single subwoofer. Premiered at HAU, Berlin.",
      ),
      video("https://vimeo.com/76979871", "Documentation, HAU Berlin"),
    ],
  },
  {
    _id: "project.interior",
    title: "Interior",
    year: "2022",
    medium: "Single-channel video, 11 min.",
    category: ref("category.video"),
    orderRank: rank(1),
    content: [
      block(
        "A video work shot entirely inside a decommissioned water reservoir.",
      ),
      video("https://www.youtube.com/watch?v=aqz-KE-bpKQ"),
    ],
  },
  {
    // No category -> shows in the ungrouped list at the bottom of the nav.
    _id: "project.untitled-drift",
    title: "Untitled (Drift)",
    year: "2021",
    medium: "Sound installation",
    orderRank: rank(1),
    content: [
      block(
        "An eight-hour generative sound installation. No fixed start or end.",
      ),
    ],
  },
];

const singletons = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Reece Cox",
    description:
      "Reece Cox is an artist working with sound, performance and video.",
  },
  {
    _id: "information",
    _type: "information",
    title: "Information",
    bio: [
      block(
        "Reece Cox is an artist working across sound, performance and video. His work moves between the concert hall, the club and the gallery.",
      ),
      block(
        "He has presented work internationally and releases music on his own imprint.",
      ),
    ],
  },
  {
    _id: "cv",
    _type: "cv",
    title: "CV",
    sections: [
      {
        _type: "cvSection",
        _key: key(),
        heading: "Selected Performances",
        entries: [
          {
            _type: "cvEntry",
            _key: key(),
            year: "2023",
            text: "Vanishing Point, HAU, Berlin",
          },
          {
            _type: "cvEntry",
            _key: key(),
            year: "2022",
            text: "Interior, Berghain (Säule), Berlin",
          },
        ],
      },
      {
        _type: "cvSection",
        _key: key(),
        heading: "Releases",
        entries: [
          {
            _type: "cvEntry",
            _key: key(),
            year: "2024",
            text: "Plaster Cast (LP)",
          },
          { _type: "cvEntry", _key: key(), year: "2023", text: "Hard Glow (EP)" },
        ],
      },
    ],
  },
  {
    _id: "contact",
    _type: "contact",
    title: "Contact",
    email: "studio@reececox.com",
    body: [block("For bookings and enquiries.")],
    links: [
      {
        _type: "link",
        _key: key(),
        label: "Instagram",
        url: "https://instagram.com/",
      },
      {
        _type: "link",
        _key: key(),
        label: "Bandcamp",
        url: "https://bandcamp.com/",
      },
    ],
  },
];

// ---- write ---------------------------------------------------------------
const all = [
  ...categories,
  ...projects.map((p) => ({ _type: "project", ...p })),
  ...singletons,
];
const tx = all.reduce((t, doc) => t.createOrReplace(doc), client.transaction());

try {
  await tx.commit();
  console.log(
    `Seeded ${categories.length} categories, ${projects.length} projects, ${singletons.length} singletons into ${projectId}/${dataset}.`,
  );
} catch (err) {
  console.error("Seed failed:", err.message);
  if (String(err.message).includes("Insufficient permissions")) {
    console.error(
      "\nThe token in .env.local is read-only. Add a write (Editor) token as SANITY_API_WRITE_TOKEN and re-run.",
    );
  }
  process.exit(1);
}

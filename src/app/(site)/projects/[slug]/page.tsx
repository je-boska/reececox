import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stegaClean } from "next-sanity";

import { RichText } from "@/components/RichText";
import styles from "@/components/Viewer.module.css";
import { loadProject } from "@/sanity/load";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await loadProject(slug);
  if (!project) return {};
  return { title: stegaClean(project.title) };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await loadProject(slug);

  if (!project) notFound();

  const metaLine = [project.year, project.medium].filter(Boolean).join(" · ");

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        {metaLine ? <p className={styles.meta}>{metaLine}</p> : null}
      </header>
      <RichText value={project.content} />
    </article>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { NavData, NavProject, SiteSettings } from "@/sanity/types";

import styles from "./SiteShell.module.css";

// "Static" pages — rendered directly below the name, no separator.
const STATIC_LINKS = [
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
];

function ProjectLink({
  project,
  pathname,
  onNavigate,
}: {
  project: NavProject;
  pathname: string;
  onNavigate: () => void;
}) {
  const href = `/projects/${project.slug}`;
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        className={pathname === href ? styles.active : undefined}
      >
        {project.title}
        {project.year ? (
          <span className={styles.year}>, {project.year}</span>
        ) : null}
      </Link>
    </li>
  );
}

function NavContent({
  title,
  nav,
  pathname,
  open,
  onNavigate,
}: {
  title: string;
  nav: NavData;
  pathname: string;
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <nav
      id="site-nav"
      className={`${styles.nav} ${open ? styles.navOpen : ""}`}
      aria-label="Navigation"
    >
      {/* Name links to the Info / about page. */}
      <Link
        href="/info"
        className={pathname === "/info" ? styles.active : undefined}
        onClick={onNavigate}
      >
        {title}
      </Link>

      <ul className={styles.list}>
        {STATIC_LINKS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={pathname === item.href ? styles.active : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {nav.categories.map((cat) => (
        <div key={cat._id} className={styles.group}>
          <div className={styles.groupHeading}>{cat.title}</div>
          <ul className={styles.list}>
            {cat.projects.map((project) => (
              <ProjectLink
                key={project._id}
                project={project}
                pathname={pathname}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      ))}

      {nav.uncategorized.length > 0 ? (
        <div className={styles.group}>
          <ul className={styles.list}>
            {nav.uncategorized.map((project) => (
              <ProjectLink
                key={project._id}
                project={project}
                pathname={pathname}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}

export function SiteShell({
  settings,
  nav,
  children,
}: {
  settings: SiteSettings | null;
  nav: NavData;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const title = settings?.title || "Reece Cox";

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <Link href="/info">{title}</Link>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <NavContent
        title={title}
        nav={nav}
        pathname={pathname}
        open={open}
        onNavigate={() => setOpen(false)}
      />

      <div
        className={`${styles.scrim} ${open ? styles.scrimOpen : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <main className={styles.viewer}>{children}</main>
    </div>
  );
}

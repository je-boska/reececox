"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { NavProject, SiteSettings } from "@/sanity/types";

import styles from "./SiteShell.module.css";

const META_LINKS = [
  { href: "/information", label: "Information" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
];

function NavContent({
  title,
  projects,
  pathname,
  open,
  onNavigate,
}: {
  title: string;
  projects: NavProject[];
  pathname: string;
  open: boolean;
  onNavigate: () => void;
}) {
  const isActive = (href: string) => pathname === href;

  return (
    <nav
      id="site-nav"
      className={`${styles.nav} ${open ? styles.navOpen : ""}`}
      aria-label="Projects and pages"
    >
      <Link href="/" className={styles.brand} onClick={onNavigate}>
        {title}
      </Link>

      <ul className={styles.list}>
        {projects.map((project) => {
          const href = `/projects/${project.slug}`;
          return (
            <li key={project._id}>
              <Link
                href={href}
                onClick={onNavigate}
                className={isActive(href) ? styles.active : styles.link}
              >
                {project.title}
                {project.year ? (
                  <span className={styles.year}>, {project.year}</span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className={styles.meta}>
        {META_LINKS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={isActive(item.href) ? styles.active : styles.link}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteShell({
  settings,
  projects,
  children,
}: {
  settings: SiteSettings | null;
  projects: NavProject[];
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
        <Link href="/" className={styles.brand}>
          {title}
        </Link>
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
        projects={projects}
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

import styles from "./Viewer.module.css";

/** Shown in place of content until Sanity env vars are configured. */
export function SetupNotice() {
  return (
    <div className={styles.notice}>
      <h1>Connect Sanity to finish setup</h1>
      <p>
        The site is running, but no Sanity project is configured yet. Copy{" "}
        <code>.env.local.example</code> to <code>.env.local</code> and fill in
        your <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>, then restart the dev
        server.
      </p>
      <p>
        See <code>AGENTS.md</code> for the full Sanity + Vercel setup steps.
      </p>
    </div>
  );
}

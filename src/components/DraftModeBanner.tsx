/** Small fixed banner shown only while draft/preview mode is active. */
export function DraftModeBanner() {
  return (
    <a
      href="/api/draft-mode/disable"
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "#000",
        color: "#fff",
        padding: "0.4rem 0.8rem",
        fontSize: "0.8125rem",
        textDecoration: "none",
      }}
    >
      Previewing drafts — exit
    </a>
  );
}

"use client";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            margin: 0,
            background: "#f8faf8",
            color: "#0f2318",
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <section
            style={{
              width: "100%",
              maxWidth: 560,
              border: "1px solid #d1fae5",
              borderRadius: 24,
              background: "#ffffff",
              padding: 32,
              textAlign: "center",
              boxShadow: "0 18px 45px rgba(15, 35, 24, 0.08)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 700,
                color: "#15803d",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Comfort Health
            </p>
            <h1
              style={{
                margin: "10px 0 0",
                fontSize: 28,
                lineHeight: 1.2,
                fontWeight: 700,
              }}
            >
              This page could not load
            </h1>
            <p
              style={{
                margin: "12px auto 0",
                maxWidth: 420,
                fontSize: 15,
                lineHeight: 1.6,
                color: "#475569",
              }}
            >
              An unexpected server error occurred. Please try again in a moment.
            </p>
            <button
              type="button"
              onClick={() => unstable_retry()}
              style={{
                marginTop: 24,
                minHeight: 44,
                border: 0,
                borderRadius: 999,
                background: "#15803d",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
                padding: "0 22px",
              }}
            >
              Retry
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}

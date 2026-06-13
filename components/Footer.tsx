"use client";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "clamp(3rem, 6vw, 5rem) 0 clamp(2rem, 4vw, 3rem)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div className="section-container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "0.75rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.3rem",
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                Wit
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.3rem",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                ness
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: "var(--text-tertiary)",
                lineHeight: 1.6,
              }}
            >
              The Trust Layer for Breaking News
            </p>
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              gap: "clamp(2rem, 4vw, 4rem)",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                heading: "Product",
                links: ["How It Works", "Reality Report", "Narrative Analysis"],
              },
              {
                heading: "Company",
                links: ["Manifesto", "About", "Careers"],
              },
              {
                heading: "Legal",
                links: ["Privacy", "Terms"],
              },
            ].map((group) => (
              <div key={group.heading}>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {group.heading}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {group.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.82rem",
                        color: "var(--text-tertiary)",
                        textDecoration: "none",
                        transition: "color 200ms ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-tertiary)";
                      }}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            marginTop: "clamp(2rem, 4vw, 4rem)",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
            }}
          >
            © {new Date().getFullYear()} Witness. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              fontStyle: "italic",
            }}
          >
            Truth shouldn&apos;t depend on who published it.
          </p>
        </div>
      </div>
    </footer>
  );
}

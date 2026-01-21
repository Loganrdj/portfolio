import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import "../../App.css";

export default function ProjectModal({ project, onClose }) {
  const modalRoot = document.getElementById("modal-root");

  const media = useMemo(() => {
    if (!project) return [];
    if (Array.isArray(project.media)) return project.media.filter(Boolean);
    return [];
  }, [project]);

  const hero = media[0] || null;
  const stack = useMemo(() => media.slice(1, 3), [media]);
  const rest = useMemo(() => media.slice(3), [media]);

  // ESC closes modal
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [project]);

  if (!project || !modalRoot) return null;

  const {
    name,
    description,
    deployed_url,
    deployed_tag,
    github_url,
    github_tag, // optional custom label
    clip_url, // optional video/clip
    clip_tag, // optional label
  } = project;

  const modalContent = (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="experience-modal pmModal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "1100px", width: "92vw" }}
      >
        {/* Header row */}
        <div
          className="pmHeaderRow"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ margin: 0 }}>{name}</h3>
          </div>

          {/* Action buttons + close */}
          <div
            className="pmActionRow"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {deployed_url && (
              <a
                href={deployed_url}
                target="_blank"
                rel="noopener noreferrer"
                className="buttonClass"
              >
                {deployed_tag || "Lookbook"}
              </a>
            )}

            {clip_url && (
              <a
                href={clip_url}
                target="_blank"
                rel="noopener noreferrer"
                className="buttonClass"
              >
                {clip_tag || "Video"}
              </a>
            )}

            {github_url && (
              <a
                href={github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="buttonClass"
              >
                {github_tag || "Github"}
              </a>
            )}

            <div
              className="modal-close"
              onClick={onClose}
              style={{
                position: "static",
                marginLeft: "2px",
                alignSelf: "center",
              }}
              title="Close"
              aria-label="Close"
              role="button"
            >
              &times;
            </div>
          </div>
        </div>

        {description && <p className="pmDesc" style={{ marginTop: "10px" }}>{description}</p>}

        {/* Gallery */}
        {media.length > 0 && (
          <div className="pmGalleryWrap">
            {/* Top hero + right stack */}
            {hero && (
              <div className="pmHeroSection">
                <div className="pmThumb pmThumb--hero" role="img" aria-label={`${name} 1`}>
                  <img
                    src={hero}
                    alt={`${name} 1`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                    }}
                  />
                </div>

                <div className="pmHeroStack">
                  {stack.map((src, idx) => (
                    <div
                      key={`${src}-${idx}`}
                      className="pmThumb pmThumb--stack"
                      role="img"
                      aria-label={`${name} ${idx + 2}`}
                    >
                      <img
                        src={src}
                        alt={`${name} ${idx + 2}`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          display: "block",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Remaining grid */}
            {rest.length > 0 && (
              <div className="pmGallery">
                {rest.map((src, idx) => (
                  <div
                    key={`${src}-${idx}`}
                    className="pmThumb"
                    role="img"
                    aria-label={`${name} ${idx + 4}`}
                  >
                    <img
                      src={src}
                      alt={`${name} ${idx + 4}`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, modalRoot);
}

import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import "../../App.css";

export default function ProjectModal({ project, onClose }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const modalRoot = document.getElementById("modal-root");

  
  const media = useMemo(() => {
    if (!project) return [];
    if (Array.isArray(project.media)) return project.media.filter(Boolean);
    return [];
  }, [project]);

  const hero = media[0] || null;
  const stack = useMemo(() => media.slice(1, 3), [media]);
  const rest = useMemo(() => media.slice(3), [media]);

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxSrc(null);
  };

  const openLightbox = (src) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
  };

  // ESC closes lightbox first, then modal
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (lightboxOpen) closeLightbox();
        else onClose?.();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, onClose]);

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

          {/* Action buttons + close (keep your old button style) */}
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

            {/* Keep your original X styling */}
            <div
              className="modal-close"
              onClick={onClose}
              style={{
                position: "static", // inline with the buttons
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
            {/* Top hero + right stack (this removes the big white void) */}
            {hero && (
              <div className="pmHeroSection">
                <button
                  type="button"
                  className="pmThumb pmThumb--hero"
                  onClick={() => openLightbox(hero)}
                >
                  <img
                    src={hero}
                    alt={`${name} 1`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // ✅ cover photos
                      objectPosition: "center",
                      display: "block",
                    }}
                  />
                </button>

                <div className="pmHeroStack">
                  {stack.map((src, idx) => (
                    <button
                      key={`${src}-${idx}`}
                      type="button"
                      className="pmThumb pmThumb--stack"
                      onClick={() => openLightbox(src)}
                    >
                      <img
                        src={src}
                        alt={`${name} ${idx + 2}`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover", // ✅ cover photos
                          objectPosition: "center",
                          display: "block",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Remaining grid */}
            {rest.length > 0 && (
              <div className="pmGallery">
                {rest.map((src, idx) => (
                  <button
                    key={`${src}-${idx}`}
                    type="button"
                    className="pmThumb"
                    onClick={() => openLightbox(src)}
                  >
                    <img
                      src={src}
                      alt={`${name} ${idx + 4}`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // ✅ cover photos
                        objectPosition: "center",
                        display: "block",
                      }}
                    />
                  </button>
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

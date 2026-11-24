import React, { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { sizedImage } from "../utils/imageUrl";

// Full-screen photo viewer: arrows / swipe / keyboard to move between photos,
// zoom with buttons, mouse wheel or double-click/double-tap, drag to pan when
// zoomed, and a thumbnail strip at the bottom.
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

const PhotoLightbox = ({ images = [], startIndex = 0, title = "", onClose }) => {
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef(null);
  const touch = useRef(null);
  const lastTap = useRef(0);
  const thumbsRef = useRef(null);

  const count = images.length;
  const resetView = () => { setZoom(1); setOffset({ x: 0, y: 0 }); };
  const go = (dir) => { resetView(); setIndex((i) => (i + dir + count) % count); };
  const setZoomClamped = (z) => {
    const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
    setZoom(next);
    if (next === 1) setOffset({ x: 0, y: 0 });
  };

  // Keyboard + lock page scroll while open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "+" || e.key === "=") setZoomClamped(zoom + 0.5);
      else if (e.key === "-") setZoomClamped(zoom - 0.5);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, count]);

  // Keep the active thumbnail in view
  useEffect(() => {
    thumbsRef.current?.children?.[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  if (!count) return null;

  const onWheel = (e) => setZoomClamped(zoom + (e.deltaY < 0 ? 0.25 : -0.25));
  const onMouseDown = (e) => { if (zoom > 1) drag.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }; };
  const onMouseMove = (e) => { if (drag.current) setOffset({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y }); };
  const onMouseUp = () => { drag.current = null; };

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, ox: offset.x, oy: offset.y };
    const now = Date.now();
    if (now - lastTap.current < 300) setZoomClamped(zoom > 1 ? 1 : 2.5); // double-tap
    lastTap.current = now;
  };
  const onTouchMove = (e) => {
    if (!touch.current || zoom <= 1) return;
    const t = e.touches[0];
    setOffset({ x: touch.current.ox + t.clientX - touch.current.x, y: touch.current.oy + t.clientY - touch.current.y });
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (zoom <= 1 && Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); // swipe
    touch.current = null;
  };

  const btn = "p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition disabled:opacity-30";

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col select-none" role="dialog" aria-modal="true" aria-label={title || "Photo viewer"}>
      {/* Top bar */}
      <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-3 text-white">
        <div className="min-w-0">
          {title && <p className="font-bold text-sm sm:text-base truncate">{title}</p>}
          <p className="text-xs text-gray-400">{index + 1} / {count}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className={btn} onClick={() => setZoomClamped(zoom - 0.5)} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out"><ZoomOut size={18} /></button>
          <span className="text-xs w-10 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
          <button className={btn} onClick={() => setZoomClamped(zoom + 0.5)} disabled={zoom >= MAX_ZOOM} aria-label="Zoom in"><ZoomIn size={18} /></button>
          <button className={btn} onClick={resetView} disabled={zoom === 1} aria-label="Reset zoom"><RotateCcw size={18} /></button>
          <button className={`${btn} ml-2`} onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>
      </div>

      {/* Photo */}
      <div
        className={`relative flex-1 overflow-hidden flex items-center justify-center ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
        onWheel={onWheel}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        onDoubleClick={() => setZoomClamped(zoom > 1 ? 1 : 2.5)}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      >
        <img
          src={sizedImage(images[index], 2400)}
          alt={`${title} photo ${index + 1}`}
          draggable={false}
          className="max-w-full max-h-full object-contain transition-transform duration-150"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}
        />
        {count > 1 && (
          <>
            <button onClick={() => go(-1)} className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white" aria-label="Previous photo"><ChevronLeft size={24} /></button>
            <button onClick={() => go(1)} className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white" aria-label="Next photo"><ChevronRight size={24} /></button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <div ref={thumbsRef} className="flex gap-2 overflow-x-auto no-scrollbar px-3 sm:px-6 py-3 w-fit max-w-full mx-auto">
          {images.map((src, i) => (
            <button key={i} onClick={() => { resetView(); setIndex(i); }}
              className={`shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition ${i === index ? "border-amber-400 opacity-100" : "border-transparent opacity-50 hover:opacity-90"}`}
              aria-label={`Photo ${i + 1}`}>
              <img src={sizedImage(src, 240)} alt="" className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoLightbox;

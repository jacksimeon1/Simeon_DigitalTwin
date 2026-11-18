'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  Lock,
  Eye,
  Layers,
  Globe,
  ExternalLink,
  Github,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
} from 'lucide-react';

export interface ScreenshotItem {
  id: number;
  file: string;
  alt: string;
  title: string;
  subtitle: string;
  badge: string;
}

export const ROOM_3D_SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 1,
    file: '/3droom.jpg',
    alt: '3D Isometric Room & Studio Living Sanctuary',
    title: 'Isometric 3D Room & Studio Sanctuary',
    subtitle: 'Interactive 3D living sanctuary with camera rotation, dynamic lighting presets, multi-channel TV & relaxing ambient soundscapes',
    badge: 'Interactive 3D Room',
  },
];

export const OFF_CAMPUS_SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 1,
    file: '/pics-works/i1.png',
    alt: 'SPUP Activity User Login Screen',
    title: 'Portal Authentication',
    subtitle: 'Secure institutional access control and user credential validation',
    badge: 'Screen 01 of 06',
  },
  {
    id: 2,
    file: '/pics-works/i2.png',
    alt: 'SPUP Activity Admin Dashboard & Quick Actions',
    title: 'Admin Control Center',
    subtitle: 'Real-time metrics, active registrations, and quick workflow actions',
    badge: 'Screen 02 of 06',
  },
  {
    id: 3,
    file: '/pics-works/i3.png',
    alt: 'SPUP Activity Scheduling Calendar',
    title: 'Interactive Schedule Calendar',
    subtitle: 'Institution-wide calendar view for on/off-campus event logistics',
    badge: 'Screen 03 of 06',
  },
  {
    id: 4,
    file: '/pics-works/i4.png',
    alt: 'SPUP Activity Analytics Dashboard',
    title: 'Analytics & Insights',
    subtitle: 'Approval rates (62.5%), monthly activity trends, and status charts',
    badge: 'Screen 04 of 06',
  },
  {
    id: 5,
    file: '/pics-works/i5.png',
    alt: 'SPUP Activity User Panel Overview',
    title: 'User Panel & Submissions',
    subtitle: 'Submission history, draft tracking, and multi-level approval pipeline',
    badge: 'Screen 05 of 06',
  },
  {
    id: 6,
    file: '/pics-works/i6.png',
    alt: 'SPUP Activity Submit New Activity Form',
    title: 'Activity Proposal Form',
    subtitle: 'Comprehensive multi-field activity submission and scheduling form',
    badge: 'Screen 06 of 06',
  },
];

export const SANTO_NINO_SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 1,
    file: '/pic2/1.png',
    alt: 'Santo Niño Citizen Portal Login Screen',
    title: 'Citizen Portal Login',
    subtitle: 'Secure municipal authentication for residents and permit applicants',
    badge: 'Screen 01 of 06',
  },
  {
    id: 2,
    file: '/pic2/2.png',
    alt: 'Santo Niño Citizen Registration & ID Upload',
    title: 'Citizen Registration & ID Verification',
    subtitle: 'Resident account creation with valid ID upload & security questions',
    badge: 'Screen 02 of 06',
  },
  {
    id: 3,
    file: '/pic2/3.png',
    alt: 'Santo Niño Municipal Admin Dashboard',
    title: 'Municipal Admin Dashboard',
    subtitle: 'Permitting cycle metrics, review queues, and account moderation',
    badge: 'Screen 03 of 06',
  },
  {
    id: 4,
    file: '/pic2/4.png',
    alt: 'Santo Niño Application Reviews & Payment Processing',
    title: 'Application Reviews & Payments',
    subtitle: 'Permit evaluations, administrative overrides, and payment verification',
    badge: 'Screen 04 of 06',
  },
  {
    id: 5,
    file: '/pic2/5.png',
    alt: 'Santo Niño Revenue & Activity Reports',
    title: 'Revenue & Activity Reports',
    subtitle: 'Auditing tools, application inventory filters, and exportable PDF summaries',
    badge: 'Screen 05 of 06',
  },
  {
    id: 6,
    file: '/pic2/6.png',
    alt: 'Santo Niño Building Permit Application Form',
    title: 'Building Permit Application Form',
    subtitle: 'Detailed construction specs with blueprint / floor plan (PDF) upload',
    badge: 'Screen 06 of 06',
  },
];

export const CAPSTONE_AI_SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 1,
    file: '/3/1.png',
    alt: 'Capstone Title AI Landing & Heuristic Verification Sandbox',
    title: 'AI Title Verification Sandbox & Heuristic Engine',
    subtitle: 'Intelligent capstone title generator, heuristic validator & academic research assistant',
    badge: 'Screen 01 of 02',
  },
  {
    id: 2,
    file: '/3/2.png',
    alt: 'Academic Title Synthesis Engine & Formulation Parameters',
    title: 'Academic Title Synthesis Engine',
    subtitle: 'Formulate defensible titles tailored by program, project type, and target beneficiaries',
    badge: 'Screen 02 of 02',
  },
];

export const SIP_3D_SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 1,
    file: '/3dd/1.png',
    alt: 'SIP 3D Crisp Pear & Mint Flavor Showcase',
    title: 'Crisp Pear & Mint • 360° Cylinder Physics',
    subtitle: 'Interactive 3D can animation with organic fruit floating particles & natural brew metrics',
    badge: 'Flavor 01 of 03',
  },
  {
    id: 2,
    file: '/3dd/2.png',
    alt: 'SIP 3D Midnight Red Apple Flavor Showcase',
    title: 'Midnight Red Apple • Dynamic Kinetic Typography',
    subtitle: 'Crisp harvest theme with automated camera orbit, effervescent bubbles & synchronized soundscapes',
    badge: 'Flavor 02 of 03',
  },
  {
    id: 3,
    file: '/3dd/3.png',
    alt: 'SIP 3D Tropical Exotic Flavor Showcase',
    title: 'Tropical Exotic • Ambient Flavor Aura',
    subtitle: 'Solar-infused passionfruit blend featuring interactive lighting, 360° drag-to-spin & fluid transition effects',
    badge: 'Flavor 03 of 03',
  },
];

interface ProjectImageScrollerProps {
  systemKey?: 'off-campus' | 'santo-nino' | 'capstone-ai' | 'sip-3d' | '3d-room';
  onOpenModal?: (index: number) => void;
}

export default function ProjectImageScroller({
  systemKey = 'off-campus',
  onOpenModal,
}: ProjectImageScrollerProps) {
  const isRoom3d = systemKey === '3d-room';
  const isSantoNino = systemKey === 'santo-nino';
  const isCapstoneAi = systemKey === 'capstone-ai';
  const isSip3d = systemKey === 'sip-3d';

  const screenshots = isRoom3d
    ? ROOM_3D_SCREENSHOTS
    : isSip3d
    ? SIP_3D_SCREENSHOTS
    : isCapstoneAi
    ? CAPSTONE_AI_SCREENSHOTS
    : isSantoNino
    ? SANTO_NINO_SCREENSHOTS
    : OFF_CAMPUS_SCREENSHOTS;

  const domain = isRoom3d
    ? 'jacksimeon1.github.io/3D-Room'
    : isSip3d
    ? 'jacksimeon1.github.io/3d-can-animation'
    : isCapstoneAi
    ? 'jacksimeon1.github.io/capstone-title-ai'
    : isSantoNino
    ? 'santonino-permit.gov.ph'
    : 'spup-activity.internal';

  const systemName = isRoom3d
    ? '3D Isometric Room & Studio'
    : isSip3d
    ? 'SIP 3D Beverage Showcase'
    : isCapstoneAi
    ? 'Capstone Title AI Platform'
    : isSantoNino
    ? 'Santo Niño Building Permit System'
    : 'SPUP Activity Scheduling System';

  const liveUrl = isRoom3d
    ? 'https://jacksimeon1.github.io/3D-Room/'
    : isSip3d
    ? 'https://jacksimeon1.github.io/3d-can-animation/'
    : isCapstoneAi
    ? 'https://jacksimeon1.github.io/capstone-title-ai/'
    : '';

  const githubUrl = isRoom3d
    ? 'https://github.com/jacksimeon1/3D-Room'
    : isSip3d
    ? 'https://github.com/jacksimeon1/3d-can-animation'
    : isCapstoneAi
    ? 'https://github.com/jacksimeon1/capstone-title-ai'
    : '';

  const labelPrefix = isRoom3d ? '3d' : isSip3d ? 'f' : isCapstoneAi ? 'v' : isSantoNino ? '#' : 'i';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // High-Resolution Zoom & Pan States
  const [isMounted, setIsMounted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const total = screenshots.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play interval: every 3.5 seconds when not hovered and active
  useEffect(() => {
    if (!isAutoPlaying || isHovered || total <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, nextSlide, total]);

  // Reset zoom & pan when opening or navigating between images in lightbox
  useEffect(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, [lightboxIndex]);

  // Body scroll lock while lightbox is active
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight' && total > 1) setLightboxIndex((prev) => (prev !== null ? (prev + 1) % total : 0));
      if (e.key === 'ArrowLeft' && total > 1) setLightboxIndex((prev) => (prev !== null ? (prev - 1 + total) % total : 0));
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
      if (e.key === '0') handleResetZoom();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, total]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    if (onOpenModal) onOpenModal(index);
  };

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomLevel((prev) => Math.min(Number((prev + 0.5).toFixed(2)), 3.5));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomLevel((prev) => {
      const next = Math.max(Number((prev - 0.5).toFixed(2)), 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isDragging) return;
    if (zoomLevel === 1) {
      setZoomLevel(2);
    } else {
      handleResetZoom();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => {
      const delta = e.deltaY < 0 ? 0.3 : -0.3;
      const next = Math.min(Math.max(Number((prev + delta).toFixed(2)), 1), 3.5);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  // Drag to pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...panOffset };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    e.preventDefault();
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPanOffset({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full my-2.5 select-none">
      {/* Privacy / Open Source Notice Banner - compact */}
      {liveUrl ? (
        <div className="mb-2 flex items-center justify-between gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span className="font-semibold">Open Source • Live Web App</span>
          </div>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-semibold flex items-center gap-1 hover:underline"
          >
            <span>Visit Live Site</span>
            <ExternalLink size={9} />
          </a>
        </div>
      ) : (
        <div className="mb-2 flex items-center justify-between gap-1.5 px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px]">
          <div className="flex items-center gap-1">
            <Lock size={10} className="shrink-0 text-amber-600 dark:text-amber-400" />
            <span className="font-semibold">Private System</span>
          </div>
          <span className="text-[9px] text-amber-700/80 dark:text-amber-300/80 truncate">
            Interactive Screenshots ({isSantoNino ? '1–6' : 'i1–i6'})
          </span>
        </div>
      )}

      {/* Mockup Frame Container - compact landscape */}
      <div
        className="group relative rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-900 overflow-hidden shadow-sm transition-all duration-300 hover:border-purple-500/40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Mockup Top Window Bar */}
        <div className="flex items-center justify-between px-2.5 py-1 bg-neutral-800/90 dark:bg-black/70 border-b border-white/5 backdrop-blur-sm">
          {/* macOS 3 dots */}
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2 h-2 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {/* Simulated address bar */}
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[9px] text-emerald-300 hover:text-white hover:bg-emerald-500/20 font-mono transition-colors"
              title="Open live website"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe size={8} className="text-emerald-400 shrink-0" />
              <span className="truncate max-w-[100px] xs:max-w-[150px] sm:max-w-[180px]">{domain}</span>
            </a>
          ) : (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-neutral-300 font-mono">
              <Lock size={8} className="text-emerald-400 shrink-0" />
              <span className="truncate max-w-[100px] xs:max-w-[150px] sm:max-w-[170px]">{domain}</span>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-0.5">
            {total > 1 && (
              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                title={isAutoPlaying ? 'Pause animation' : 'Play animation'}
                className="p-0.5 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                {isAutoPlaying ? <Pause size={9} /> : <Play size={9} />}
              </button>
            )}
            <button
              type="button"
              onClick={() => handleOpenLightbox(currentIndex)}
              title="Expand and zoom screenshot"
              className="p-0.5 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Maximize2 size={9} />
            </button>
          </div>
        </div>

        {/* Main Screenshot Viewport - Compact Responsive Aspect Ratio */}
        <div
          className="relative w-full aspect-[2/1] sm:aspect-[2.4/1] md:aspect-[2.5/1] bg-neutral-950 overflow-hidden cursor-pointer"
          onClick={() => handleOpenLightbox(currentIndex)}
        >
          {screenshots.map((screen, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={screen.id}
                className={`absolute inset-0 transition-opacity duration-600 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screen.file}
                  alt={screen.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />

                {/* Subtle bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                {/* Bottom caption overlay - compact */}
                <div className="absolute bottom-0 inset-x-0 p-2 flex items-end justify-between gap-1.5 text-white">
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-purple-600/90 backdrop-blur-md text-[8px] font-semibold tracking-wider uppercase mb-0.5">
                      <Layers size={8} />
                      <span>{screen.badge}</span>
                    </div>
                    <h4 className="text-[11px] font-bold drop-shadow text-white truncate">
                      {screen.title}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenLightbox(currentIndex);
                    }}
                    aria-label="Zoom into screenshot"
                    className="shrink-0 inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-white/20 hover:bg-purple-600 text-white font-semibold backdrop-blur-md transition-all duration-200 hover:scale-105 shadow cursor-pointer ring-1 ring-white/25"
                    title="Click to zoom full screenshot"
                  >
                    <ZoomIn size={10} />
                    <span>Zoom</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Left / Right Arrow Buttons - sleek compact (only if multiple) */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Previous screenshot"
                className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-black/60 hover:bg-purple-600 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-70 group-hover:opacity-100 shadow"
              >
                <ChevronLeft size={12} />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Next screenshot"
                className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-black/60 hover:bg-purple-600 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-70 group-hover:opacity-100 shadow"
              >
                <ChevronRight size={12} />
              </button>
            </>
          )}
        </div>

        {/* Compact Navigation Bar: Filmstrip pills + counter */}
        <div className="px-2 py-1 bg-neutral-900 border-t border-white/5 flex items-center justify-between gap-1">
          {/* Scrolling thumbnail pills */}
          <div className="flex items-center gap-1 flex-1 overflow-x-auto py-0.5 no-scrollbar">
            {screenshots.map((screen, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={screen.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`group/thumb flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium transition-all shrink-0 ${
                    active
                      ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-400'
                      : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="font-mono text-[8px]">
                    {labelPrefix}{total > 1 ? screen.id : ''}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Lightbox Trigger */}
          <button
            type="button"
            onClick={() => handleOpenLightbox(currentIndex)}
            className="shrink-0 text-[9px] text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-purple-500/10 transition-colors"
          >
            <ZoomIn size={9} />
            <span>Zoom & Full ({total})</span>
          </button>
        </div>
      </div>

      {/* ── HIGH-RESOLUTION FULLSCREEN LIGHTBOX & INTERACTIVE ZOOM MODAL (PORTAL) ── */}
      {isMounted &&
        lightboxIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-black/95 backdrop-blur-2xl p-2 sm:p-4 md:p-5 text-white animate-fade-in select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Modal Header Bar */}
            <div
              className="w-full max-w-6xl flex items-center justify-between pb-2 sm:pb-3 border-b border-white/10 gap-2 sm:gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <span className="px-2 py-0.5 rounded bg-purple-600 text-[10px] sm:text-xs font-bold font-mono shrink-0 shadow">
                  {screenshots[lightboxIndex].badge}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-white truncate">
                    {screenshots[lightboxIndex].title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-400 truncate hidden sm:block">
                    {screenshots[lightboxIndex].subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                  >
                    <Github size={12} />
                    <span>Source Code</span>
                  </a>
                )}
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-sm"
                  >
                    <Globe size={11} />
                    <span>Live Demo</span>
                    <ExternalLink size={10} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close modal"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Interactive Zoom Toolbar */}
            <div
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-neutral-900/90 border border-white/15 backdrop-blur-md shadow-2xl text-white my-1 sm:my-2 z-30 scale-90 sm:scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                title="Zoom Out (-)"
                className="p-1.5 rounded-full hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white cursor-pointer"
              >
                <ZoomOut size={15} />
              </button>

              <span className="font-mono text-xs font-semibold px-2 min-w-[50px] text-center text-purple-300">
                {Math.round(zoomLevel * 100)}%
              </span>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3.5}
                title="Zoom In (+)"
                className="p-1.5 rounded-full hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white cursor-pointer"
              >
                <ZoomIn size={15} />
              </button>

              <div className="w-[1px] h-4 bg-white/20 mx-1" />

              <button
                type="button"
                onClick={handleResetZoom}
                title="Reset Zoom (100%)"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>

              {zoomLevel > 1 && (
                <span className="inline-flex items-center gap-1 text-[11px] text-neutral-400 pl-2 border-l border-white/20 hidden sm:inline-flex">
                  <Move size={12} />
                  <span>Drag to pan</span>
                </span>
              )}
            </div>

            {/* Main Interactive Zoomable Image Viewport */}
            <div
              className={`relative w-full max-w-6xl flex-1 min-h-[300px] flex items-center justify-center overflow-hidden rounded-xl bg-neutral-950/60 border border-white/5 ${
                zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
              }`}
              onClick={handleImageClick}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screenshots[lightboxIndex].file}
                alt={screenshots[lightboxIndex].alt}
                draggable={false}
                style={{
                  transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0px) scale(${zoomLevel})`,
                  transition: isDragging ? 'none' : 'transform 0.22s cubic-bezier(0.2, 0.9, 0.4, 1)',
                  transformOrigin: 'center center',
                }}
                className="max-w-full max-h-[66vh] object-contain rounded-lg shadow-2xl border border-white/10 pointer-events-auto select-none"
              />

              {/* Prev / Next navigation arrows (if multiple screenshots) */}
              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((lightboxIndex - 1 + total) % total);
                    }}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-purple-600 text-white flex items-center justify-center backdrop-blur-md transition-colors shadow-lg cursor-pointer"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((lightboxIndex + 1) % total);
                    }}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-purple-600 text-white flex items-center justify-center backdrop-blur-md transition-colors shadow-lg cursor-pointer"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Controls / Thumbnails & Keyboard hints */}
            <div
              className="w-full max-w-6xl pt-2 flex flex-col items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {total > 1 ? (
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-full">
                  {screenshots.map((screen, idx) => {
                    const active = idx === lightboxIndex;
                    return (
                      <button
                        key={screen.id}
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        className={`relative rounded-md overflow-hidden transition-all duration-200 shrink-0 border-2 cursor-pointer w-14 h-8 sm:w-20 sm:h-11 ${
                          active
                            ? 'border-purple-500 scale-105 shadow-md shadow-purple-500/50'
                            : 'border-transparent opacity-50 hover:opacity-100'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={screen.file}
                          alt={screen.alt}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0 right-0 bg-black/85 text-[8px] sm:text-[9px] font-mono text-white px-1">
                          {labelPrefix}{screen.id}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              <div className="text-[10px] sm:text-[11px] text-neutral-400 font-mono text-center flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5">
                <span>Click image or wheel to zoom</span>
                <span className="hidden xs:inline">•</span>
                <span className="hidden xs:inline">Drag to pan</span>
                <span className="hidden xs:inline">•</span>
                <span>Press Esc / Tap outside to exit</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}


"use client";

import { useEffect, useRef, useState } from "react";
import axiosInstance from "@/libs/axios";
import { OnlineLesson, VideoItem } from "@/types/online-lesson";
import { getImagePath } from "@/libs/imageHelper";
import toast from "react-hot-toast";

const LockIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const PlayIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" className="opacity-20" />
    <path d="M10 8l6 4-6 4V8z" />
  </svg>
);

interface VideoPlayerProps {
  lessonId: number;
  videoIndex: number;
  video: VideoItem;
  isPurchased: boolean;
  onClose: () => void;
}

const VideoPlayer = ({ lessonId, videoIndex, video, isPurchased, onClose }: VideoPlayerProps) => {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (video.is_preview) {
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");
      setSrc(`${apiBase}/stream/online-lessons/${lessonId}/videos/${videoIndex}`);
    } else if (isPurchased) {
      axiosInstance
        .get<{ url: string }>(`/video-token/online-lessons/${lessonId}/videos/${videoIndex}`)
        .then((res) => setSrc(res.data.url))
        .catch(() => {
          setError(true);
          toast.error("Failed to load video.");
        });
    }
  }, [lessonId, videoIndex, video.is_preview, isPurchased]);

  return (
    <div className="mt-3 overflow-hidden rounded-lg bg-black">
      <div className="flex items-center justify-between px-3 py-1.5">
        <span className="text-xs text-white/60">Video {videoIndex + 1}</span>
        <button
          onClick={onClose}
          className="text-xs text-white/60 hover:text-white transition-colors"
        >
          Close ✕
        </button>
      </div>
      {error ? (
        <p className="px-4 pb-4 text-sm text-red-400">Could not load video.</p>
      ) : !src ? (
        <p className="px-4 pb-4 text-sm text-white/40">Loading…</p>
      ) : (
        <video
          src={src}
          controls
          autoPlay
          className="w-full"
          style={{ maxHeight: "480px" }}
        />
      )}
    </div>
  );
};

const OnlineLessonDetails = ({ id }: { id: string }) => {
  const [lesson, setLesson] = useState<OnlineLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [openVideoIndex, setOpenVideoIndex] = useState<number | null>(null);
  const buyBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    axiosInstance
      .get<{ data: OnlineLesson }>(`/online-lessons/${id}`)
      .then((res) => setLesson(res.data.data))
      .catch(() => toast.error("Failed to load lesson."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuy = async () => {
    setCheckoutLoading(true);
    try {
      const res = await axiosInstance.post<{ url: string }>("/checkout", {
        type: "online_lesson",
        id: Number(id),
      });
      window.location.href = res.data.url;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to start payment. Please try again."
      );
      setCheckoutLoading(false);
    }
  };

  const handleVideoClick = (videoIdx: number, canPlay: boolean) => {
    if (!canPlay) {
      if (buyBtnRef.current) {
        buyBtnRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        handleBuy();
      }
      return;
    }
    setOpenVideoIndex(openVideoIndex === videoIdx ? null : videoIdx);
  };

  if (loading) {
    return (
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <p className="text-black dark:text-white">Loading…</p>
        </div>
      </section>
    );
  }

  if (!lesson) {
    return (
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <h2 className="text-3xl font-semibold text-black dark:text-white">Lesson not found</h2>
        </div>
      </section>
    );
  }

  const videos = lesson.videos ?? [];
  const isPurchased = lesson.is_purchased;
  const previewCount = videos.filter((v) => v.is_preview).length;

  return (
    <section className="pt-35 pb-20 lg:pt-45 lg:pb-25 xl:pt-50 xl:pb-30">
      <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
        <div className="animate_top border-stroke shadow-solid-13 dark:border-strokedark dark:bg-blacksection rounded-md border bg-white p-7.5 md:p-10">

          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              {lesson.thumbnail && (
                <img
                  src={getImagePath(lesson.thumbnail)}
                  alt={lesson.title}
                  className="mb-6 w-full max-h-80 rounded-lg object-cover"
                />
              )}
              <h2 className="2xl:text-sectiontitle2 text-3xl font-semibold text-black dark:text-white">
                {lesson.title}
              </h2>
              {lesson.description && (
                <p className="mt-4 text-body-color dark:text-body-color-dark">
                  {lesson.description}
                </p>
              )}
              {lesson.tags && (
                <p className="mt-2 text-sm text-body-color dark:text-body-color-dark">
                  <span className="font-medium">Tags:</span> {lesson.tags}
                </p>
              )}
            </div>
            {lesson.price != null && (
              <span className="shrink-0 self-start rounded-full bg-primary/10 px-4 py-1.5 text-lg font-bold text-primary">
                ${Number(lesson.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Access status banner */}
          {isPurchased ? (
            <div className="mb-6 flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400 w-fit">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              30-day access active — all videos unlocked
            </div>
          ) : (
            <div className="mb-6 rounded-xl border border-stroke bg-gray-50 px-6 py-5 dark:border-strokedark dark:bg-blacksection">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-black dark:text-white">
                    Unlock all {videos.length} video{videos.length !== 1 ? "s" : ""} for 30 days
                  </p>
                  <p className="mt-0.5 text-sm text-body-color dark:text-body-color-dark">
                    {previewCount > 0
                      ? `${previewCount} free preview${previewCount > 1 ? "s" : ""} available — purchase for full access.`
                      : "Purchase to access all videos."}
                  </p>
                </div>
                <button
                  ref={buyBtnRef}
                  onClick={handleBuy}
                  disabled={checkoutLoading}
                  className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-primary px-7 py-3 font-semibold text-white duration-300 hover:bg-primaryho disabled:opacity-60"
                >
                  {checkoutLoading ? "Redirecting…" : `Buy 30-Day Access — $${Number(lesson.price).toFixed(2)}`}
                  {!checkoutLoading && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Video list */}
          {videos.length > 0 ? (
            <div className="flex flex-col gap-3">
              {videos.map((video, videoIdx) => {
                const canPlay = video.is_preview || isPurchased;
                return (
                  <div key={videoIdx} className="border-t border-stroke pt-3 dark:border-strokedark">
                    <button
                      onClick={() => handleVideoClick(videoIdx, canPlay)}
                      className={[
                        "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors",
                        canPlay
                          ? "bg-primary/5 text-primary hover:bg-primary/10"
                          : "bg-black/5 text-body-color hover:bg-black/10 dark:bg-white/5 dark:text-body-color-dark dark:hover:bg-white/10",
                      ].join(" ")}
                    >
                      {canPlay ? <PlayIcon /> : <LockIcon />}
                      <span>Video {videoIdx + 1}</span>
                      {video.is_preview && (
                        <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          Free Preview
                        </span>
                      )}
                      {!canPlay && (
                        <span className="ml-auto text-xs opacity-60">Purchase to unlock</span>
                      )}
                    </button>

                    {openVideoIndex === videoIdx && canPlay && (
                      <VideoPlayer
                        lessonId={lesson.id}
                        videoIndex={videoIdx}
                        video={video}
                        isPurchased={isPurchased}
                        onClose={() => setOpenVideoIndex(null)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-body-color dark:text-body-color-dark">
              No videos in this lesson yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OnlineLessonDetails;

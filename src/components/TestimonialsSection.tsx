"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BookCallButton from "./BookCallButton";

interface VimeoThumbnail {
  width: number;
  height: number;
  link: string;
}

interface VimeoVideoData {
  name: string;
  pictures: {
    sizes: VimeoThumbnail[];
  };
  duration: number;
}

interface TestimonialVideo {
  vimeoId: string;
  alt: string;
  title: string;
}

const TestimonialsSection: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [videoData, setVideoData] = useState<{ [key: string]: VimeoVideoData }>(
    {}
  );
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [videoViews, setVideoViews] = useState<{ [key: string]: number }>({});

  const testimonialVideos: TestimonialVideo[] = [
    {
      vimeoId: "1120754612",
      alt: "Testimonial 1",
      title: "COMPILATION",
    },
    {
      vimeoId: "1120757250",
      alt: "Testimonial 2",
      title: "Paul's Success Journey",
    },
    {
      vimeoId: "1120756999",
      alt: "Testimonial 3",
      title: "Char's Life Change",
    },
  ];

  // Fetch Vimeo video data using oEmbed API (no auth required for public videos)
  useEffect(() => {
    const fetchVideoData = async (videoId: string) => {
      setLoading((prev) => ({ ...prev, [videoId]: true }));

      try {
        // Use Vimeo oEmbed API - no authentication needed for public videos
        const oEmbedResponse = await fetch(
          `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}&width=640&height=360`
        );

        if (oEmbedResponse.ok) {
          const oEmbedData = await oEmbedResponse.json();
          console.log(`oEmbed data for ${videoId}:`, oEmbedData);

          setVideoData((prev) => ({
            ...prev,
            [videoId]: {
              name: oEmbedData.title || `Video ${videoId}`,
              pictures: {
                sizes: [
                  {
                    width: oEmbedData.width || 640,
                    height: oEmbedData.height || 360,
                    link: oEmbedData.thumbnail_url,
                  },
                ],
              },
              duration: oEmbedData.duration || 120,
            },
          }));
        } else {
          console.warn(
            `oEmbed failed for ${videoId}, using direct thumbnail URL`
          );
          // Fallback to direct thumbnail URL (works for public videos)
          setVideoData((prev) => ({
            ...prev,
            [videoId]: {
              name: `Video ${videoId}`,
              pictures: {
                sizes: [
                  {
                    width: 640,
                    height: 360,
                    link: `https://i.vimeocdn.com/video/${videoId}.jpg`,
                  },
                ],
              },
              duration: 120,
            },
          }));
        }
      } catch (error) {
        console.error(`Error fetching video ${videoId}:`, error);
        // Final fallback
        setVideoData((prev) => ({
          ...prev,
          [videoId]: {
            name: `Video ${videoId}`,
            pictures: {
              sizes: [
                {
                  width: 640,
                  height: 360,
                  link: `/api/placeholder/${videoId}`,
                },
              ],
            },
            duration: 120,
          },
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [videoId]: false }));
      }
    };

    testimonialVideos.forEach((video) => {
      fetchVideoData(video.vimeoId);
    });
  }, []);

  // Load view counts from localStorage (only in browser)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedViews = localStorage.getItem("testimonial_video_views");
      if (savedViews) {
        setVideoViews(JSON.parse(savedViews));
      }
    }
  }, []);

  // Save view counts to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "testimonial_video_views",
        JSON.stringify(videoViews)
      );
    }
  }, [videoViews]);

  // Handle keyboard navigation for videos
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && playingVideo !== null) {
        handleVideoClose();
      }
    };

    if (playingVideo !== null) {
      document.addEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "unset";
    };
  }, [playingVideo]);

  const handleVideoPlay = (index: number) => {
    setPlayingVideo(index);

    // Track video view
    const videoId = testimonialVideos[index].vimeoId;
    setVideoViews((prev) => ({
      ...prev,
      [videoId]: (prev[videoId] || 0) + 1,
    }));

    // Analytics tracking (replace with your analytics service)
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "video_play", {
        event_category: "testimonials",
        event_label: testimonialVideos[index].title,
        custom_parameter_1: videoId,
      });
    }
  };

  const handleVideoClose = () => {
    setPlayingVideo(null);
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getThumbnailUrl = (videoId: string): string => {
    const data = videoData[videoId];
    if (data && data.pictures && data.pictures.sizes.length > 0) {
      // Try each thumbnail URL from the sizes array
      for (const size of data.pictures.sizes) {
        if (
          size.link &&
          !size.link.includes("default") &&
          !size.link.includes("placeholder")
        ) {
          return size.link;
        }
      }
    }

    // Return our custom placeholder
    return `/api/placeholder/${videoId}`;
  };

  return (
    <section className="bg-black min-h-screen px-8 font-sans py-4 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#3ED5A8] font-medium text-sm md:text-lg mb-4">
            Testimonials
          </p>
          <h2 className="text-white text-xl md:text-3xl lg:text-[40px] font-semibold">
            Life-Changing Transformations
          </h2>
        </div>

        {/* Video Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonialVideos.map((video, index) => {
            const isLoading = loading[video.vimeoId];
            const data = videoData[video.vimeoId];
            const viewCount = videoViews[video.vimeoId] || 0;

            return (
              <div key={index} className="relative group cursor-pointer">
                <div
                  className="relative overflow-hidden rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                  onClick={() => !isLoading && handleVideoPlay(index)}
                >
                  {/* Loading State */}
                  {isLoading ? (
                    <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3ED5A8]"></div>
                    </div>
                  ) : (
                    <>
                      {/* Vimeo Thumbnail */}
                      <div className="relative w-full aspect-video">
                        <img
                          src={getThumbnailUrl(video.vimeoId)}
                          alt={video.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            // Try fallback URLs in sequence
                            const fallbackUrls = [
                              `https://i.vimeocdn.com/video/${video.vimeoId}_640x360.jpg`,
                              `https://vumbnail.com/${video.vimeoId}.jpg`,
                              "/assets/testimonial-fallback.png",
                            ];

                            const currentSrc = target.src;
                            const currentIndex = fallbackUrls.findIndex(
                              (url) =>
                                currentSrc.includes(url) || currentSrc === url
                            );
                            const nextIndex = currentIndex + 1;

                            if (nextIndex < fallbackUrls.length) {
                              target.src = fallbackUrls[nextIndex];
                            }
                          }}
                        />
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-200">
                        <div className="w-16 h-16 bg-[#3ED5A8] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                          <div className="w-0 h-0 border-l-[12px] border-l-black border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                        </div>
                      </div>

                      {/* Video Duration */}
                      {data && (
                        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {formatDuration(data.duration)}
                        </div>
                      )}

                      {/* Video Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                        <h3 className="text-white font-semibold text-base mb-1">
                          {video.title}
                        </h3>

                        {viewCount > 0 && (
                          <p className="text-[#3ED5A8] text-xs">
                            {viewCount} view{viewCount !== 1 ? "s" : ""}
                          </p>
                        )}
                      </div>

                      {/* Hover Effect Border */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#3ED5A8] rounded-lg transition-colors duration-200"></div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="text-center cursor-pointer mb-6 md:mb-12">
          <Link href="/testimonials">
            <button className="bg-transparent border border-white text-white px-[12px] py-[12px] rounded-[12px] text-sm font-medium hover:bg-white hover:text-black transition-all duration-200 hover:scale-105">
              View more
            </button>
          </Link>
        </div>

        {/* Book Call Button */}
        <div className="text-center flex items-center justify-center">
          <BookCallButton
            calLink="elevationmentorship"
            variant="secondary"
            size="md"
            theme="dark"
          />
        </div>
      </div>

      {/* Video Modal */}
      {playingVideo !== null && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 transition-opacity duration-300"
            onClick={handleVideoClose}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
            <div className="relative w-full max-w-6xl mx-auto">
              {/* Close Button */}
              <button
                onClick={handleVideoClose}
                className="absolute -top-12 right-0 text-white hover:text-[#3ED5A8] transition-colors duration-200 z-10 p-2"
                aria-label="Close video (Press Escape)"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Loading State for Video */}
              <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3ED5A8]"></div>
                </div>

                {/* Vimeo Embed */}
                <iframe
                  src={`https://player.vimeo.com/video/${testimonialVideos[playingVideo].vimeoId}?h=0&autoplay=1&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479&color=3ED5A8`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  title={testimonialVideos[playingVideo].title}
                  onLoad={() => {
                    // Hide loading spinner when video loads
                    const loadingDiv =
                      document.querySelector(".animate-spin")?.parentElement;
                    if (loadingDiv) {
                      (loadingDiv as HTMLElement).style.display = "none";
                    }
                  }}
                ></iframe>
              </div>

              {/* Video Info Below Player */}
              <div className="mt-6 text-center">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {testimonialVideos[playingVideo].title}
                </h3>
              </div>

              {/* Keyboard Hint */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
                Press ESC to close
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default TestimonialsSection;

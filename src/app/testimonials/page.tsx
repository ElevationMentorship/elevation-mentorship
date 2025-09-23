"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

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
  subtitle: string;
}

const TestimonialsPage: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [videoData, setVideoData] = useState<{ [key: string]: VimeoVideoData }>(
    {}
  );
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [videoViews, setVideoViews] = useState<{ [key: string]: number }>({});

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  // Extended testimonial videos array for the full page
  const testimonialVideos: TestimonialVideo[] = [
    {
      vimeoId: "1120757555",
      alt: "Testimonial 1",
      title: "LUKE",
      subtitle: "BUSINESS OWNER/TRADER",
    },
    {
      vimeoId: "1120753366",
      alt: "Testimonial 9",
      title: "Tom. K",
      subtitle: "PROFESSIONAL KICK-BOXER",
    },
    {
      vimeoId: "1120756833",
      alt: "Testimonial 5",
      title: "SONYA",
      subtitle: "BUSINESS OWNER",
    },
    {
      vimeoId: "1120756424",
      alt: "Testimonial 6",
      title: "SASHA. S",
      subtitle: "ENTREPRENEUR",
    },
    {
      vimeoId: "1120755138",
      alt: "Testimonial 7",
      title: "OLLIE M",
      subtitle: "BOXER",
    },
    {
      vimeoId: "1120756689",
      alt: "Testimonial 4",
      title: "CHRIS ALLEN",
      subtitle: "MMA FIGHT PROMOTER, CO-FOUDER BFS OWNER",
    },
    {
      vimeoId: "1120757250",
      alt: "Testimonial 2",
      title: "PAUL. W",
      subtitle: "BUSINESS OWNER",
    },
    {
      vimeoId: "1120756999",
      alt: "Testimonial 3",
      title: "CHAR. W",
      subtitle: "BRAND OWNER, BUSINESS OWNER",
    },

    {
      vimeoId: "1120754612",
      alt: "Testimonial 8",
      title: "COMPILATION",
      subtitle: "",
    },
  ];

  // Fetch Vimeo video data using oEmbed API
  useEffect(() => {
    const fetchVideoData = async (videoId: string) => {
      setLoading((prev) => ({ ...prev, [videoId]: true }));

      try {
        const oEmbedResponse = await fetch(
          `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}&width=640&height=360`
        );

        if (oEmbedResponse.ok) {
          const oEmbedData = await oEmbedResponse.json();

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
      } finally {
        setLoading((prev) => ({ ...prev, [videoId]: false }));
      }
    };

    // Only fetch unique video IDs to avoid duplicate requests
    const uniqueVideoIds = [
      ...new Set(testimonialVideos.map((v) => v.vimeoId)),
    ];
    uniqueVideoIds.forEach((videoId) => {
      fetchVideoData(videoId);
    });
  }, []);

  // Load view counts from localStorage
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

  // Handle keyboard navigation
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
      const thumbnailUrl = data.pictures.sizes[0].link;
      if (thumbnailUrl && !thumbnailUrl.includes("default")) {
        return thumbnailUrl;
      }
    }
    return `https://i.vimeocdn.com/video/${videoId}.jpg`;
  };

  return (
    <>
      <Navbar
        isContactModalOpen={isContactModalOpen}
        onOpenContactModal={openContactModal}
        onCloseContactModal={closeContactModal}
      />{" "}
      <div className="bg-black min-h-screen mt-[80px] px-4 md:px-8 font-sans py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[#3ED5A8] font-medium text-sm md:text-lg mb-4">
              Client Stories
            </p>
            <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
              Life-Changing Transformations
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto">
              Discover how our coaching has transformed the lives of fighters,
              entrepreneurs, and professionals around the world.
            </p>
          </div>

          {/* Video Grid - 3x3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {testimonialVideos.map((video, index) => {
              const isLoading = loading[video.vimeoId];
              const data = videoData[video.vimeoId];
              const viewCount = videoViews[video.vimeoId] || 0;

              return (
                <div
                  key={`${video.vimeoId}-${index}`}
                  className="relative group cursor-pointer"
                >
                  <div
                    className="relative overflow-hidden rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                    onClick={() => !isLoading && handleVideoPlay(index)}
                  >
                    {/* Loading State */}
                    {isLoading ? (
                      <div className="w-full aspect-video bg-gray-800 flex items-center justify-center rounded-xl">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3ED5A8]"></div>
                      </div>
                    ) : (
                      <>
                        {/* Video Thumbnail */}
                        <div className="relative w-full aspect-video">
                          <img
                            src={getThumbnailUrl(video.vimeoId)}
                            alt={video.alt}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (!target.src.includes("placeholder")) {
                                target.src = `/api/placeholder/${video.vimeoId}`;
                              }
                            }}
                          />
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-200 rounded-xl">
                          <div className="w-14 h-14 bg-[#3ED5A8] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                            <div className="w-0 h-0 border-l-[10px] border-l-black border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent ml-1"></div>
                          </div>
                        </div>

                        {/* Video Duration */}
                        {data && (
                          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {formatDuration(data.duration)}
                          </div>
                        )}

                        {/* Video Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 rounded-b-xl">
                          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                            {video.title}
                          </h3>
                          <p className="text-gray-300 text-xs mb-2 line-clamp-1">
                            {video.subtitle}
                          </p>

                          {viewCount > 0 && (
                            <p className="text-[#3ED5A8] text-xs">
                              {viewCount} view{viewCount !== 1 ? "s" : ""}
                            </p>
                          )}
                        </div>

                        {/* Hover Effect Border */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#3ED5A8] rounded-xl transition-colors duration-200"></div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Video Modal - Same as before */}
        {playingVideo !== null && (
          <>
            <div
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 transition-opacity duration-300"
              onClick={handleVideoClose}
            />
            <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
              <div className="relative w-full max-w-6xl mx-auto">
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

                <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3ED5A8]"></div>
                  </div>

                  <iframe
                    src={`https://player.vimeo.com/video/${testimonialVideos[playingVideo].vimeoId}?h=0&autoplay=1&muted=0&title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0&player_id=0&app_id=58479&color=3ED5A8`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    title={testimonialVideos[playingVideo].title}
                    onLoad={() => {
                      const loadingDiv =
                        document.querySelector(".animate-spin")?.parentElement;
                      if (loadingDiv) {
                        (loadingDiv as HTMLElement).style.display = "none";
                      }
                    }}
                  ></iframe>
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {testimonialVideos[playingVideo].title}
                  </h3>
                  <p className="text-gray-400">
                    {testimonialVideos[playingVideo].subtitle}
                  </p>
                </div>

                <div className="absolute hidden md:block -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
                  Press ESC to close
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <FooterSection onOpenContactModal={openContactModal} />
    </>
  );
};

export default TestimonialsPage;

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  id: number;
  image: string;
  title: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: "/img/banner01.png",
    title: "коллекция",
  },
  {
    id: 2,
    image: "/img/banner01.png",
    title: "Новая коллекция",
  },
  {
    id: 3,
    image: "/img/banner01.png",
    title: "коллекция",
  },
  {
    id: 4,
    image: "/img/banner01.png",
    title: "Новая коллекция",
  },
];

const SLIDE_DURATION = 4000; // 5 seconds

export function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % SLIDES.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, SLIDE_DURATION / 100);

    const slideInterval = setInterval(nextSlide, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div
      className="relative lg:h-[915px] h-[542px] w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/20">
            <Link href={"/"} className="">
              <div className="absolute top-72 right-0 lg:py-9 py-7 lg:px-[150px] px-24 bg-[#1E1E1E] text-white">
                <h2 className="lg:text-xl font-light border-b border-b-white">{slide.title}</h2>
              </div>
            </Link>
          </div>
        </div>
      ))}

      {/* Progress indicators */}
      <div className="absolute bottom-8 left-8 right-8 flex gap-2">
        {SLIDES.map((_, index) => (
          <div key={index} className="h-[2px] flex-1 bg-white/30">
            <div
              className="h-full bg-white transition-all duration-200"
              style={{
                width: `${index === currentSlide ? progress : index < currentSlide ? 100 : 0}%`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

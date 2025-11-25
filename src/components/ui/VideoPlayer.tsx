'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface VideoPlayerProps {
  src?: string // URL til lokal video eller ekstern video
  youtubeId?: string // YouTube video ID
  vimeoId?: string // Vimeo video ID
  poster?: string // Thumbnail/bilde før video spilles
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  className?: string
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto'
}

export default function VideoPlayer({
  src,
  youtubeId,
  vimeoId,
  poster,
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  className = '',
  aspectRatio = '16/9',
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showPoster, setShowPoster] = useState(true)

  // YouTube embed
  if (youtubeId) {
    const aspectClass = {
      '16/9': 'aspect-video',
      '4/3': 'aspect-4/3',
      '1/1': 'aspect-square',
      auto: '',
    }[aspectRatio]

    return (
      <div className={`relative w-full ${aspectClass} ${className}`}>
        <iframe
          className="absolute inset-0 w-full h-full rounded-2xl"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}&mute=${muted ? 1 : 0}&controls=${controls ? 1 : 0}&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        />
      </div>
    )
  }

  // Vimeo embed
  if (vimeoId) {
    const aspectClass = {
      '16/9': 'aspect-video',
      '4/3': 'aspect-4/3',
      '1/1': 'aspect-square',
      auto: '',
    }[aspectRatio]

    return (
      <div className={`relative w-full ${aspectClass} ${className}`}>
        <iframe
          className="absolute inset-0 w-full h-full rounded-2xl"
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}&muted=${muted ? 1 : 0}&controls=${controls ? 1 : 0}`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Vimeo video player"
        />
      </div>
    )
  }

  // Lokal video eller ekstern URL
  if (!src) return null

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
      setShowPoster(false)
    }
  }

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const aspectClass = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-4/3',
    '1/1': 'aspect-square',
    auto: '',
  }[aspectRatio]

  return (
    <div className={`relative w-full ${aspectClass} ${className} group`}>
      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover rounded-2xl"
        poster={poster}
        loop={loop}
        muted={muted}
        controls={controls}
        onLoadedData={() => setIsLoaded(true)}
        onPlay={() => {
          setIsPlaying(true)
          setShowPoster(false)
        }}
        onPause={() => setIsPlaying(false)}
        playsInline
      />

      {/* Custom play button overlay (hvis poster vises) */}
      {showPoster && poster && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handlePlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Poster image */}
          <div className="absolute inset-0">
            <Image
              src={poster}
              alt="Video thumbnail"
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/30 rounded-2xl" />
          </div>

          {/* Play button */}
          <motion.div
            className="relative z-10 w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-8 h-8 text-dark-bg ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-surface/50 rounded-2xl">
          <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}


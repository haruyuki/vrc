'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { Commissioner } from '@/types';
import { getUserLocaleFromCookie } from '@/utils/getUserLocaleFromCookie';

interface CommissionerCardProps {
  commissioner: Commissioner;
  index: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(getUserLocaleFromCookie(), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export default function CommissionerCard({ commissioner, index }: CommissionerCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only start cycling if there are multiple images and user is hovering
    if (isHovering && commissioner.textureImages.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % commissioner.textureImages.length);
      }, 1500); // Change image every 1500ms
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentImageIndex(0); // Reset to first image when not hovering
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, commissioner.textureImages.length]);

  // Safety check for an empty texture images array
  if (!commissioner.textureImages || commissioner.textureImages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="overflow-hidden rounded-lg bg-slate-700"
      >
        <div
          className="relative flex items-center justify-center overflow-hidden bg-slate-600"
          style={{ aspectRatio: '4/3' }}
        >
          <div className="text-sm text-slate-400">No images available</div>
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2 text-white">
            <User className="h-4 w-4" />
            <span className="font-medium">{commissioner.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(commissioner.commissionDate)}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="overflow-hidden rounded-lg bg-slate-700"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative overflow-hidden bg-slate-600" style={{ aspectRatio: '4/3' }}>
        {/* Crossfade transition - render all images with opacity animation */}
        {commissioner.textureImages.map((image, imgIndex) => (
          <motion.div
            key={`${commissioner.id}-${imgIndex}`}
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: imgIndex === 0 ? 1 : 0 }}
            animate={{ opacity: imgIndex === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        ))}

        {/* Image indicator dots - only show if there are multiple images */}
        {commissioner.textureImages.length > 1 && (
          <div className="absolute bottom-2 left-2 flex gap-1">
            {commissioner.textureImages.map((_, imgIndex) => (
              <div
                key={imgIndex}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  imgIndex === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Commissioner info */}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-white">
          <User className="h-4 w-4" />
          <span className="font-medium">{commissioner.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(commissioner.commissionDate)}</span>
        </div>
      </div>
    </motion.div>
  );
}

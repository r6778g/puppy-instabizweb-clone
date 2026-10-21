'use client';

import React, { useEffect } from 'react';
import { PolaroidPhoto } from '@/types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoLightboxProps {
  photo: PolaroidPhoto | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    if (photo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [photo, onClose, onNext, onPrev]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-cocoa/85 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90dvh] bg-milk p-4 sm:p-6 rounded-3xl border-3 border-cocoa shadow-2xl flex flex-col items-center overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 size-12 rounded-full bg-cocoa text-milk flex items-center justify-center hover:bg-toffee-deep transition-colors shadow-lg cursor-pointer z-10"
          aria-label="Close photo preview"
        >
          <X className="size-6" />
        </button>

        {/* Polaroid frame */}
        <div className="relative flex w-full justify-center rounded-2xl overflow-hidden border-2 border-cocoa/20 bg-honey-soft/30">
          <img
            alt={photo.caption}
            src={photo.image}
            className="h-auto max-h-[55vh] max-w-full w-auto object-contain"
          />
        </div>

        {/* Caption */}
        <p className="font-scrawl text-xl md:text-2xl text-cocoa text-center mt-5">
          {photo.caption}
        </p>

        {photo.location && (
          <p className="text-sm text-cocoa-soft font-semibold mt-1">
            📍 {photo.location}
          </p>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-cocoa/10">
          <button
            type="button"
            onClick={onPrev}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-cocoa text-sm font-bold text-cocoa hover:bg-honey-soft transition-colors cursor-pointer"
          >
            <ChevronLeft className="size-4" /> Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-cocoa text-sm font-bold text-cocoa hover:bg-honey-soft transition-colors cursor-pointer"
          >
            Next <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  getReferenceImage,
  getLogoPath,
  handleReferenceImageError,
} from "@/lib/getReferenceImage";
import { Skeleton } from "@/components/ui/skeleton";

interface ReferenceImageProps {
  letter: string;
  alt?: string;
  className?: string;
  frameClassName?: string;
  compact?: boolean;
}

export function ReferenceImage({
  letter,
  alt,
  className,
  frameClassName,
  compact = false,
}: ReferenceImageProps) {
  const [loading, setLoading] = useState(true);
  const [showFallbackNote, setShowFallbackNote] = useState(false);
  const src = getReferenceImage(letter);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setShowFallbackNote(true);
    setLoading(false);
    handleReferenceImageError(event.nativeEvent);
  };

  return (
    <div
      className={cn(
        "reference-frame relative flex items-center justify-center bg-secondary/10",
        compact ? "aspect-square p-2 min-h-[120px]" : "aspect-[4/3] p-4 min-h-[200px] sm:min-h-[260px]",
        frameClassName,
      )}
    >
      {loading && (
        <Skeleton
          className={cn("absolute rounded-xl", compact ? "inset-2" : "inset-4")}
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt ?? `ASL reference sign for letter ${letter}`}
        loading="lazy"
        className={cn(
          "max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100",
          className,
        )}
        onLoad={() => setLoading(false)}
        onError={handleError}
      />
      {showFallbackNote && src !== getLogoPath() && (
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-muted-foreground bg-card/90 border border-border px-2 py-1 rounded-md whitespace-nowrap">
          Reference unavailable
        </span>
      )}
    </div>
  );
}

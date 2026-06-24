"use client";

import { getPublicMedia } from "@/lib/api/media";
import type { PublicMedia } from "@/lib/api/types";
import { useEffect, useState } from "react";

let cachedMedia: PublicMedia | null = null;
let mediaPromise: Promise<PublicMedia> | null = null;

function loadPublicMedia() {
  if (cachedMedia) return Promise.resolve(cachedMedia);
  mediaPromise ??= getPublicMedia().then((data) => {
    cachedMedia = data;
    return data;
  }).catch((error) => {
    mediaPromise = null;
    throw error;
  });
  return mediaPromise;
}

export function usePublicMedia() {
  const [media, setMedia] = useState<PublicMedia | null>(cachedMedia);
  const [loading, setLoading] = useState(!cachedMedia);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await loadPublicMedia();
        if (!cancelled) setMedia(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load media");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { media, loading, error };
}

"use client";

import { getPublicMedia } from "@/lib/api/media";
import type { PublicMedia } from "@/lib/api/types";
import { useEffect, useState } from "react";

export function usePublicMedia() {
  const [media, setMedia] = useState<PublicMedia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getPublicMedia();
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

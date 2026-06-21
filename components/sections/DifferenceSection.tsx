"use client";



import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

import { Container } from "@/components/ui/Container";

import { SectionHeading } from "@/components/ui/SectionHeading";

import { usePublicMedia } from "@/hooks/usePublicMedia";

import { resolveMediaUrl } from "@/lib/api/media";

import type { PublicMediaItem } from "@/lib/api/types";

import { beforeAfterPairs } from "@/lib/services";

import { cn } from "@/lib/utils";

import { useEffect, useMemo, useState } from "react";



function mapValidPairs(apiPairs: PublicMediaItem[] | undefined) {

  if (!apiPairs?.length) return null;



  const valid = apiPairs

    .map((item, index) => {

      const before = item.before ? resolveMediaUrl(item.before, "") : "";

      const after = item.after ? resolveMediaUrl(item.after, "") : "";

      if (!before || !after) return null;

      return {

        id: item._id ?? String(index),

        label: item.label ?? item.title ?? "Woosh result",

        before,

        after,

      };

    })

    .filter((pair): pair is NonNullable<typeof pair> => pair !== null);



  return valid.length > 0 ? valid : null;

}



export function DifferenceSection() {

  const { media } = usePublicMedia();

  const [activeIndex, setActiveIndex] = useState(0);



  const pairs = useMemo(() => {

    return mapValidPairs(media?.seeTheDifference) ?? beforeAfterPairs;

  }, [media]);



  useEffect(() => {

    setActiveIndex(0);

  }, [pairs]);



  const activePair = pairs[activeIndex] ?? pairs[0];



  return (

    <section id="difference" className="bg-white py-16 md:py-20">

      <Container>

        <SectionHeading

          className="mb-8"

          eyebrow="See the Difference"

          title="Visible results you can trust"

          subtitle="Drag the handle to compare before and after — real Woosh service imagery showing the premium clean."

        />



        <div className="mx-auto max-w-[720px]">

          {activePair ? (

            <BeforeAfterSlider

              key={activePair.id}

              size="compact"

              label={activePair.label}

              before={activePair.before}

              after={activePair.after}

            />

          ) : null}



          {pairs.length > 1 ? (

            <div

              className="mt-6 flex items-center justify-center gap-2"

              role="tablist"

              aria-label="Before and after examples"

            >

              {pairs.map((pair, index) => (

                <button

                  key={pair.id}

                  type="button"

                  role="tab"

                  onClick={() => setActiveIndex(index)}

                  className="focus-ring flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full"

                  aria-label={`Show ${pair.label}`}

                  aria-selected={index === activeIndex}

                >

                  <span

                    className={cn(

                      "block rounded-full transition-all",

                      index === activeIndex

                        ? "h-2.5 w-8 bg-cyan"

                        : "h-2.5 w-2.5 bg-black/15 hover:bg-black/25",

                    )}

                  />

                </button>

              ))}

            </div>

          ) : null}

        </div>

      </Container>

    </section>

  );

}



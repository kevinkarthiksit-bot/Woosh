import { isSiteLive } from "@/lib/build-info";

export function PreviewBanner() {
  if (isSiteLive) return null;

  return (
    <div
      role="status"
      className="sticky top-0 z-[60] border-b border-amber-300/50 bg-amber-50 px-4 py-2 text-center text-sm font-medium text-amber-900"
    >
      Preview — not the live public site
    </div>
  );
}

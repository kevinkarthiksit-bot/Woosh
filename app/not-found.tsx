import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="font-display text-h1 text-foreground">Page not found</h1>
      <p className="mt-4 text-muted">The page you are looking for does not exist.</p>
      <Link href="/" className="focus-ring mt-8 text-cyan hover:underline">
        Return home
      </Link>
    </div>
  );
}

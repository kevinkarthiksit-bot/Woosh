import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-white">Page not found</h1>
      <p className="mt-4 text-white/70">The page you are looking for does not exist.</p>
      <Link href="/" className="focus-ring mt-8 text-cyan hover:underline">
        Return home
      </Link>
    </div>
  );
}

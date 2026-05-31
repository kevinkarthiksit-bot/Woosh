import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/lib/services";
import Image from "next/image";

export function BlogsSection() {
  return (
    <section id="blogs" className="section-padding bg-navy/40">
      <Container>
        <SectionHeading
          eyebrow="Blogs"
          title="Insights from the Woosh team"
          subtitle="Tips, stories, and updates about premium vehicle care — full blog pages coming soon."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.id} glow className="overflow-hidden p-0">
              <div className="relative aspect-[16/10]">
                <Image src={post.image} alt={post.title} fill className="object-cover" sizes="400px" />
              </div>
              <div className="space-y-3 p-6">
                <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{post.excerpt}</p>
                <span className="inline-flex text-sm font-semibold text-cyan">Coming soon</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

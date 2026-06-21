import { pickServiceForSlug, slugToApiCategory } from "@/lib/api/mappers";
import { getServices } from "@/lib/api/services";
import type { ServiceSlug } from "@/lib/services";
import { retryOnColdStart } from "./retry";

export async function pickTestService(slug: ServiceSlug) {
  const category = slugToApiCategory(slug);
  const services = await retryOnColdStart(() => getServices(category));  const picked = pickServiceForSlug(slug, services);
  if (!picked) {
    throw new Error(`No active service found for slug ${slug}`);
  }
  return picked;
}

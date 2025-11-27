export const decodeSlugFromUrl = (slug: string): string => {
  if (!slug) return '';

  try {
    return decodeURIComponent(slug);
  } catch (error) {
    console.warn('Failed to decode slug:', slug, error);
    return slug;
  }
};

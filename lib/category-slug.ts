/**
 * Utility functions for converting category names to URL-safe slugs and vice versa.
 * Handles category names with spaces, special characters (like '&'), etc.
 */

/**
 * Normalizes a category name or slug to a consistent format for comparison.
 * This is the single source of truth for category normalization.
 * Rules:
 * - Lowercase
 * - Trim whitespace
 * - Replace '&' with 'and'
 * - Replace any sequence of non-alphanumeric characters with a single hyphen
 * - Collapse multiple consecutive hyphens
 * - Trim hyphens from start/end
 * 
 * Example: "Jacktes & Trousers" → "jacktes-and-trousers"
 */
export function normalizeCategory(value: string): string {
  if (!value || typeof value !== "string") {
    return "";
  }
  
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Converts a category name to a URL-safe slug.
 * Uses the shared normalizeCategory function for consistency.
 * 
 * Example: "Jacktes & Trousers" → "jacktes-and-trousers"
 */
export function categoryToSlug(categoryName: string): string {
  if (!categoryName || typeof categoryName !== "string") {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Dev] categoryToSlug: categoryName is invalid", categoryName);
    }
    return "";
  }
  
  return normalizeCategory(categoryName);
}

/**
 * Converts a slug back to a category name by matching against actual categories.
 * Returns the original category name if a match is found, or null if not found.
 * 
 * This function uses the shared normalizeCategory function for consistent matching.
 */
export function slugToCategory(
  slug: string | undefined | null,
  availableCategories: string[]
): string | null {
  if (!slug || typeof slug !== "string") {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Dev] slugToCategory: slug is undefined or invalid", slug);
    }
    return null;
  }

  if (!availableCategories || !Array.isArray(availableCategories) || availableCategories.length === 0) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Dev] slugToCategory: availableCategories is invalid or empty", availableCategories);
    }
    return null;
  }

  const normalizedSlug = normalizeCategory(slug);

  if (!normalizedSlug) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Dev] slugToCategory: normalized slug is empty", slug);
    }
    return null;
  }

  for (const category of availableCategories) {
    if (!category || typeof category !== "string") {
      if (process.env.NODE_ENV === "development") {
        console.warn("[Dev] slugToCategory: invalid category found in array", category);
      }
      continue;
    }
    
    if (normalizeCategory(category) === normalizedSlug) {
      return category; // Return the original category name
    }
  }

  // Dev-only warning: category match failed
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "[Dev] slugToCategory: No category match found",
      { slug, normalizedSlug, availableCategories }
    );
  }

  return null;
}

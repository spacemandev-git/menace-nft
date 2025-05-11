// Field category constants with corresponding colors and icons

export interface FieldCategory {
  color: string; // Tailwind or hex color code
  icon: string; // Icon identifier (can be replaced with actual icon component imports)
  label: string; // Display name for the category
}

// Main categories mapped to their visual representation - simplified to 6 main categories
export const FIELD_CATEGORIES: Record<string, FieldCategory> = {
  // Category 1: Arts & Humanities
  "Arts & Humanities": {
    color: "#4f46e5",
    icon: "PaintBrushIcon",
    label: "the Arts",
  } as const,

  // Category 2: Science & Technology
  "Science & Technology": {
    color: "#FB7D39",
    icon: "BeakerIcon",
    label: "Science",
  } as const,

  // Category 3: Politics & Leadership
  "Politics & Leadership": {
    color: "#ECC30B",
    icon: "BuildingOfficeIcon",
    label: "Leadership",
  } as const,

  // Category 4: Business & Innovation
  "Business & Innovation": {
    color: "#059669",
    icon: "LightBulbIcon",
    label: "Innovation",
  } as const,

  // Category 5: Medicine & Health
  "Medicine & Health": {
    color: "#dc2626",
    icon: "HeartIcon",
    label: "Medicine",
  } as const,

  // Category 6: Exploration & Environment
  "Exploration & Environment": {
    color: "#0FA3B1",
    icon: "GlobeEuropeAfricaIcon",
    label: "Exploration",
  } as const,
} as const;

/**
 * Maps a field/area string from the data to a category in our constant map.
 * This handles compound fields like "Philosophy/Mathematics" by searching
 * for the best match in our categories.
 */
export function getFieldCategory(fieldArea: string): FieldCategory {
  // Default fallback category
  const defaultCategory: FieldCategory = {
    color: "#808080",
    icon: "QuestionMarkCircleIcon",
    label: "Other",
  };

  if (!fieldArea) return defaultCategory;

  // First, check for exact match
  if (FIELD_CATEGORIES[fieldArea]) {
    return FIELD_CATEGORIES[fieldArea];
  }

  // If nothing specific was found, categorize based on field
  const fieldLower = fieldArea.toLowerCase();

  // Science & Technology
  if (
    fieldLower.includes("science") ||
    fieldLower.includes("tech") ||
    fieldLower.includes("physics") ||
    fieldLower.includes("phys") ||
    fieldLower.includes("chem") ||
    fieldLower.includes("bio") ||
    fieldLower.includes("math") ||
    fieldLower.includes("computer") ||
    fieldLower.includes("program") ||
    fieldLower.includes("engineer") ||
    fieldLower.includes("invent") ||
    fieldLower.includes("astronomy") ||
    fieldLower.includes("space") ||
    fieldLower.includes("quantum") ||
    fieldLower.includes("ai") ||
    fieldLower.includes("artificial intel")
  ) {
    return FIELD_CATEGORIES["Science & Technology"];
  }

  // Exploration & Environment
  else if (
    fieldLower.includes("explor") ||
    fieldLower.includes("conserv") ||
    fieldLower.includes("environ") ||
    fieldLower.includes("natur") ||
    fieldLower.includes("geograph") ||
    fieldLower.includes("travel") ||
    fieldLower.includes("expedition") ||
    fieldLower.includes("discover") ||
    fieldLower.includes("climate") ||
    fieldLower.includes("ecolog") ||
    fieldLower.includes("sustain") ||
    fieldLower.includes("agricult") ||
    fieldLower.includes("farming") ||
    fieldLower.includes("ocean") ||
    fieldLower.includes("sea") ||
    fieldLower.includes("mountain") ||
    fieldLower.includes("forest") ||
    fieldLower.includes("desert") ||
    fieldLower.includes("wild") ||
    fieldLower.includes("animal") ||
    fieldLower.includes("species") ||
    fieldLower.includes("biodivers") ||
    fieldLower.includes("sport")
  ) {
    return FIELD_CATEGORIES["Exploration & Environment"];
  }

  // Politics & Leadership
  else if (
    fieldLower.includes("polit") ||
    fieldLower.includes("leader") ||
    fieldLower.includes("civil right") ||
    fieldLower.includes("activ") ||
    fieldLower.includes("social reform") ||
    fieldLower.includes("femin") ||
    fieldLower.includes("indigenous") ||
    fieldLower.includes("rights") ||
    fieldLower.includes("law") ||
    fieldLower.includes("diplomacy") ||
    fieldLower.includes("military") ||
    fieldLower.includes("war") ||
    fieldLower.includes("intelligen") ||
    fieldLower.includes("whistle") ||
    fieldLower.includes("govern") ||
    fieldLower.includes("presiden") ||
    fieldLower.includes("revolu") ||
    fieldLower.includes("protest") ||
    fieldLower.includes("social justice")
  ) {
    return FIELD_CATEGORIES["Politics & Leadership"];
  }

  // Business & Innovation
  else if (
    fieldLower.includes("business") ||
    fieldLower.includes("industry") ||
    fieldLower.includes("entrepre") ||
    fieldLower.includes("econom") ||
    fieldLower.includes("financ") ||
    fieldLower.includes("innovat") ||
    fieldLower.includes("startup") ||
    fieldLower.includes("market") ||
    fieldLower.includes("labor") ||
    fieldLower.includes("trade") ||
    fieldLower.includes("commerce")
  ) {
    return FIELD_CATEGORIES["Business & Innovation"];
  }

  // Medicine & Health
  else if (
    fieldLower.includes("medic") ||
    fieldLower.includes("health") ||
    fieldLower.includes("nurs") ||
    fieldLower.includes("surg") ||
    fieldLower.includes("physio") ||
    fieldLower.includes("immun") ||
    fieldLower.includes("psycho") ||
    fieldLower.includes("pharma") ||
    fieldLower.includes("therapy") ||
    fieldLower.includes("mental health") ||
    fieldLower.includes("doctor") ||
    fieldLower.includes("patient") ||
    fieldLower.includes("hospital") ||
    fieldLower.includes("diagnosis") ||
    fieldLower.includes("treat")
  ) {
    return FIELD_CATEGORIES["Medicine & Health"];
  }

  // Arts & Humanities
  else if (
    fieldLower.includes("art") ||
    fieldLower.includes("danc") ||
    fieldLower.includes("film") ||
    fieldLower.includes("music") ||
    fieldLower.includes("photo") ||
    fieldLower.includes("theatre") ||
    fieldLower.includes("theater") ||
    fieldLower.includes("liter") ||
    fieldLower.includes("poetry") ||
    fieldLower.includes("writ") ||
    fieldLower.includes("poet") ||
    fieldLower.includes("philo") ||
    fieldLower.includes("history") ||
    fieldLower.includes("archaeolog") ||
    fieldLower.includes("anthro") ||
    fieldLower.includes("socio") ||
    fieldLower.includes("religion") ||
    fieldLower.includes("theol") ||
    fieldLower.includes("cultur") ||
    fieldLower.includes("design") ||
    fieldLower.includes("architect") ||
    fieldLower.includes("journal") ||
    fieldLower.includes("educat") ||
    fieldLower.includes("entertainment")
  ) {
    return FIELD_CATEGORIES["Arts & Humanities"];
  }

  return defaultCategory;
}

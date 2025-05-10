// Field category constants with corresponding colors and icons

export interface FieldCategory {
  color: string; // Tailwind or hex color code
  icon: string; // Icon identifier (can be replaced with actual icon component imports)
  label: string; // Display name for the category
}

// Main categories mapped to their visual representation
export const FIELD_CATEGORIES: Record<string, FieldCategory> = {
  Art: { color: "#db2777", icon: "PaintBrushIcon", label: "Art" },
  Dance: { color: "#f472b6", icon: "MusicalNoteIcon", label: "Dance" },
  Film: { color: "#9d174d", icon: "FilmIcon", label: "Film" },
  Music: { color: "#9333ea", icon: "MusicalNoteIcon", label: "Music" },
  Photography: { color: "#f9a8d4", icon: "CameraIcon", label: "Photography" },
  Theatre: { color: "#a21caf", icon: "TicketIcon", label: "Theatre" },
  Literature: { color: "#4f46e5", icon: "BookOpenIcon", label: "Literature" },
  Poetry: { color: "#818cf8", icon: "PencilIcon", label: "Poetry" },
  Architecture: {
    color: "#d97706",
    icon: "HomeModernIcon",
    label: "Architecture",
  },
  Design: { color: "#ec4899", icon: "SwatchIcon", label: "Design" },

  Science: { color: "#0284c7", icon: "BeakerIcon", label: "Science" },
  Astronomy: { color: "#0f172a", icon: "SparklesIcon", label: "Astronomy" },
  Biology: { color: "#16a34a", icon: "LeafIcon", label: "Biology" },
  Chemistry: { color: "#0d9488", icon: "BeakerIcon", label: "Chemistry" },
  Physics: { color: "#1d4ed8", icon: "AtomIcon", label: "Physics" },
  Mathematics: {
    color: "#0e7490",
    icon: "CalculatorIcon",
    label: "Mathematics",
  },
  "Computer Science": {
    color: "#0369a1",
    icon: "ComputerDesktopIcon",
    label: "Computer Science",
  },
  Technology: { color: "#2563eb", icon: "CpuChipIcon", label: "Technology" },
  Engineering: {
    color: "#ca8a04",
    icon: "WrenchScrewdriverIcon",
    label: "Engineering",
  },
  Invention: { color: "#f59e0b", icon: "LightBulbIcon", label: "Invention" },

  Philosophy: {
    color: "#3730a3",
    icon: "AcademicCapIcon",
    label: "Philosophy",
  },
  Psychology: { color: "#7c3aed", icon: "BrainIcon", label: "Psychology" },
  Sociology: { color: "#6366f1", icon: "UsersIcon", label: "Sociology" },
  Anthropology: {
    color: "#b45309",
    icon: "UserGroupIcon",
    label: "Anthropology",
  },
  Economics: {
    color: "#047857",
    icon: "CurrencyDollarIcon",
    label: "Economics",
  },
  "Political Science": {
    color: "#1e40af",
    icon: "BuildingLibraryIcon",
    label: "Political Science",
  },
  History: { color: "#44403c", icon: "ClockIcon", label: "History" },
  Archaeology: {
    color: "#92400e",
    icon: "ArchiveBoxIcon",
    label: "Archaeology",
  },

  Medicine: { color: "#dc2626", icon: "HeartIcon", label: "Medicine" },
  Nursing: { color: "#f87171", icon: "UserIcon", label: "Nursing" },
  Surgery: { color: "#991b1b", icon: "ScissorsIcon", label: "Surgery" },
  Physiology: { color: "#ea580c", icon: "VariableIcon", label: "Physiology" },
  Immunology: {
    color: "#22c55e",
    icon: "ShieldCheckIcon",
    label: "Immunology",
  },

  Politics: { color: "#1e3a8a", icon: "BuildingOfficeIcon", label: "Politics" },
  Activism: { color: "#ef4444", icon: "MegaphoneIcon", label: "Activism" },
  Leadership: { color: "#6b21a8", icon: "UserCircleIcon", label: "Leadership" },
  "Civil Rights": {
    color: "#6d28d9",
    icon: "ScaleIcon",
    label: "Civil Rights",
  },
  Labor: { color: "#c2410c", icon: "BriefcaseIcon", label: "Labor" },
  "Social Reform": {
    color: "#e11d48",
    icon: "ArrowPathIcon",
    label: "Social Reform",
  },
  Feminism: { color: "#c026d3", icon: "HeartIcon", label: "Feminism" },
  "Indigenous Rights": {
    color: "#9a3412",
    icon: "GlobeAmericasIcon",
    label: "Indigenous Rights",
  },

  Religion: { color: "#7e22ce", icon: "BookmarkIcon", label: "Religion" },
  Theology: { color: "#4338ca", icon: "BookOpenIcon", label: "Theology" },
  "Spiritual Leadership": {
    color: "#9333ea",
    icon: "StarIcon",
    label: "Spiritual Leadership",
  },
  "Religious Reform": {
    color: "#5b21b6",
    icon: "ArrowUturnRightIcon",
    label: "Religious Reform",
  },

  Business: {
    color: "#059669",
    icon: "BuildingOffice2Icon",
    label: "Business",
  },
  Industry: {
    color: "#3f3f46",
    icon: "BuildingStorefrontIcon",
    label: "Industry",
  },
  Entrepreneurship: {
    color: "#10b981",
    icon: "RocketLaunchIcon",
    label: "Entrepreneurship",
  },

  Exploration: {
    color: "#155e75",
    icon: "GlobeEuropeAfricaIcon",
    label: "Exploration",
  },
  Conservation: { color: "#15803d", icon: "TreeIcon", label: "Conservation" },
  Environmental: {
    color: "#16a34a",
    icon: "CloudIcon",
    label: "Environmental",
  },

  Sports: { color: "#65a30d", icon: "TrophyIcon", label: "Sports" },

  Military: {
    color: "#374151",
    icon: "ShieldExclamationIcon",
    label: "Military",
  },

  Law: { color: "#1f2937", icon: "ScaleIcon", label: "Law" },
  Education: { color: "#a16207", icon: "AcademicCapIcon", label: "Education" },
  Journalism: { color: "#475569", icon: "NewspaperIcon", label: "Journalism" },
  Writing: { color: "#6366f1", icon: "PencilSquareIcon", label: "Writing" },
  Agriculture: { color: "#713f12", icon: "SunIcon", label: "Agriculture" },
  Diplomacy: {
    color: "#64748b",
    icon: "ChatBubbleLeftRightIcon",
    label: "Diplomacy",
  },
  Intelligence: { color: "#4b5563", icon: "EyeIcon", label: "Intelligence" },
  Whistleblowing: {
    color: "#b91c1c",
    icon: "BellAlertIcon",
    label: "Whistleblowing",
  },
};

/**
 * Maps a field/area string from the data to a category in our constant map.
 * This handles compound fields like "Philosophy/Mathematics" by searching
 * for the best match in our categories.
 */
export function getFieldCategory(fieldArea: string): FieldCategory {
  // Default fallback category
  const defaultCategory: FieldCategory = {
    color: "bg-gray-500",
    icon: "QuestionMarkCircleIcon",
    label: "Other",
  };

  if (!fieldArea) return defaultCategory;

  // First, check for exact match
  if (FIELD_CATEGORIES[fieldArea]) {
    return FIELD_CATEGORIES[fieldArea];
  }

  // Split compound fields (e.g., "Philosophy/Mathematics")
  const fields = fieldArea.split("/");

  // Try to find the first part that matches a category
  for (const field of fields) {
    const cleanField = field.trim();
    if (FIELD_CATEGORIES[cleanField]) {
      return FIELD_CATEGORIES[cleanField];
    }

    // Look for a category that contains this field
    for (const [key, value] of Object.entries(FIELD_CATEGORIES)) {
      if (cleanField.includes(key) || key.includes(cleanField)) {
        return value;
      }
    }
  }

  // If nothing specific was found, look for common keywords
  const fieldLower = fieldArea.toLowerCase();

  // Check for subcategories using partial matches
  if (fieldLower.includes("art") || fieldLower.includes("paint")) {
    return FIELD_CATEGORIES["Art"];
  } else if (fieldLower.includes("music") || fieldLower.includes("compos")) {
    return FIELD_CATEGORIES["Music"];
  } else if (fieldLower.includes("film") || fieldLower.includes("cinema")) {
    return FIELD_CATEGORIES["Film"];
  } else if (
    fieldLower.includes("liter") ||
    fieldLower.includes("writ") ||
    fieldLower.includes("poet")
  ) {
    return FIELD_CATEGORIES["Literature"];
  } else if (fieldLower.includes("philo")) {
    return FIELD_CATEGORIES["Philosophy"];
  } else if (fieldLower.includes("phys")) {
    return FIELD_CATEGORIES["Physics"];
  } else if (fieldLower.includes("math")) {
    return FIELD_CATEGORIES["Mathematics"];
  } else if (fieldLower.includes("bio")) {
    return FIELD_CATEGORIES["Biology"];
  } else if (fieldLower.includes("chem")) {
    return FIELD_CATEGORIES["Chemistry"];
  } else if (
    fieldLower.includes("civil right") ||
    fieldLower.includes("activism")
  ) {
    return FIELD_CATEGORIES["Activism"];
  } else if (fieldLower.includes("med")) {
    return FIELD_CATEGORIES["Medicine"];
  } else if (fieldLower.includes("polit")) {
    return FIELD_CATEGORIES["Politics"];
  } else if (fieldLower.includes("tech")) {
    return FIELD_CATEGORIES["Technology"];
  } else if (fieldLower.includes("social") || fieldLower.includes("socio")) {
    return FIELD_CATEGORIES["Sociology"];
  } else if (fieldLower.includes("enviro") || fieldLower.includes("conserv")) {
    return FIELD_CATEGORIES["Conservation"];
  } else if (fieldLower.includes("psycho")) {
    return FIELD_CATEGORIES["Psychology"];
  } else if (fieldLower.includes("religion") || fieldLower.includes("theol")) {
    return FIELD_CATEGORIES["Religion"];
  } else if (fieldLower.includes("anthro")) {
    return FIELD_CATEGORIES["Anthropology"];
  } else if (fieldLower.includes("explor")) {
    return FIELD_CATEGORIES["Exploration"];
  } else if (
    fieldLower.includes("business") ||
    fieldLower.includes("entrepreneur")
  ) {
    return FIELD_CATEGORIES["Business"];
  } else if (fieldLower.includes("sport") || fieldLower.includes("athlet")) {
    return FIELD_CATEGORIES["Sports"];
  } else if (fieldLower.includes("law")) {
    return FIELD_CATEGORIES["Law"];
  } else if (fieldLower.includes("military") || fieldLower.includes("war")) {
    return FIELD_CATEGORIES["Military"];
  } else if (fieldLower.includes("educ")) {
    return FIELD_CATEGORIES["Education"];
  } else if (fieldLower.includes("agri")) {
    return FIELD_CATEGORIES["Agriculture"];
  }

  return defaultCategory;
}

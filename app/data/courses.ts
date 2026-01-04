// app/data/courses.ts
// In-memory course data for the kid-friendly LMS.
// Each course lists fun topics instead of deep lessons to keep things light.

export type Course = {
  id: string;
  title: string;
  description: string;
  topics: string[];
};

export type Lesson = {
  id: string;
  title: string;
  content?: string;
  homework?: string;
};

export const courses: Course[] = [
  {
    id: "frontend",
    title: "Friendly Frontend",
    description: "Explore HTML, CSS, and simple JavaScript that shape every web page.",
    topics: [
      "How HTML builds the page skeleton",
      "Painting with CSS colors and fonts",
      "Adding simple buttons and click actions",
      "Building a mini page layout",
    ],
  },
  {
    id: "roblox",
    title: "Roblox Studio Basics",
    description: "Learn how creators build worlds, scripts, and gameplay in Roblox Studio.",
    topics: [
      "Using the Explorer and Properties panels",
      "Placing parts to design an obby",
      "Scripting with Lua events",
      "Testing and publishing your place",
    ],
  },
  {
    id: "minecraft",
    title: "Minecraft Makers",
    description: "Create maps and command tricks that make Minecraft adventures unique.",
    topics: [
      "Creative mode building tips",
      "Redstone basics for machines",
      "Simple command blocks",
      "Making a mini adventure map",
    ],
  },
  {
    id: "java",
    title: "Java Journeys",
    description: "Meet the Java language and write tiny programs that react to input.",
    topics: [
      "Printing friendly messages",
      "Variables and data types",
      "If/else choices",
      "Loops that repeat helpful steps",
    ],
  },
];

export function findCourse(courseId: string) {
  return courses.find((course) => course.id === courseId);
}

// --- helpers ---
function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function makeHomework(topic: string) {
  return `Complete a small practice task for: ${topic}`;
}

/**
 * Supports lessonId as:
 * - "1", "2", ... (topic index)
 * - or slug of the topic ("how-html-builds-the-page-skeleton")
 */
export function findLesson(courseId: string, lessonId: string): Lesson | undefined {
  const course = findCourse(courseId);
  if (!course) return undefined;

  // 1) numeric lessonId ("1".."n")
  if (/^\d+$/.test(lessonId)) {
    const idx = Number(lessonId) - 1;
    const topic = course.topics[idx];
    if (!topic) return undefined;

    return {
      id: String(idx + 1),
      title: topic,
      content: topic,
      homework: makeHomework(topic),
    };
  }

  // 2) slug lessonId
  const idx = course.topics.findIndex((t) => slugify(t) === lessonId);
  if (idx === -1) return undefined;

  const topic = course.topics[idx];

  return {
    id: String(idx + 1),
    title: topic,
    content: topic,
    homework: makeHomework(topic),
  };
}

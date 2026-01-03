// In-memory course data for the kid-friendly LMS.
// Each course lists fun topics instead of deep lessons to keep things light.
export type Course = {
  id: string;
  title: string;
  description: string;
  topics: string[];
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

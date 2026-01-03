export type Lesson = {
  id: string;
  title: string;
  content: string;
  homework: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  topics: string[];
  lessons: Lesson[];
};

export const courses: Course[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "HTML, CSS, JavaScript",
    topics: ["HTML basics", "CSS basics", "JS basics"],
    lessons: [
      {
        id: "lesson-1",
        title: "HTML: tags",
        content: "Today we learn basic tags: h1, p, img, a...",
        homework: "Create a simple page with title + 3 paragraphs.",
      },
    ],
  },
  // roblox / minecraft / java ...
];

export function findCourse(courseId: string) {
  return courses.find((c) => c.id === courseId);
}

export function findLesson(courseId: string, lessonId: string) {
  const course = findCourse(courseId);
  if (!course) return null;
  return course.lessons.find((l) => l.id === lessonId) ?? null;
}

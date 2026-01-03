// Simple mock data for the LMS. Keeping it here avoids setting up a real database.
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
  lessons: Lesson[];
};

export const courses: Course[] = [
  {
    id: "web-basics",
    title: "Web Basics",
    description: "Learn what web pages are made of and how they show up on screen.",
    lessons: [
      {
        id: "html-intro",
        title: "HTML Building Blocks",
        content:
          "HTML is the skeleton of every web page. It uses tags like <p> for paragraphs and <h1> for big titles.",
        homework:
          "Write down three HTML tags you know and describe when you would use each one. Example: <img> is for images.",
      },
      {
        id: "css-colors",
        title: "Colorful CSS",
        content:
          "CSS is the paint and outfit of a site. You can change colors, sizes, and layouts to make pages feel friendly.",
        homework:
          "Pick your favorite color and explain how you would apply it to the background of a page using CSS.",
      },
    ],
  },
  {
    id: "coding-logic",
    title: "Coding Logic",
    description: "Practice thinking like a developer with small JavaScript ideas.",
    lessons: [
      {
        id: "variables",
        title: "Variables as Boxes",
        content:
          "Variables are boxes that hold information. You label the box with a name so you can find the info later.",
        homework:
          "Describe two things you would store in variables while making a simple click counter page.",
      },
      {
        id: "if-statements",
        title: "If Statements",
        content:
          "If statements let a program make choices. They read like: if something is true, then do this.",
        homework:
          "Write a short idea for an if statement that reminds a player to take a break after 3 games.",
      },
    ],
  },
];

export function findCourse(courseId: string) {
  return courses.find((course) => course.id === courseId);
}

export function findLesson(courseId: string, lessonId: string) {
  const course = findCourse(courseId);
  return course?.lessons.find((lesson) => lesson.id === lessonId);
}

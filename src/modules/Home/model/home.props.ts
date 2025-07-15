import type { useQuiz } from "../application/useQuiz";

export type QuizProps = Omit<
  ReturnType<typeof useQuiz>,
  "isLoading" | "error" | "submissionError"
>;

export type QuizFormProps = Pick<QuizProps, "form">;

export type QuizResultProps = Pick<QuizProps, "result">;

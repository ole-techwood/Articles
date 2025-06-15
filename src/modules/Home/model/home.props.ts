import type { useQuiz } from "../application/useQuiz";

export type QuizProps = ReturnType<typeof useQuiz>;

export type QuizFormProps = Pick<QuizProps, "form">;

export type QuizResultProps = Pick<QuizProps, "result">;

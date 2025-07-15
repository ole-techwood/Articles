import { Container } from "@mui/material";
import { Quiz } from "./view/Quiz";
import { useQuiz } from "./application/useQuiz";

export const Home: React.FC = () => {
  const quizProps = useQuiz();

  return (
    <Container sx={{ display: "flex", alignItems: "center", height: "100%" }}>
      <Quiz {...quizProps} />
    </Container>
  );
};

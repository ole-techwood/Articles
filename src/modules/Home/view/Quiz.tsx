import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import type { QuizProps } from "../model";
import { QuizForm } from "./QuizForm";
import { QuizResult } from "./QuizResult";

export const Quiz: React.FC<QuizProps> = ({
  country,
  form,
  result,
  onSubmit,
}) => {
  return (
    <Card sx={{ width: 320, margin: "0 auto" }}>
      <CardMedia
        sx={{ height: 198 }}
        image={country.flag}
        title="Country flag"
      />
      <CardContent sx={(theme) => ({ padding: theme.spacing(2, 1) })}>
        {!result ? <QuizForm form={form} /> : <QuizResult result={result} />}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "end" }}>
        <Button size="small" variant="contained" onClick={onSubmit}>
          {!result ? "Submit answer" : "Next country"}
        </Button>
      </CardActions>
    </Card>
  );
};

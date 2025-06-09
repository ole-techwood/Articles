import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";
import type { QuizProps } from "../model";

export const Quiz: React.FC<QuizProps> = ({ country }) => {
  return (
    <Card sx={{ width: 320, margin: "0 auto" }}>
      <CardMedia
        sx={{ height: 198 }}
        image={country.flag}
        title="Country flag"
      />
      <CardContent sx={(theme) => ({ padding: theme.spacing(2, 1) })}>
        <TextField
          label="Your answer"
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "end" }}>
        <Button size="small" variant="outlined">
          Don't know
        </Button>
        <Button size="small" variant="contained">
          Submit answer
        </Button>
      </CardActions>
    </Card>
  );
};

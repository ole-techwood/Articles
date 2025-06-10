import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";
import type { QuizProps } from "../model";

export const Quiz: React.FC<QuizProps> = ({ country, form }) => {
  return (
    <Card sx={{ width: 320, margin: "0 auto" }}>
      <CardMedia
        sx={{ height: 198 }}
        image={country.flag}
        title="Country flag"
      />
      <CardContent sx={(theme) => ({ padding: theme.spacing(2, 1) })}>
        <form>
          <form.Field name="answer">
            {(field) => (
              <TextField
                label="Your answer"
                variant="outlined"
                sx={{ width: "100%" }}
                error={!field.state.meta.isValid}
                helperText={field.state.meta.errors[0]}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            )}
          </form.Field>
        </form>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "end" }}>
        <Button size="small" variant="outlined">
          Don't know
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => form.handleSubmit()}
        >
          Submit answer
        </Button>
      </CardActions>
    </Card>
  );
};

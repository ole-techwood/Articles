import { TextField } from "@mui/material";
import type { QuizFormProps } from "../model";

export const QuizForm: React.FC<QuizFormProps> = ({ form }) => {
  return (
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
  );
};

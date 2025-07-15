import React from "react";
import type { QuizResultProps } from "../model";
import { Alert, Stack, Typography } from "@mui/material";

export const QuizResult: React.FC<QuizResultProps> = ({ result }) => {
  return (
    <Stack>
      {result?.countryName.toLowerCase() ===
      result?.userAnswer.toLowerCase() ? (
        <React.Fragment>
          <Typography component="div" sx={{ mt: 2 }} color="success">
            Brilliant work!
          </Typography>
          <Alert variant="outlined" severity="success">
            {result?.countryName}
          </Alert>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography color="warning">
            No worries. Learning is a process!
          </Typography>
          <Alert variant="outlined" severity="warning">
            {result?.userAnswer}
          </Alert>
          <Typography component="div" sx={{ mt: 2 }} color="success">
            Correct answer
          </Typography>
          <Alert variant="outlined" severity="success">
            {result?.countryName}
          </Alert>
        </React.Fragment>
      )}
    </Stack>
  );
};

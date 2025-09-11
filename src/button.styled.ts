import {
  Button as MuiButton,
  styled,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";

// Determines whether a given prop should be forwarded to the underlying DOM element.
const shouldForwardProp = (prop: string) => {
  if (!prop || typeof prop !== "string") return false;

  return !prop.trim().startsWith("$");
};

export type ButtonProps = MuiButtonProps & {
  $shape?: "round" | "square";
};

export const Button = styled(MuiButton, { shouldForwardProp })<ButtonProps>(
  ({ $shape = "square" }) => {
    const shapeStyle = {
      round: {
        borderRadius: 100,
      },
      square: {},
    };

    return shapeStyle[$shape];
  }
);

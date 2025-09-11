import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          padding: "0 12px",
          height: 32,
          borderRadius: 6,
          backgroundColor: "rgb(45, 164, 78)",
          border: "1px solid rgba(27, 31, 36, 0.15)",
        },
      },
    },
  },
});

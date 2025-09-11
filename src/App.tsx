import { Stack } from "@mui/material";
import { Button } from "./Button";

function App() {
  return (
    <Stack p={2} spacing={1} sx={{ width: 100 }}>
      <Button variant="contained">Square</Button>
      <Button variant="contained" $shape="round">
        Round
      </Button>
    </Stack>
  );
}

export default App;

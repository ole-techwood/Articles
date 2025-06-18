import { History } from "@/modules/History";
import { Grid } from "@mui/material";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        size={3}
        sx={{
          height: "100%",
          backgroundColor: "ButtonShadow",
          overflowY: "scroll",
        }}
      >
        <History />
      </Grid>
      <Grid size={9}>
        <Outlet />
      </Grid>
    </Grid>
  ),
});

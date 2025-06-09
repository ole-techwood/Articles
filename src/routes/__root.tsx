import { Grid } from "@mui/material";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          size={2}
          sx={{ height: "100%", backgroundColor: "ButtonShadow" }}
        />
        <Grid size={10}>
          <Outlet />
        </Grid>
      </Grid>
      <TanStackRouterDevtools />
    </>
  ),
});

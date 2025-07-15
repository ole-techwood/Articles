import { Home } from "@/modules/Home";
import { homeRepositoryFactory } from "@/modules/Home/data";
import { createFileRoute } from "@tanstack/react-router";

const homeRepository = homeRepositoryFactory();

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(homeRepository.findCountries()),
});

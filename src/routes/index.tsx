import { Home } from "@/modules/Home";
import { homeRepositoryFactory } from "@/modules/Home/data";
import { createFileRoute } from "@tanstack/react-router";

const resourceRepository = homeRepositoryFactory();

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(resourceRepository.findCountries()),
});

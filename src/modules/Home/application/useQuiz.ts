import { useSuspenseQuery } from "@tanstack/react-query";
import { homeRepositoryFactory } from "../data";

export const useQuiz = () => {
  const homeRepository = homeRepositoryFactory();

  const { data: countries, isLoading } = useSuspenseQuery({
    ...homeRepository.findCountries(),
    select: (countries) =>
      countries.data.map((country) => ({
        flag: country.flags.png,
        name: country.name.common,
      })),
  });

  const country = countries[Math.floor(Math.random() * countries.length)];

  return { country, isLoading };
};

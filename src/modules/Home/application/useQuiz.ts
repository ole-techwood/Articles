import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { homeRepositoryFactory } from "../data";
import { useMemo } from "react";

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

  const country = useMemo(
    () => countries[Math.floor(Math.random() * countries.length)],
    [countries]
  );

  const form = useForm({
    defaultValues: { answer: "" },
    validators: {
      onChange: ({ value }) => ({
        fields: {
          answer: !value.answer ? "You cannot submit empty answer" : undefined,
        },
      }),
    },
    onSubmit({ value }) {
      console.log(value);
    },
  });

  return { country, isLoading, form };
};

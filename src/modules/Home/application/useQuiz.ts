import { historyRepositoryFactory } from "@/modules/History/data/history.repository";
import type { HistoryDTO } from "@/modules/History/model";
import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { homeRepositoryFactory } from "../data";

export const useQuiz = () => {
  const homeRepository = homeRepositoryFactory();
  const historyRepository = historyRepositoryFactory();

  const [result, setResult] = useState<HistoryDTO>();

  const { data: countries, isLoading } = useSuspenseQuery({
    ...homeRepository.findCountries(),
    select: (countries) =>
      countries.data.map((country) => ({
        flag: country.flags.png,
        name: country.name.common,
      })),
  });

  const randomCountry = useMemo(
    () => countries[Math.floor(Math.random() * countries.length)],
    [countries, result]
  );

  const [country, setCountry] = useState(randomCountry);

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
      const result = {
        flagImage: country.flag,
        countryName: country.name,
        userAnswer: value.answer,
      };

      setResult(result);

      historyRepository.saveAnswer(result);
    },
  });

  const onSubmit = useCallback(() => {
    if (!result) {
      form.handleSubmit();
    } else {
      form.resetField("answer");
      setCountry(randomCountry);
      setResult(undefined);
    }
  }, [form, result]);

  return { country, isLoading, form, result, onSubmit };
};

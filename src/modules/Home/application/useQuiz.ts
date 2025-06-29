import { historyRepositoryFactory } from "@/modules/History/data";
import {
  createHistoryRecordDTO,
  type CreateHistoryRecordDTO,
} from "@/modules/History/model";
import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { homeRepositoryFactory } from "../data";
import { countriesPayload } from "../model";
import * as z from "zod/v4";

export const useQuiz = () => {
  const homeRepository = homeRepositoryFactory();
  const historyRepository = historyRepositoryFactory();

  const [result, setResult] = useState<CreateHistoryRecordDTO>();
  const [submissionError, setSubmissionError] = useState("");

  const {
    data: countries,
    isLoading,
    error,
  } = useSuspenseQuery({
    ...homeRepository.findCountries(),
    select: (countries) => {
      const payload = countriesPayload.safeParse(countries.data);

      // TanStack Query will handle this throw and append it to the error
      if (!payload.success) {
        throw new Error(
          "We've received an incorrect data from our countries provider. We're already fixing this error, please try again in 15 minutes.",
          { cause: payload.error }
        );
      }

      // Map the payload coming from the repository into Module Type
      return payload.data.map((country) => ({
        flag: country.flags.png,
        name: country.name.common,
      }));
    },
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
      const dto = {
        flagImage: country.flag,
        countryName: country.name,
        userAnswer: value.answer,
      };

      const historyDto = createHistoryRecordDTO.safeParse(dto);

      if (!historyDto.success) {
        const error = z.flattenError(
          historyDto.error as unknown as z.ZodError<CreateHistoryRecordDTO>
        );

        const formError = error.formErrors[0];
        const firstFieldError = Object.values(error.fieldErrors)[0][0];

        setSubmissionError(formError || firstFieldError);

        return;
      }

      setResult(dto);

      historyRepository.saveAnswer(historyDto.data);
    },
  });

  const onSubmit = useCallback(() => {
    console.log(result);

    if (!result) {
      form.handleSubmit();
    } else {
      form.resetField("answer");
      setCountry(randomCountry);
      setResult(undefined);
    }
  }, [form, result, randomCountry]);

  return { country, isLoading, form, result, onSubmit, error, submissionError };
};

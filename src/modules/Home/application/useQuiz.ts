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

  // State with the result to display and check it in the view
  const [result, setResult] = useState<CreateHistoryRecordDTO>();
  const [submissionError, setSubmissionError] = useState("");

  // Load the data
  const {
    data: countries,
    isLoading,
    error,
  } = useSuspenseQuery({
    ...homeRepository.findCountries(),
    queryFn: async (context) => {
      const queryFn = homeRepository.findCountries().queryFn;

      if (!queryFn) {
        throw new Error(
          "Unexpected error happened during loading the countries. Please try again in 15 minutes."
        );
      }

      const countries = await queryFn(context);

      // Parse the data from the repository
      const payload = countriesPayload.safeParse(countries.data);

      // TanStack Query will handle this throw and append it to the error
      if (!payload.success) {
        throw new Error(
          "We've received an incorrect data from our countries provider. We're already fixing this error, please try again in 15 minutes.",
          { cause: payload.error }
        );
      }

      return countries;
    },
    // Map the data
    select: (countries) =>
      countries.data.map((country) => ({
        flag: country.flags.png,
        name: country.name.common,
      })),
  });

  // Select one random country
  // This may occasionally give the same country again. You can customize the randomizer to exclude the current one if needed.
  const randomCountry = useMemo(
    () => countries[Math.floor(Math.random() * countries.length)],
    [countries]
  );

  // State with one random country
  const [country, setCountry] = useState(randomCountry);

  // Form instance initialization. Answer is one empty string default value
  const form = useForm({
    defaultValues: { answer: "" },
    // Specify form validators
    validators: {
      onChange: ({ value }) => ({
        fields: {
          answer: !value.answer ? "You cannot submit empty answer" : undefined,
        },
      }),
    },
    // Submission logic
    onSubmit({ value }) {
      // Create a DTO object
      const dto = {
        flagImage: country.flag,
        countryName: country.name,
        userAnswer: value.answer,
      };

      // Parse DTO
      const historyDto = createHistoryRecordDTO.safeParse(dto);

      if (!historyDto.success) {
        // https://zod.dev/error-formatting#zflattenerror
        const error = z.flattenError(
          historyDto.error as unknown as z.ZodError<CreateHistoryRecordDTO>
        );

        // Retrieve the first error
        const formError = error.formErrors[0];
        const firstFieldError = Object.values(error.fieldErrors)[0][0];

        // Set the error
        setSubmissionError(formError || firstFieldError);

        return;
      }

      // Set the result
      setResult(dto);

      // Save the result
      historyRepository.saveAnswer(historyDto.data);
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
  }, [form, result, randomCountry]);

  // We rely on TypeScript to infer the return type of useQuiz automatically.
  return { country, isLoading, form, result, onSubmit, error, submissionError };
};

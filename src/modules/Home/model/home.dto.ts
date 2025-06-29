import * as z from "zod/v4";

// Define an object for a single country returned from the countries API
const countryPayload = z.object({
  flags: z.object({
    png: z.string(),
    svg: z.string(),
    alt: z.string(),
  }),
  name: z.object({
    common: z.string(),
    official: z.string(),
    nativeName: z.record(
      z.string(),
      z.object({
        official: z.string(),
        common: z.string(),
      })
    ),
  }),
});

// Define an array of countries
export const countriesPayload = z.array(countryPayload);

// Define a type out of countryPayload object using z.infer
export type CountryPayload = z.infer<typeof countryPayload>;

import * as z from "zod/v4";

// Define an object for a single country returned from the countries API
const countryPayload = z.object({
  flags: z.object({
    png: z.string().nonempty(),
    svg: z.string().nonempty(),
    alt: z.string(),
  }),
  name: z.object({
    common: z.string().nonempty(),
    official: z.string().nonempty(),
    nativeName: z.record(
      z.string().nonempty(),
      z.object({
        official: z.string().nonempty(),
        common: z.string().nonempty(),
      })
    ),
  }),
});

// Define an array of countries
export const countriesPayload = z.array(countryPayload);

// Define a type out of countryPayload object using z.infer
export type CountryPayload = z.infer<typeof countryPayload>;

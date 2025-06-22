import * as z from "zod/v4";

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

export const countriesPayload = z.array(countryPayload);

export type CountryPayload = z.infer<typeof countryPayload>;

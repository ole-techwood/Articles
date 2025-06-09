export type CountryResponse = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [lang: string]: {
        official: string;
        common: string;
      };
    };
  };
};

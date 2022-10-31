import { LocaleObject } from "yup/es/locale";

export const csLocale: LocaleObject = {
  mixed: {
    default: ({ path }) => `Hodnota v "${path}" je neplatná`,
    required: ({ path }) => `Pole "${path}" je povinné`,
    oneOf: ({ path, values }) => `${path} musí obsahovat jednu z následujících hodnot: ${values}`,
    notOneOf: ({ path, values }) => `${path} nesmí obsahovat žádnou z následujících hodnot: ${values}`
  },
  string: {
    length: ({ path, length }) => `${path} musí obsahovat přesně ${length} znaků`,
    min: ({ path, min }) => `${path} musí obsahovat minimálně ${min} znaků`,
    max: ({ path, max }) => `${path} musí obsahovat maximálně ${max} znaků`,
    matches: ({ path, regex }) => `${path} musí splňovat pravidlo: "${regex}"`,
    email: ({ path }) => `${path} musí být platná emailová adresa`,
    url: ({ path }) => `${path} musí být platná URL adresa`,
    trim: ({ path }) => `${path} nesmí obsahovat mezery`,
    lowercase: ({ path }) => `${path} musí obsahovat jen malá písmena`,
    uppercase: ({ path }) => `${path} musí obsahovat jen velká písmena`
  },
  number: {
    min: ({ path, min }) => `${path} musí být větší nebo rovno ${min}`,
    max: ({ path, max }) => `${path} musí být menší nebo rovno ${max}`,
    lessThan: ({ path, less }) => `${path} musí být menší než ${less}`,
    moreThan: ({ path, more }) => `${path} musí být větší než ${more}`,
    positive: ({ path }) => `${path} musí být kladné číslo`,
    negative: ({ path }) => `${path} musí být záporné číslo`,
    integer: ({ path }) => `${path} musí být celé číslo`
  }
};

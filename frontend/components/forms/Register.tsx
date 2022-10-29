import { Button, HStack, Select, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { number, object, ref, string } from "yup";

import InputField from "shared/hook-form/FormField";

type RegisterInputs = {
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  surname: string;
  nickname?: string;
  day: number;
  month: string;
  year: number;
};

const RegisterForm: FC = () => {
  const signInFormSchema = object().shape({
    email: string().email().required().label("E-mail"),
    emailConfirmation: string()
      .oneOf([ref("email"), null], "E-mail se neshoduje")
      .label("Shoda e-mailu"),
    password: string().min(8, "Heslo má obsahovat minimalně 8 znáku").required().label("Heslo"),
    passwordConfirmation: string()
      .oneOf([ref("password"), null], "Heslo má být stejné")
      .label("Ověření hesla"),
    name: string().required().label("Jméno"),
    surname: string().required().label("Přijmení"),
    nickname: string().required().label("Nickname"),
    day: number().required().label("Den"),
    month: string().required().label("Měsíc"),
    year: number().required().label("Rok")
  });
  const methods = useForm<RegisterInputs>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: "",
      emailConfirmation: "",
      password: "",
      passwordConfirmation: "",
      name: "",
      surname: "",
      nickname: "",
      day: undefined,
      month: "",
      year: undefined
    }
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: RegisterInputs) => {
    // eslint-disable-next-line no-console
    console.log(data);
    reset();
  };

  const months = [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec"
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} mb="1rem">
          <InputField name="email" type="email" label="Tvůj e-mail" placeholder="Napiš e-mail" required />
          <InputField
            name="emailConfirmation"
            type="email"
            label="Tvůj email znovu"
            placeholder="Napiš e-mail znovu"
            required
          />
          <InputField name="password" label="Tvoje heslo" type="password" placeholder="Napiš heslo" required />
          <InputField
            name="passwordConfirmation"
            label="Tvoje heslo znovu"
            type="password"
            placeholder="Napiš heslo znovu"
            required
          />
          <Text fontSize="md" as="b">
            Jak ti máme říkat?
          </Text>
          <HStack spacing={3} justifyContent="space-between">
            <InputField name="name" label="Tvoje jméno" placeholder="Zadej jméno" required />
            <InputField name="surname" label="Tvoje příjmení" placeholder="Zadej příjmení" required />
            <InputField name="nickname" label="Tvoje přezdívka" placeholder="Zadej přezdívku" required />
          </HStack>
          <Text fontSize="md" as="b" mt="2rem">
            Kdy jsi se narodil?
          </Text>
          <HStack spacing={3} justifyContent="space-between">
            <InputField name="day" label="Den" placeholder="dd" required />
            <InputField name="month" placeholder="mesic" label="Měsíc" Component={Select} required>
              {months.map((month) => {
                return <option key={month}>{month}</option>;
              })}
            </InputField>
            <InputField name="year" label="Rok" placeholder="yyyy" required />
          </HStack>
        </Stack>
        <Button type="submit">Zaregistrovat se</Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;

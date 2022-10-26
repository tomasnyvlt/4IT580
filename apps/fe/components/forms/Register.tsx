import { Box, Button, FormLabel, HStack, Input, Stack, Text, Select, FormControl } from "@chakra-ui/react";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string, number, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
    email: string().email().required(),
    emailConfirmation: string().oneOf([ref("email"), null], "Emails must match"),
    password: string().required("password is required"),
    passwordConfirmation: string().oneOf([ref("password"), null], "passwords must match"),
    name: string().required(),
    surname: string().required(),
    nickname: string(),
    day: number().required("date is invalid"),
    month: string().required("month is invalid"),
    year: number().required("year is invalid")
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
      month: "mesic"
    }
  });

  const {
    handleSubmit,
    formState: { errors },
    reset
  } = methods;

  const onSubmit = (data: RegisterInputs) => {
    console.log({ data });
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
        <Stack spacing={3} mb={"1rem"}>
          <InputField name="email" type="email" label="Jaky je tvuj email?" placeholder="napis email" />
          <InputField name="emailConfirmation" label="Podtvrdi email" placeholder="napis email znovu" />
          <InputField name="password" label="Vymysli si heslo" placeholder="vytvor heslo" />
          <InputField name="passwordConfirmation" label="Podtrdi heslo" placeholder="napis heslo znovu" />
          <Text fontSize="md" as="b">
            Jak mame tobe rikat?
          </Text>
          <HStack spacing={3} justifyContent="space-between">
            <InputField name="name" label="Tvoje jmeno" placeholder="zadej jmeno" />
            <InputField name="surname" label="Tvoje primeni" placeholder="zadej prijmeni" />
            <InputField name="nickname" label="Mas prezdivku?" placeholder="zadej prezdivku" />
          </HStack>
          <Text fontSize="md" as="b">
            Který den jseš se narodil?
          </Text>
          <HStack spacing={3} justifyContent="space-between">
            <InputField name="day" label="Den" placeholder="dd" />
            <InputField name="month" label="Mesic" Component={Select}>
              {months.map((month) => {
                return <option>{month}</option>;
              })}
            </InputField>
            <InputField name="year" label="Rok" placeholder="yyyy" />
          </HStack>
        </Stack>
        <Button type="submit">Zaregestrovat se</Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;

import { Box, Button, FormLabel, HStack, Input, Stack, Text, Select, FormControl } from "@chakra-ui/react";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
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
  date: number;
  month: string;
  year: number;
};

const RegisterForm: FC = () => {
  const signInFormSchema = yup.object().shape({
    email: yup.string().email().required(),
    emailConfirmation: yup.string().oneOf([yup.ref("email"), null], "Emails must match"),
    password: yup.string().required("password is required"),
    passwordConfirmation: yup.string().oneOf([yup.ref("password"), null], "passwords must match"),
    name: yup.string().required(),
    surname: yup.string().required(),
    nickname: yup.string(),
    date: yup.date().required("date is invalid"),
    month: yup.string().required("month is invalid"),
    year: yup.number().required("year is invalid")
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
      nickname: ""
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = methods;

  const onSubmit = (data: RegisterInputs) => {
    console.log({ data });
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} mb={"1rem"}>
          <InputField name="email" label="Jaky je tvuj email?" placeholder="napis email" />
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
            <Box maxW="300px">
              <FormLabel>Den</FormLabel>
              <Input placeholder="dd" {...register("date")} />
              <p>{errors.date?.message}</p>
            </Box>
            <Box maxW="300px">
              <FormLabel>Měsic</FormLabel>
              <Select placeholder="měsic" {...register("month")}>
                <option>Leden</option>
                <option>Únor</option>
                <option>Březen</option>
                <option>Duben</option>
                <option>Květen</option>
                <option>Červen</option>
                <option>Červenec</option>
                <option>Srpen</option>
                <option>Září</option>
                <option>Říjen</option>
                <option>Listopad </option>
                <option>Prosinec </option>
              </Select>
              <p>{errors.month?.message}</p>
            </Box>
            <Box maxW="300px">
              <FormLabel>Rok</FormLabel>
              <Input placeholder="yyyy" {...register("year")} />
              <p>{errors.year?.message}</p>
            </Box>
          </HStack>
        </Stack>
        <Button type="submit">Zaregestrovat se</Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;

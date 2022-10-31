import { Button, HStack, Select, Stack, Text, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { number, object, ref, string } from "yup";
import { UserContext } from "components/contexts/UserContext";

import { useMutation } from "components/hooks/useMutation";
import { REGISTER_MUTATION } from "components/mutations/register";
import { LoginTokens } from "components/types/graphql";
import { AUTH_TOKEN, REFRESH_TOKEN } from "config";
import InputField from "shared/hook-form/FormField";
import { useRouter } from "next/router";

type RegisterInputs = {
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  userName: string;
  // day: number;
  // month: string;
  // year: number;
};

const signInFormSchema = object().shape({
  email: string().email().required().label("E-mail"),
  emailConfirmation: string()
    .oneOf([ref("email"), null], "E-mail se neshoduje")
    .label("Shoda e-mailu"),
  password: string()
    .min(8, "Heslo má obsahovat minimalně 8 znáku")
    .required()
    .label("Heslo")
    .matches(/\w*[a-z]\w*/, "Heslo má obsahovat velké písmeno")
    .matches(/\w*[A-Z]\w*/, "Heslo má obsahovat malé písmeno")
    .matches(/\d/, "Heslo má obsahovat číslo")
    .required()
    .label("Heslo"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Heslo má být stejné")
    .label("Ověření hesla"),
  firstName: string().required().label("Jméno"),
  lastName: string().required().label("Přijmení"),
  userName: string().required().label("Nickname")
  // day: number().required().label("Den"),
  // month: string().required().label("Měsíc"),
  // year: number().required().label("Rok")
});

const RegisterForm: FC = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const toast = useToast();

  const methods = useForm<RegisterInputs>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: "",
      emailConfirmation: "",
      password: "",
      passwordConfirmation: "",
      firstName: "",
      lastName: "",
      userName: ""
      // day: undefined,
      // month: "",
      // year: undefined
    }
  });

  const [registerLogin] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data: { registerLogin: LoginTokens }) => {
      localStorage.setItem(AUTH_TOKEN, data.registerLogin.accessToken);
      localStorage.setItem(REFRESH_TOKEN, data.registerLogin.refreshToken);
      userContext?.setTokens!(data.registerLogin);
      router.push("/app");
    },
    onError: (error) =>
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true
      })
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: RegisterInputs) => {
    registerLogin({
      variables: {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        email: data.email,
        password: data.password
      }
    });
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
            <InputField name="firstName" label="Tvoje jméno" placeholder="Zadej jméno" required />
            <InputField name="lastName" label="Tvoje příjmení" placeholder="Zadej příjmení" required />
            <InputField name="userName" label="Tvoje přezdívka" placeholder="Zadej přezdívku" required />
          </HStack>
          {/* <Text fontSize="md" as="b" mt="2rem">
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
          </HStack> */}
        </Stack>
        <Button type="submit">Zaregistrovat se</Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;

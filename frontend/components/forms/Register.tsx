import { Button, HStack, Stack, Text, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, ref, string } from "yup";

import InputField from "shared/hook-form/FormField";
import { useRegisterMutationMutation } from "types/generated-types";

type RegisterInputs = {
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
};

const registerFormSchema = object().shape({
  email: string().email().required().label("E-mail"),
  emailConfirmation: string()
    .oneOf([ref("email"), null], "E-mail se neshoduje")
    .label("Shoda e-mailu"),
  password: string()
    .min(8, "Heslo má obsahovat minimalně 8 znáku")
    .required()
    .label("Heslo")
    .matches(/\w*[a-z]\w*/, "Heslo má obsahovat malé písmeno")
    .matches(/\w*[A-Z]\w*/, "Heslo má obsahovat velké písmeno")
    .matches(/\d/, "Heslo má obsahovat číslo")
    .required()
    .label("Heslo"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Heslo má být stejné")
    .label("Ověření hesla"),
  firstName: string().required().label("Jméno"),
  lastName: string().required().label("Přijmení")
});

const RegisterForm: FC = () => {
  const toast = useToast();

  const methods = useForm<RegisterInputs>({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      email: "",
      emailConfirmation: "",
      password: "",
      passwordConfirmation: "",
      firstName: "",
      lastName: ""
    }
  });

  const [register] = useRegisterMutationMutation({
    onCompleted: () => {
      toast({
        title: "Na váše email jsme poslali potvrzení registrace.",
        description:
          "Pro přihlášení do aplikace je potřeba již poslední krok, kterým je potvrzení správnosti vašeho emailového účtu tím, že kliknete na odkaz ve vašem emailu.",
        status: "success",
        duration: 9000,
        isClosable: true
      });
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: RegisterInputs) => {
    register({
      variables: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      }
    });
  };

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
          </HStack>
        </Stack>
        <Button type="submit">Zaregistrovat se</Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;

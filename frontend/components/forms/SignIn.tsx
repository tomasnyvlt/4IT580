import { Box, Button, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";

import InputField from "shared/hook-form/FormField";

type SignInInputs = {
  email: string;
  password: string;
};

const SignInForm: FC = () => {
  const signInFormSchema = object().shape({
    email: string().email().required().label("E-mail"),
    password: string().required().label("Heslo")
  });
  const methods = useForm<SignInInputs>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: SignInInputs) => {
    console.log(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} mb="1rem">
          <Box>
            <InputField name="email" label="E-mail" type="email" placeholder="Zadej email" />
          </Box>
          <Box>
            <InputField name="password" label="Heslo" type="password" placeholder="Zadej heslo" />
          </Box>
        </Stack>
        <Button type="submit">Přihlásit se</Button>
      </form>
    </FormProvider>
  );
};

export default SignInForm;

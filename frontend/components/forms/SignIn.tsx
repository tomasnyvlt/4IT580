import { Box, Button, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";

import { AuthContext } from "components/contexts/AuthContext";
import { AUTH_TOKEN, REFRESH_TOKEN } from "config";
import InputField from "shared/hook-form/FormField";
import { LoginTokens, useLoginMutationMutation } from "types/generated-types";

type SignInInputs = {
  email: string;
  password: string;
};

const signInFormSchema = object().shape({
  email: string().required().label("E-mail"),
  password: string().required().label("Heslo")
});

const SignInForm: FC = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const methods = useForm<SignInInputs>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: "jc@seznam.cz",
      password: ".123123aA"
    }
  });

  const [login] = useLoginMutationMutation({
    onCompleted: (data: { login: LoginTokens }) => {
      localStorage.setItem(AUTH_TOKEN, data.login.accessToken);
      localStorage.setItem(REFRESH_TOKEN, data.login.refreshToken);
      authContext?.setTokens!(data.login);
      router.push("/app");
    }
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: SignInInputs) => {
    login({
      variables: {
        email: data.email,
        password: data.password
      }
    });
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} mb="1rem">
          <Box>
            <InputField name="email" label="E-mail" type="email" placeholder="Zadej e-mail" />
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

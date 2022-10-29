import { Box, Button, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";

import { UserContext } from "components/contexts/UserContext";
import { useMutation } from "components/hooks/useMutation";
import { LOGIN_MUTATION } from "components/mutations/login";
import { LoginTokens } from "components/types/graphql";
import { AUTH_TOKEN, REFRESH_TOKEN } from "config";
import InputField from "shared/hook-form/FormField";

type SignInInputs = {
  nickname: string;
  password: string;
};

const signInFormSchema = object().shape({
  nickname: string().required().label("Nickname"),
  password: string().required().label("Heslo")
});

const SignInForm: FC = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);

  const methods = useForm<SignInInputs>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      nickname: "tom_dre",
      password: "123123"
    }
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data: { login: LoginTokens }) => {
      localStorage.setItem(AUTH_TOKEN, data.login.accessToken);
      localStorage.setItem(REFRESH_TOKEN, data.login.refreshToken);
      userContext?.setTokens!(data.login);
      router.push("/app");
    }
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: SignInInputs) => {
    login({
      variables: {
        userName: data.nickname,
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
            <InputField name="nickname" label="Nickname" placeholder="Zadej nickname" />
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

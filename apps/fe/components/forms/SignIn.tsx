import { Box, Button, FormLabel, Input, Stack, StackDivider, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "shared/hook-form/FormField";

type SignInInputs = {
  email: string;
  password: string;
};

const SignInForm: FC = () => {
  const signInFormSchema = object().shape({
    email: string().email().required("Email je povinny"),
    password: string().required("Heslo je povinne")
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
    console.log({ data });
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} mb={"1rem"}>
          <Box>
            <InputField name="email" label="Email" type="email" placeholder="zadej email" />
          </Box>
          <Box>
            <InputField name="password" label="Heslo" type="password" placeholder="zadej heslo" />
          </Box>
        </Stack>
        <Button type="submit">Prihlasit se</Button>
      </form>
    </FormProvider>
  );
};

export default SignInForm;

import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { object, string } from "yup";
import {
  FormProvider,
  useForm
} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

const SignInFormSchema = object().shape({
  username: string().required(),
  password: string().required(),
});

const SignInForm: FC = () => {
  const form = useForm({
    resolver: yupResolver(SignInFormSchema),
    mode: 'all',
  });

  return (
    <Box>
      <FormProvider {...form}>
        <Box display="flex" flexDirection="column" gap="3rem">
          forms fields
        </Box>
      </FormProvider>
    </Box>
  )
};

export default SignInForm;

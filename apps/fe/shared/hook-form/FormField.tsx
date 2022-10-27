import { useController } from "react-hook-form";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { ComponentType, FC, ReactNode } from "react";

type InputField = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  children?: ReactNode;
  Component?: ComponentType<ComponentField>;
};

type ComponentField = {
  placeholder?: string;
  children: ReactNode;
};

const InputField: FC<InputField> = ({ name, label, placeholder, type, children, Component = Input, ...props }) => {
  const controller = useController({
    name
  });
  const error = controller?.fieldState?.error?.message;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Component {...props} {...controller.field} placeholder={placeholder} children={children} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;

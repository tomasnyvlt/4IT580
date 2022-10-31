import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { ComponentType, FC, ReactNode } from "react";
import { useController } from "react-hook-form";

export type ComponentFieldType = {
  placeholder?: string;
  children: ReactNode;
};
type InputFieldType = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  children?: ReactNode;
  required?: boolean;
  Component?: ComponentType<ComponentFieldType>;
};

const InputField: FC<InputFieldType> = ({
  name,
  label,

  children,
  Component = Input,
  required,
  ...props
}) => {
  const controller = useController({
    name
  });
  const error = controller?.fieldState?.error?.message;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>
        {label}
        {required && " *"}
      </FormLabel>
      <Component {...controller.field} {...props}>
        {children}
      </Component>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;

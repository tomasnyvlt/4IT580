import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { ComponentType, FC, ReactNode } from "react";
import { useController } from "react-hook-form";

export type ComponentFieldType = {
  placeholder?: string;
  children: ReactNode;
  checked?: boolean;
};
type InputFieldType = {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string | any[];
  type?: string;
  children?: ReactNode;
  required?: boolean;
  checked?: boolean;
  Component?: ComponentType<ComponentFieldType>;
};

const InputField: FC<InputFieldType> = ({ name, label, children, Component = Input, required, ...props }) => {
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

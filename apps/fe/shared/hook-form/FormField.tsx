import { useController } from "react-hook-form";

import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import React, { ComponentType, ReactNode } from "react";

type InputName = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  children?: ReactNode;
  Component?: ComponentType<{ placeholder?: string; children: ReactNode }>;
};

function InputField({ name, label, placeholder, type, children, Component = Input, ...props }: InputName) {
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
}

export default InputField;

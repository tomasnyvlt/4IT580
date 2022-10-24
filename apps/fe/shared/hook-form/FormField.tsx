import { useController } from "react-hook-form";

import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

type InputName = {
  name: string;
  label: string;
  placeholder: string;
};

function InputField({ name, label, placeholder, ...props }: InputName) {
  {
  }
  const controller = useController({
    name
  });
  const error = controller?.fieldState?.error?.message;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Input {...props} {...controller.field} placeholder={placeholder} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default InputField;

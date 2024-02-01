import { Input } from "@chakra-ui/react";

type PhoneInputProps = {
  register: any;
  name: string;
};

export default function PhoneInput({ register, name }: PhoneInputProps) {
  return (
    <Input
      {...register(name)}
      size={"lg"}
      placeholder={"987 654 321"}
      id="phone"
    />
  );
}

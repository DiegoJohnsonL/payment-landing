import { Select } from "@chakra-ui/react";

type CountrySelectProps = {
  register: any;
  name: string;
};

export default function CountrySelect({ register, name }: CountrySelectProps) {
  return (
    <Select
      size={"lg"}
      defaultValue={"PE"}
      fontSize={"14px"}
      w={"100%"}
      {...register(name)}
    >
      <option value="PE">PE +51</option>
    </Select>
  );
}

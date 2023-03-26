import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="white"
      h={12}
      px={16}
      borderColor="gray.600"
      fontSize="md"
      fontFamily="body"
      color="black"
      placeholderTextColor="blue.500"
      _focus={{
        bg: "blue.800",
        borderColor: "gray.600"
      }}
      {...rest}
    />
  );
}
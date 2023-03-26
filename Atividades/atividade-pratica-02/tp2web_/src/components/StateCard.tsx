import { TouchableOpacity, TouchableOpacityProps,Clipboard } from 'react-native';
import { Heading, HStack, Text, VStack } from 'native-base';


export interface StateCardProps {
  id: string;
  nome: string;
  sigla: string;
  createdAt: string;
  updatedAt: string;
}

interface Props extends TouchableOpacityProps {
  data: StateCardProps;
}

export function StateCard({ data, ...rest }: Props) {
  const handleCopyData = () => {
    const dataToCopy = `${data.id}`;
    Clipboard.setString(dataToCopy);
  };

  return (
    <TouchableOpacity {...rest}onLongPress={handleCopyData}>
      <HStack
        w="full"
        h={20}
        bgColor="blue.700"
        borderBottomWidth={3}
        borderBottomColor="blue.500"
        justifyContent="space-between"
        alignItems="center"
        rounded="sm"
        mb={3}
        p={4}
      >
        <VStack>
          <Heading color="white" fontSize="md" fontFamily="heading">
            {data.nome}
          </Heading>

          <Text color="gray.200" fontSize="xs">
            Sigla: {data.sigla}
          </Text>
          <Text color="gray.200" fontSize="xs">
            ID: {data.id}
          </Text>
        </VStack>

      </HStack>
    </TouchableOpacity>
  );
}
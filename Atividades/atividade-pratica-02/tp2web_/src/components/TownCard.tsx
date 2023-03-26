import { TouchableOpacity, TouchableOpacityProps,Clipboard } from 'react-native';
import { Heading, HStack, Text, VStack } from 'native-base';


export interface TownCardProps {
  id: string;
  nome: string;
  estado_id: string;
  createdAt: string;
  updatedAt: string;
}

interface Props extends TouchableOpacityProps {
  data: TownCardProps;
}

export function TownCard({ data, ...rest }: Props) {
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
            ID do Estado: {data.estado_id}
          </Text>
          <Text color="gray.200" fontSize="xs">
            ID da Cidade: {data.id}
          </Text>
        </VStack>

      </HStack>
    </TouchableOpacity>
  );
}
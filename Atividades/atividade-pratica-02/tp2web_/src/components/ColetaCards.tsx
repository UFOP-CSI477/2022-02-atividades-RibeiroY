import { TouchableOpacity, TouchableOpacityProps,Clipboard } from 'react-native';
import { Heading, HStack, Text, VStack } from 'native-base';


export interface ColetaCardProps {
  id: string;
  nome: string;
  rua: string;
  numero: string;
  complemento: string;
  documento: string;
  cidade_id: string;
}

interface Props extends TouchableOpacityProps {
  data: ColetaCardProps;
}

export function ColetaCard({ data, ...rest }: Props) {
  const handleCopyData = () => {
    const dataToCopy = `${data.id}`;
    Clipboard.setString(dataToCopy);
  };

  return (
    <TouchableOpacity {...rest}onLongPress={handleCopyData}>
      <HStack
        w="full"
        h={48}
        bgColor="blue.700"
        borderBottomWidth={3}
        borderBottomColor="blue.500"
        justifyContent="space-between"
        alignItems="center"
        rounded="sm"
        mb={3}
        p={8}
      >
        <VStack>
          <Heading color="white" fontSize="md" fontFamily="heading">
            {data.nome}
          </Heading>

          <Text color="gray.200" fontSize="xs">
            Rua: {data.rua}
          </Text>
          <Text color="gray.200" fontSize="xs">
            Número: {data.numero}
          </Text>
          <Text color="gray.200" fontSize="xs">
            Complemento: {data.complemento}
          </Text>
          <Text color="gray.200" fontSize="xs">
            ID da Cidade: {data.cidade_id}
          </Text>
          <Text color="gray.200" fontSize="xs">
            ID do local no BD: {data.id}
          </Text>
        </VStack>

      </HStack>
    </TouchableOpacity>
  );
}
import { TouchableOpacity, TouchableOpacityProps,Clipboard } from 'react-native';
import { Heading, HStack, Text, VStack } from 'native-base';


export interface TypeCardProps {
  id: string;
  tipo: string;
  fator: string;
}

interface Props extends TouchableOpacityProps {
  data: TypeCardProps;
}

export function TypeCard({ data, ...rest }: Props) {
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
            {data.tipo}
          </Heading>

          <Text color="gray.200" fontSize="xs">
            Fator: {data.fator}
          </Text>
          
          <Text color="gray.200" fontSize="xs">
            ID do tipo no BD: {data.id}
          </Text>
        </VStack>

      </HStack>
    </TouchableOpacity>
  );
}
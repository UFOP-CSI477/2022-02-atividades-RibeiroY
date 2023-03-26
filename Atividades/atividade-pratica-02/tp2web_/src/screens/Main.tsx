import { Heading, VStack, Text, useToast } from 'native-base';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';

export function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const toast = useToast();

    
    const handleNavigateToState = () => {
    navigation.navigate('state');
    };
    const handleNavigateToTown = () => {
        navigation.navigate('town');
    }
    const handleNavigateToPeople = () => {
        navigation.navigate('people');
    }
    const handleNavigateToColeta = () => {
        navigation.navigate('coleta');
    }

  return (
    <VStack flex={1} bgColor="black">
      <VStack mt={8} mx={5} alignItems="center">
        <Heading fontFamily="heading" color="blue.800" my={8}>
          Deseja acessar o menu de Estados, Cidades, Locais de coleta ou de pessoas?
        </Heading>
        <Button
          title="Acessar Estados"
          onPress={handleNavigateToState}
          isLoading={isLoading}
        />
        <Button
          title="Acessar Cidades"
          onPress={handleNavigateToTown}
          isLoading={isLoading}
        />
        <Button
          title="Acessar Locais de Coleta"
          onPress={handleNavigateToColeta}
          isLoading={isLoading}
        />
        <Button
          title="Acessar Pessoas"
          onPress={handleNavigateToPeople}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
}

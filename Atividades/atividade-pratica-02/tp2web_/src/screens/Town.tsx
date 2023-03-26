import {Heading, VStack, Text, useToast, FlatList} from 'native-base';

import { Input } from '../components/Input';
import iconRed from '../assets/iconRed.svg';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { Loading } from '../components/Loading';

import { TownCard, TownCardProps } from '../components/TownCard';

export function Town(){
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const [nome, setNome] = useState('');
    const [estadoId, setEstadoId] = useState('');
    const [state, setStates] = useState<TownCardProps[]>([]);

    
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await api.get('/cidades');
                setStates(response.data);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }

        useEffect(() => {
            fetchData();
        }, []);


    async function handleCreateTown() {
        try {
            setIsLoading(true);

            if(!nome.trim()){
                return toast.show({
                    title: "Preencha o nome da cidade",
                    placement: "top",
                    bgColor: "red.500",
                });
            }
            if(!estadoId.trim()){
                return toast.show({
                    title: "Preencha o ID do estado",
                    placement: "top",
                    bgColor: "red.500",
                });
            }

            await api.post('/cidades', {nome,estadoId});
            toast.show({
                title: "State cadastrado com sucesso!",
                placement: "top",
                bgColor: "green.500",
            });
            


        } catch (error) {
            console.log(error);
            setIsLoading(false);

            toast.show({
                title: "Não foi possível criar uma nova cidade",	
                placement: "top",
                bgColor: "red.500",
            })
        }
    }

    return(
        <VStack flex={1} bgColor="white">
            <VStack mt={8} mx={5} alignItems="center">
                

                <Heading fontFamily="heading" color="blue.500" mb={8}>
                    Cadastre ou encontre sua cidade!
                </Heading>
                <Input
                    mb={4}
                    placeholder="Qual o nome da cidade a ser cadastrada??"
                    autoCapitalize='characters'
                    onChangeText={setNome}
                />
                <Input
                    mb={4}
                    placeholder="Qual é o ID do estado no BD??"
                    autoCapitalize='characters'
                    onChangeText={setEstadoId}
                />
                <Button mb={4}
                    title="Criar cidade"
                    
                    onPress={handleCreateTown}
                />
                <Text color="black">CIDADES CADASTRADAS LOGO ABAIXO.
                MANTENHA CLICADO 2 SEGUNDOS PARA COPIAR O ID.
                </Text>
                
                <FlatList
                    px={10}
                    showsVerticalScrollIndicator={false}
                    data={state}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TownCard
                        data={item}
                        />
                    )}
                    />
            
                
                
            </VStack>    


        </VStack>


    );
}
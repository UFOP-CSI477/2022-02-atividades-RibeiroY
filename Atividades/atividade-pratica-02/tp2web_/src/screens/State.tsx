import {Heading, VStack, Text, useToast, FlatList} from 'native-base';

import { Input } from '../components/Input';
import iconRed from '../assets/iconRed.svg';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { Loading } from '../components/Loading';
import { StateCard, StateCardProps } from '../components/StateCard';

export function State(){
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const [nome, setNome] = useState('');
    const [sigla, setSigla] = useState('');
    const [state, setStates] = useState<StateCardProps[]>([]);

    const {navigate} = useNavigation();
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await api.get('/estados');
                setStates(response.data);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }

        useEffect(() => {
            fetchData();
        }, []);


    async function handleCreateState() {
        try {
            setIsLoading(true);

            if(!nome.trim()){
                return toast.show({
                    title: "Preencha o nome do estado",
                    placement: "top",
                    bgColor: "red.500",
                });
            }
            if(!sigla.trim()){
                return toast.show({
                    title: "Preencha a sigla do estado",
                    placement: "top",
                    bgColor: "red.500",
                });
            }

            await api.post('/estados', {nome,sigla});
            toast.show({
                title: "State cadastrado com sucesso!",
                placement: "top",
                bgColor: "green.500",
            });
            


        } catch (error) {
            console.log(error);
            setIsLoading(false);

            toast.show({
                title: "Não foi possível criar um novo Estado",	
                placement: "top",
                bgColor: "red.500",
            })
        }
    }

    return(
        <VStack flex={1} bgColor="white">
            <VStack mt={8} mx={5} alignItems="center">
                

                <Heading fontFamily="heading" color="blue.500" mb={8}>
                    Cadastre ou encontre seu estado!
                </Heading>
                <Input
                    mb={4}
                    placeholder="Qual o nome do estado a ser cadastrado??"
                    autoCapitalize='characters'
                    onChangeText={setNome}
                />
                <Input
                    mb={4}
                    placeholder="Qual é a sigla??"
                    autoCapitalize='characters'
                    onChangeText={setSigla}
                />
                <Button mb={4}
                    title="Criar estado"
                    
                    onPress={handleCreateState}
                />
                <Text color="black">ESTADOS CADASTRADOS LOGO ABAIXO.
                MANTENHA CLICADO 2 SEGUNDOS PARA COPIAR O ID.
                </Text>
                
                <FlatList
                    px={10}
                    showsVerticalScrollIndicator={false}
                    data={state}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <StateCard
                        data={item}
                        />
                    )}
                    />
            
                
                
            </VStack>    


        </VStack>


    );
}
import {Heading, VStack, Text, useToast, FlatList} from 'native-base';

import { Input } from '../components/Input';
import iconRed from '../assets/iconRed.svg';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { Loading } from '../components/Loading';

import { TownCard, TownCardProps } from '../components/TownCard';
import { PessoaCard, PessoaCardProps } from '../components/PessoaCard';
import { ColetaCard, ColetaCardProps } from '../components/ColetaCards';
import { TypeCard, TypeCardProps } from '../components/DonationCard';

export function Coleta(){
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const[id,setId] = useState('');
    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidadeId, setCidade] = useState('');

    const [tipo,setTipo]= useState <TypeCardProps[]>([]);
    
    const [coleta, setColeta] = useState<ColetaCardProps[]>([]);

    async function handleDeleteLocal(id: string) {
        try {
          setIsLoading(true);
      
          await api.delete(`/locais-coleta/${id}`);
      
          toast.show({
            title: "Local removido com sucesso!",
            placement: "top",
            bgColor: "green.500",
          });
      
          // Atualize a lista de pessoas após a exclusão bem-sucedida
          fetchData();
        } catch (error) {
          console.log(error);
          setIsLoading(false);
      
          toast.show({
            title: "Não foi possível remover o local",	
            placement: "top",
            bgColor: "red.500",
          })
        }
      }
      

    
    async function fetchData() {
        try {
          setIsLoading(true);
          const response = await api.get('/locais-coleta');
          setColeta(response.data);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
    }

        useEffect(() => {
            fetchData();
        }, []);
    async function fetchTipoData() {
        try {
            setIsLoading(true);
            const response = await api.get('/tipos-sanguineos');
            setTipo(response.data);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchTipoData();
    }, []);

    async function handleCreateColeta() {
        try {
            setIsLoading(true);

            if(!nome.trim()){
                return toast.show({
                    title: "Preencha o nome do local",
                    placement: "top",
                    bgColor: "red.500",
                });
            }
            if(!rua.trim()){
                return toast.show({
                    title: "Preencha a rua!",
                    placement: "top",
                    bgColor: "red.500",
                });
            }
            if(!numero.trim()){
                return toast.show({
                    title: "Preencha o número!",
                    placement: "top",
                    bgColor: "red.500",
                });
            }
            
            
            if(!cidadeId.trim()){
                return toast.show({
                    title: "Preencha o ID da cidade!",
                    placement: "top",
                    bgColor: "red.500",
                });
            }

            await api.post('/locais-coleta', {nome,rua,numero,complemento,cidadeId});
            toast.show({
                title: "Local cadastrado com sucesso!",
                placement: "top",
                bgColor: "green.500",
            });
            fetchData();
            


        } catch (error) {
            console.log(error);
            setIsLoading(false);

            toast.show({
                title: "Não foi possível cadastrar o local",	
                placement: "top",
                bgColor: "red.500",
            })
        }
    }

    return(
        <VStack flex={1} bgColor="white">
            <VStack mt={8} mx={5} alignItems="center">
                

                <Heading fontFamily="heading" color="blue.500" mb={8}>
                    Cadastre um local!
                </Heading>
                <Input
                    mb={4}
                    placeholder="Nome"
                    autoCapitalize='characters'
                    onChangeText={setNome}
                />
                <Input
                    mb={4}
                    placeholder="Rua"
                    autoCapitalize='characters'
                    onChangeText={setRua}
                />
                <Input
                    mb={4}
                    placeholder="Número"
                    autoCapitalize='characters'
                    onChangeText={setNumero}
                />
                <Input
                    mb={4}
                    placeholder="Complemento"
                    autoCapitalize='characters'
                    onChangeText={setComplemento}
                />
                <Input
                    mb={4}
                    placeholder="ID da cidade"
                    autoCapitalize='characters'
                    onChangeText={setCidade}
                />
                <Button mb={4}
                    title="Cadastrar local de coleta"
                    
                    onPress={handleCreateColeta}
                />
                <Text color="black">LOCAIS CADASTRADOS LOGO ABAIXO.
                MANTENHA CLICADO 2 SEGUNDOS PARA COPIAR O ID.
                </Text>
                
                <FlatList
                    px={10}
                    showsVerticalScrollIndicator={false}
                    data={coleta}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ColetaCard
                        data={item}
                        />
                    )}
                />
                <Text color="black">TIPOS SANGUÍNEOS DISPONÍVEIS ABAIXO
                </Text>
                
                <FlatList
                    px={10}
                    showsVerticalScrollIndicator={false}
                    data={tipo}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TypeCard
                        data={item}
                        />
                    )}
                />
                <Text color="black">SE QUISER DELETAR , DIGITE O ID DO LOCAL EXCLUÍDO NO INPUT ABAIXO
                </Text>
                <Input
                    mb={4}
                    placeholder="ID"
                    autoCapitalize='characters'
                    onChangeText={setId}
                />
                <Button
                mb={4}
                title="Deletar pessoa"
                onPress={() => handleDeleteLocal(id)}
                />
                
                
            </VStack>    


        </VStack>


    );
}
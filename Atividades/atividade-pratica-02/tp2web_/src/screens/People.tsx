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

export function People(){
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const[id,setId] = useState('');
    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [documento, setDocumento] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade_id, setCidade] = useState('');
    const [pessoas, setPessoas] = useState('');
    const [tipo_id, setTipo] = useState('');
    const [estadoId, setEstadoId] = useState('');
    const [people, setPeople] = useState<PessoaCardProps[]>([]);

    async function handleDeletePeople(id: string) {
        try {
          setIsLoading(true);
      
          await api.delete(`/pessoas/${id}`);
      
          toast.show({
            title: "Pessoa removida com sucesso!",
            placement: "top",
            bgColor: "green.500",
          });
      
          // Atualize a lista de pessoas após a exclusão bem-sucedida
          fetchData();
        } catch (error) {
          console.log(error);
          setIsLoading(false);
      
          toast.show({
            title: "Não foi possível remover a pessoa",	
            placement: "top",
            bgColor: "red.500",
          })
        }
      }
      

    
    async function fetchData() {
        try {
          setIsLoading(true);
          const response = await api.get('/pessoas');
          setPeople(response.data);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }

        useEffect(() => {
            fetchData();
        }, []);


    async function handleCreatePeople() {
        try {
            setIsLoading(true);

            if(!nome.trim()){
                return toast.show({
                    title: "Preencha o nome da cidade",
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
            if(!documento.trim()){
                return toast.show({
                    title: "Preencha o documento!",
                    placement: "top",
                    bgColor: "red.500",
                });
            }
            
            if(!cidade_id.trim()){
                return toast.show({
                    title: "Preencha o ID da cidade!",
                    placement: "top",
                    bgColor: "red.500",
                });
            }

            await api.post('/pessoas', {nome,rua,numero,documento,complemento,cidade_id,tipo_id});
            toast.show({
                title: "Pessoa cadastrado com sucesso!",
                placement: "top",
                bgColor: "green.500",
            });
            


        } catch (error) {
            console.log(error);
            setIsLoading(false);

            toast.show({
                title: "Não foi possível cadastrar a pessoa",	
                placement: "top",
                bgColor: "red.500",
            })
        }
    }

    return(
        <VStack flex={1} bgColor="white">
            <VStack mt={8} mx={5} alignItems="center">
                

                <Heading fontFamily="heading" color="blue.500" mb={8}>
                    Cadastre uma pessoa!
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
                    placeholder="Número do documento"
                    autoCapitalize='characters'
                    onChangeText={setDocumento}
                />
                <Input
                    mb={4}
                    placeholder="ID da cidade"
                    autoCapitalize='characters'
                    onChangeText={setCidade}
                />
                <Input
                    mb={4}
                    placeholder="ID do tipo sanguíneo (deixe em branco se não souber)"	
                    autoCapitalize='characters'
                    onChangeText={setTipo}
                />
                <Button mb={4}
                    title="Cadastrar pessoa"
                    
                    onPress={handleCreatePeople}
                />
                <Text color="black">PESSOAS CADASTRADAS LOGO ABAIXO.
                MANTENHA CLICADO 2 SEGUNDOS PARA COPIAR O ID.
                </Text>
                
                <FlatList
                    px={10}
                    showsVerticalScrollIndicator={false}
                    data={people}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <PessoaCard
                        data={item}
                        />
                    )}
                />
                <Text color="black">SE QUISER DELETAR, DIGITE O ID DA PESSOA EXCLUÍDA NO INPUT ABAIXO
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
                onPress={() => handleDeletePeople(id)}
                />
                
                
            </VStack>    


        </VStack>


    );
}
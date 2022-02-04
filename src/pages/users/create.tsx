import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Favor inserir seu nome'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido!'),
  password: yup.string().required('Senha obrigatória').min(6, 'Mínimo de 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais'),
})

export default function CreateUser() {
  const { register, handleSubmit, formState, control } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  const { isSubmitting } = useFormState({
    control
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values, event) =>{
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(values);
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box  as="form" flex="1" borderRadius={8} bg="gray.800" p={['6', '8']} onSubmit={handleSubmit(handleCreateUser)}>
          <Heading size="large" fontWeight="normal">
            Criar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing={['6', '8']}>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input {...register('name')} error={errors.name} name="name" label="Nome completo" />
              <Input {...register('email')} error={errors.email} name="email" type="email" label="E-mail" />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input {...register('password')} error={errors.password} name="password" type="password" label="Senha" />
              <Input {...register('password_confirmation')}
                error={errors.password_confirmation}
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
              />
            </SimpleGrid>
          </VStack>

          <Flex mt={['6', '8']} justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button colorScheme="pink" type="submit" isLoading={isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
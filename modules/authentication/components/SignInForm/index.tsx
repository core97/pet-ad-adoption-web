'use client';

import { useForm } from 'react-hook-form';
import { Button, VStack, Container } from '@chakra-ui/react';
import { InputText } from '@ui/InputText';
import { useAsync } from '@hooks/useAsync';
import { signIn } from '@auth/auth-service';
import { SignInFormFields } from './SignInForm.interface';

export const SignInForm = () => {
  const { handleSubmit, control } = useForm<SignInFormFields>();

  const onSubmit = useAsync(
    async (data: SignInFormFields) => {
      const user = await signIn({ email: data.email, password: data.password });
      console.log(user);
    },
    {
      onSuccess: {
        redirect: '/',
      },
    }
  );

  return (
    <Container as="section" maxWidth="md">
      <VStack as="form" onSubmit={handleSubmit(onSubmit.execute)}>
        <InputText
          label="Email"
          type="email"
          control={control}
          name="email"
          rules={{ required: true }}
        />
        <InputText
          label="Contraseña"
          type="password"
          control={control}
          name="password"
          rules={{ required: true }}
        />
        <Button type="submit" isLoading={onSubmit.status === 'loading'}>
          Submit
        </Button>
      </VStack>
    </Container>
  );
};

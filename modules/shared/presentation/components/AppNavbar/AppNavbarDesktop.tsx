import { HStack, Button } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { useUser } from '@user/presentation/hooks/useUser';

export const AppNavbarDesktop = () => {
  const { user } = useUser();

  return (
    <HStack as="nav">
      <Link href="/dogs">Perros</Link>
      <Link href="/cats">Gatos</Link>
      {user && (
        <Button
          type="button"
          variant="link"
          onClick={() => console.log('*** SALIR ***')}
        >
          Salir
        </Button>
      )}
      {!user && <Link href="/auth/sign-in">Iniciar sesión</Link>}
    </HStack>
  );
};

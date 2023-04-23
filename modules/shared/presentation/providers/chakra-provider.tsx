'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { chakraTheme } from 'styles/chakra-theme';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <CacheProvider>
    <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
  </CacheProvider>
);

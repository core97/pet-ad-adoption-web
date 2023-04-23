import { extendTheme, withDefaultVariant } from '@chakra-ui/react';
import { FormLabel } from './components';

export const chakraTheme = extendTheme(
  {
    components: {
      FormLabel,
    },
  },
  withDefaultVariant({
    variant: 'filled',
    components: ['Input', 'Textarea'],
  })
);

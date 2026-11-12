import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { I18nextProvider } from 'react-i18next';
import { createI18n } from '@app/shared';
import { theme } from '@app/shared/theme';
import '@mantine/core/styles.css';
import '@app/shared/theme.css';
import { MockupApp } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={createI18n()}>
      <MantineProvider theme={theme}>
        <MockupApp />
      </MantineProvider>
    </I18nextProvider>
  </StrictMode>,
);

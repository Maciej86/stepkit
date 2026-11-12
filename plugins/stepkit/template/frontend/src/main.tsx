import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { I18nextProvider } from 'react-i18next';
import { createI18n } from '@app/shared';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { App } from './App';
import { NOTIFICATION_AUTOCLOSE_MS } from './config/constants';
import { AuthProvider } from './core/auth/AuthProvider';
import { theme } from './core/theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={createI18n()}>
      <MantineProvider theme={theme}>
        <Notifications autoClose={NOTIFICATION_AUTOCLOSE_MS} />
        <AuthProvider>
          <App />
        </AuthProvider>
      </MantineProvider>
    </I18nextProvider>
  </StrictMode>,
);

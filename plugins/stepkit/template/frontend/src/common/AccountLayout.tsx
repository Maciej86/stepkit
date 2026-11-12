import { AppShell, Group, Text } from '@mantine/core';
import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ACCOUNT_NAVIGATION } from '@app/shared';
import { useAuth } from '../core/auth/AuthProvider';
import { COLOR_SCHEME_TOGGLE } from '@app/shared/theme';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { LogoutButton } from './LogoutButton';
import { NavMenu } from './NavMenu';

/** Konto użytkownika: proste menu konta u góry. */
export function AccountLayout() {
  const { t } = useTranslation();
  const { user } = useAuth();
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Text fw={700}>{t('app_name')}</Text>
            <Group gap={0}>
              <NavMenu items={ACCOUNT_NAVIGATION} user={user} />
            </Group>
          </Group>
          <Group gap="xs">
            {COLOR_SCHEME_TOGGLE && <ColorSchemeToggle />}
            {user && <LogoutButton />}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

import { AppShell, Group, Text } from '@mantine/core';
import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import { NAVIGATION } from '@app/shared';
import { useAuth } from '../core/auth/AuthProvider';
import { COLOR_SCHEME_TOGGLE } from '@app/shared/theme';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { LogoutButton } from './LogoutButton';
import { NavMenu } from './NavMenu';

/** Panel administracyjny: menu z boku. */
export function AppLayout() {
  const { t } = useTranslation();
  const { user } = useAuth();
  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 260, breakpoint: 'sm' }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Text fw={700}>{t('app_name')}</Text>
          <Group gap="xs">
            {COLOR_SCHEME_TOGGLE && <ColorSchemeToggle />}
            {user && <LogoutButton />}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="xs">
        <NavMenu items={NAVIGATION} user={user} />
      </AppShell.Navbar>
      <AppShell.Main bg="var(--app-panel-background)">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

import { AppShell, Group, Text } from '@mantine/core';
import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import { NAVIGATION } from '@app/shared';
import { useAuth } from '../core/auth/AuthProvider';
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
          {user && <LogoutButton />}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="xs">
        <NavMenu items={NAVIGATION} user={user} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

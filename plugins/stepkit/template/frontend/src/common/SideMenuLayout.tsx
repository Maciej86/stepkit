import { useEffect } from 'react';
import { AppShell, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { NavItem } from '@app/shared';
import { COLOR_SCHEME_TOGGLE } from '@app/shared/theme';
import { useAuth } from '../core/auth/AuthProvider';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { LogoutButton } from './LogoutButton';
import { NavMenu } from './NavMenu';

/**
 * Układ panelu i konta: górna belka, menu z boku, treść na tle panelu. Na telefonie menu jest schowane pod przyciskiem
 * w belce i chowa się samo po wybraniu pozycji.
 */
export function SideMenuLayout({ items }: { items: NavItem[] }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [opened, { toggle, close }] = useDisclosure(false);
  useEffect(close, [pathname, close]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 260, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              aria-label={t(opened ? 'menu_close' : 'menu_open')}
            />
            <Text fw={700} truncate>
              {t('app_name')}
            </Text>
          </Group>
          <Group gap="xs" wrap="nowrap">
            {COLOR_SCHEME_TOGGLE && <ColorSchemeToggle />}
            {user && <LogoutButton />}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="xs">
        <NavMenu items={items} user={user} />
      </AppShell.Navbar>
      <AppShell.Main bg="var(--app-panel-background)">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

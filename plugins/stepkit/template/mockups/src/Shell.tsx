import type { ComponentType, ReactNode } from 'react';
import { AppShell, Box, Group, NavLink, SegmentedControl, Text } from '@mantine/core';
import { COLOR_SCHEME_TOGGLE } from '@app/shared/theme';
import { ColorSchemeToggle } from './common/ColorSchemeToggle';
import { NavIcon } from './common/icons';
import { NavLink as RouterLink, useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  ROLE_HOME,
  ROLE_LABELS,
  ROLES,
  translateKey,
  visibleNav,
  type Areas,
  type NavItem,
  type PublicNavItem,
  type Role,
} from '@app/shared';

export type Part = 'public' | 'account' | 'admin';

export function partOf(path: string): Part {
  if (path.startsWith('/account')) return 'account';
  if (path.startsWith('/admin')) return 'admin';
  return 'public';
}

const PART_HOME: Record<Part, string> = { public: '/', account: '/account', admin: '/admin' };

/** Pierwsza rola, która po zalogowaniu trafia do danej części. */
export function defaultRole(part: Part): Role {
  return ROLES.find((r) => ROLE_HOME[r] === `/${part}`) ?? ROLES[0];
}

interface Props {
  areas: Areas;
  navigation: NavItem[];
  accountNavigation: NavItem[];
  publicNavigation: PublicNavItem[];
  role: Role;
  onRoleChange(role: Role): void;
  children: ReactNode;
}

function MenuLinks({ items, role }: { items: NavItem[]; role: Role }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const render = (list: NavItem[]): ReactNode =>
    list.map((item) => (
      <NavLink
        key={item.key}
        component={RouterLink}
        to={item.path}
        end
        label={translateKey(t, item.label)}
        leftSection={<NavIcon name={item.icon} />}
        active={pathname === item.path}
      >
        {item.children ? render(item.children) : undefined}
      </NavLink>
    ));
  return <>{render(visibleNav(items, { id: 0, name: 'Makieta', role }))}</>;
}

function ProgressLink() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return <NavLink component={RouterLink} to="/progress" label={t('mockup.progress')} active={pathname === '/progress'} />;
}

export function Shell({ areas, navigation, accountNavigation, publicNavigation, role, onRoleChange, children }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const current = pathname === '/progress' ? null : partOf(pathname);
  const parts = (['public', 'account', 'admin'] as Part[]).filter((p) => areas[p]);
  const showRoles = current === 'account' || current === 'admin' || current === null;

  return (
    <AppShell header={{ height: 96 }} navbar={{ width: 240, breakpoint: 'sm' }} padding="md">
      <AppShell.Header>
        <Box bg="yellow.4" px="md" py={4}>
          <Text fw={700} size="sm">{t('mockup.bar')}</Text>
        </Box>
        <Group px="md" h={60} justify="space-between">
          {parts.length > 1 ? (
            <SegmentedControl
              aria-label={t('mockup.part')}
              value={current ?? 'admin'}
              onChange={(value) => {
                const part = value as Part;
                onRoleChange(defaultRole(part));
                navigate(PART_HOME[part]);
              }}
              data={parts.map((p) => ({ value: p, label: t(`mockup.part_${p}`) }))}
            />
          ) : (
            <span />
          )}
          <Group gap="md">
            {COLOR_SCHEME_TOGGLE && <ColorSchemeToggle />}
            {showRoles && (
              <Group gap="xs">
                <Text size="sm">{t('mockup.viewing_as')}</Text>
                <SegmentedControl
                  aria-label={t('mockup.viewing_as')}
                  value={role}
                  onChange={(value) => onRoleChange(value as Role)}
                  data={ROLES.map((r) => ({ value: r, label: translateKey(t, ROLE_LABELS[r]) }))}
                />
              </Group>
            )}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="xs">
        {current === 'public' &&
          publicNavigation.map((item) => (
            <NavLink key={item.key} component={RouterLink} to={item.path} label={translateKey(t, item.label)} active={pathname === item.path} />
          ))}
        {current === 'account' && <MenuLinks items={accountNavigation} role={role} />}
        {(current === 'admin' || current === null) && <MenuLinks items={navigation} role={role} />}
        <ProgressLink />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export type Screens = Record<string, ComponentType>;

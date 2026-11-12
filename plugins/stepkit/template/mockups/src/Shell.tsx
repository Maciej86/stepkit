import { useEffect, type ComponentType, type ReactNode } from 'react';
import { AppShell, Box, Burger, Divider, Group, NavLink, SegmentedControl, Stack, Text, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { COLOR_SCHEME_TOGGLE } from '@app/shared/theme';
import { ColorSchemeToggle } from './common/ColorSchemeToggle';
import { NavIcon } from './common/icons';
import { VariantSwitch } from './appearance/ThemeVariants';
import { NavLink as RouterLink, useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  activeNavKey,
  flattenNav,
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
  const visible = visibleNav(items, { id: 0, name: 'Makieta', role });
  const activeKey = activeNavKey(flattenNav(visible), pathname);
  const render = (list: NavItem[]): ReactNode =>
    list.map((item) => (
      <NavLink
        key={item.key}
        component={RouterLink}
        to={item.path}
        end
        label={translateKey(t, item.label)}
        leftSection={<NavIcon name={item.icon} />}
        active={item.key === activeKey}
      >
        {item.children ? render(item.children) : undefined}
      </NavLink>
    ));
  return <>{render(visible)}</>;
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
  const [menuOpened, { toggle: toggleMenu, close: closeMenu }] = useDisclosure(false);
  useEffect(closeMenu, [pathname, closeMenu]);
  // Na telefonie przełączniki makiety nie mieszczą się w belce: trafiają na górę wysuwanego menu.
  const theme = useMantineTheme();
  const isPhone = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`) ?? false;

  const partSwitch =
    parts.length > 1 ? (
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
    ) : null;
  const roleSwitch = showRoles ? (
    <Group gap="xs" wrap="nowrap">
      <Text size="sm">{t('mockup.viewing_as')}</Text>
      <SegmentedControl
        aria-label={t('mockup.viewing_as')}
        value={role}
        onChange={(value) => onRoleChange(value as Role)}
        data={ROLES.map((r) => ({ value: r, label: translateKey(t, ROLE_LABELS[r]) }))}
      />
    </Group>
  ) : null;
  const toggles = (
    <Group gap="md" wrap="nowrap">
      <VariantSwitch />
      {COLOR_SCHEME_TOGGLE && <ColorSchemeToggle />}
    </Group>
  );

  return (
    <AppShell
      header={{ height: 96 }}
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !menuOpened } }}
      padding="md"
    >
      <AppShell.Header>
        <Box bg="yellow.4" px="md" py={4}>
          <Text fw={700} size="sm">{t('mockup.bar')}</Text>
        </Box>
        <Group px="md" h={60} justify="space-between" wrap="nowrap">
          <Burger
            opened={menuOpened}
            onClick={toggleMenu}
            hiddenFrom="sm"
            size="sm"
            aria-label={t(menuOpened ? 'menu_close' : 'menu_open')}
          />
          {isPhone ? (
            toggles
          ) : (
            <>
              {partSwitch ?? <span />}
              <Group gap="md" wrap="nowrap">
                {toggles}
                {roleSwitch}
              </Group>
            </>
          )}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="xs">
        {isPhone && (partSwitch || roleSwitch) && (
          <Stack gap="xs" mb="xs">
            {partSwitch}
            {roleSwitch}
            <Divider />
          </Stack>
        )}
        {current === 'public' &&
          publicNavigation.map((item) => (
            <NavLink key={item.key} component={RouterLink} to={item.path} label={translateKey(t, item.label)} active={item.key === activeNavKey(publicNavigation, pathname)} />
          ))}
        {current === 'account' && <MenuLinks items={accountNavigation} role={role} />}
        {(current === 'admin' || current === null) && <MenuLinks items={navigation} role={role} />}
        <ProgressLink />
      </AppShell.Navbar>
      <AppShell.Main bg={current === 'public' ? undefined : 'var(--app-panel-background)'}>{children}</AppShell.Main>
    </AppShell>
  );
}

export type Screens = Record<string, ComponentType>;

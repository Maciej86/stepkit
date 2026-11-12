import { AppShell, Button, Group, Text } from '@mantine/core';
import { Link, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PUBLIC_NAVIGATION, translateKey, type Areas } from '@app/shared';

/** Strona dla odwiedzających: menu u góry. */
export function PublicLayout({ areas }: { areas: Areas }) {
  const { t } = useTranslation();
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Text fw={700}>{t('app_name')}</Text>
            {PUBLIC_NAVIGATION.map((item) => (
              <Button key={item.key} component={Link} to={item.path} variant="subtle">
                {translateKey(t, item.label)}
              </Button>
            ))}
          </Group>
          {(areas.account || areas.admin) && (
            <Button component={Link} to="/login">
              {t('login')}
            </Button>
          )}
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

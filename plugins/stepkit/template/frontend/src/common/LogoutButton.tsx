import { Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { api } from '../core/api/client';
import { useAuth } from '../core/auth/AuthProvider';

export function LogoutButton() {
  const { t } = useTranslation();
  const { refresh } = useAuth();
  const logout = async () => {
    await api.post('/auth/logout').catch(() => undefined);
    await refresh();
  };
  return (
    <Button variant="subtle" onClick={logout}>
      {t('logout')}
    </Button>
  );
}

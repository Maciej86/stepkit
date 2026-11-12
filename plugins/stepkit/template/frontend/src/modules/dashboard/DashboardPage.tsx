import { Stack, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export function DashboardPage() {
  const { t } = useTranslation('dashboard');
  return (
    <Stack>
      <Title order={2}>{t('title')}</Title>
      <Text>{t('ready')}</Text>
    </Stack>
  );
}

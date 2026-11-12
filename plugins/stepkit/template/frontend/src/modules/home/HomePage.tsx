import { Stack, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation('home');
  return (
    <Stack>
      <Title order={1}>{t('title')}</Title>
      <Text>{t('intro')}</Text>
    </Stack>
  );
}

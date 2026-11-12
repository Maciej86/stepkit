import { Center, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

/** Zaślepka zamiast ekranu modułu, który jest już zrobiony w prawdziwej aplikacji. */
export function Done({ module }: { module: string }) {
  const { t } = useTranslation();
  return (
    <Center p="xl">
      <Stack align="center" gap="xs">
        <Text fw={700}>{module}</Text>
        <Text>{t('mockup.done')}</Text>
        <Text c="dimmed" size="sm">{t('mockup.done_link')}</Text>
      </Stack>
    </Center>
  );
}

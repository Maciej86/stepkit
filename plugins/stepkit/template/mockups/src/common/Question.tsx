import type { ReactNode } from 'react';
import { Alert, List, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface Props {
  number: number;
  options?: { id: string; text: string }[];
  recommended?: string;
  children: ReactNode;
}

/** Pytanie do użytkownika na ekranie makiety. Numer zgodny z docs/modules/<module>/QUESTIONS.md. */
export function Question({ number, options, recommended, children }: Props) {
  const { t } = useTranslation();
  return (
    <Alert color="yellow" variant="light" title={t('mockup.question', { number })} my="sm">
      <Text size="sm">{children}</Text>
      {options && (
        <List size="sm" mt="xs">
          {options.map((o) => (
            <List.Item key={o.id}>
              {o.id}) {o.text} {o.id === recommended && <strong>{t('mockup.recommended')}</strong>}
            </List.Item>
          ))}
        </List>
      )}
    </Alert>
  );
}

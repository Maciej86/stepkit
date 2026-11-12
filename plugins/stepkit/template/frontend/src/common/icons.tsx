import { IconCircle, IconHome, IconUser, type Icon } from '@tabler/icons-react';

/** Nazwy ikon używane w navigation.config.ts. Nowa ikona: dopisz ją tutaj. */
const ICONS: Record<string, Icon> = { home: IconHome, user: IconUser };

export function NavIcon({ name }: { name: string }) {
  const Component = ICONS[name] ?? IconCircle;
  return <Component size={18} stroke={1.5} />;
}

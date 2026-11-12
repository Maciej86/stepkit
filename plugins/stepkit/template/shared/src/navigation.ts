import { isRole, type Role } from './constants/roles';

export interface SessionUser {
  id: number;
  name: string;
  role: Role;
}

/** Pozycja nawigacji konta lub panelu. `key` = nazwa folderu modułu, `label` = klucz tekstu. */
export interface NavItem {
  key: string;
  path: string;
  label: string;
  /** Nazwa ikony z Lucide (https://lucide.dev/icons/), np. 'house', 'calendar-days'. Mapa: common/icons.tsx. */
  icon: string;
  roles: Role[];
  children?: NavItem[];
}

/** Pozycja strony dla odwiedzających (bez ról). */
export interface PublicNavItem {
  key: string;
  path: string;
  label: string;
}

export interface Areas {
  public: boolean;
  account: boolean;
  admin: boolean;
}

export type AreaHome = '/account' | '/admin';

export function canSee(item: NavItem, user: SessionUser | null): boolean {
  if (!user || !isRole(user.role)) return false;
  return item.roles.includes(user.role);
}

export function visibleNav(items: NavItem[], user: SessionUser | null): NavItem[] {
  const result: NavItem[] = [];
  for (const item of items) {
    if (!canSee(item, user)) continue;
    if (item.children && item.children.length > 0) {
      const children = visibleNav(item.children, user);
      if (children.length === 0) continue;
      result.push({ ...item, children });
    } else {
      result.push({ ...item });
    }
  }
  return result;
}

export function flattenNav(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => [item, ...flattenNav(item.children ?? [])]);
}

/**
 * Role, które mają dostęp do modułu pozycji nawigacji `key` (jej role i role pozycji pod nią) albo null, gdy takiej
 * pozycji nie ma. Z tego korzysta mountModule w backendzie: menu i API mają jedno źródło uprawnień.
 */
export function rolesFor(key: string, items: NavItem[]): Role[] | null {
  const found = flattenNav(items).find((item) => item.key === key);
  if (!found) return null;
  return [...new Set(flattenNav([found]).flatMap((item) => item.roles))];
}

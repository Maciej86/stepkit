import { describe, expect, it } from 'vitest';
import {
  ACCOUNT_NAVIGATION,
  AREAS,
  NAVIGATION,
  PUBLIC_NAVIGATION,
  ROLE_HOME,
  ROLE_LABELS,
  ROLES,
  SERVER_MESSAGES,
  canSee,
  createI18n,
  flattenNav,
  isRole,
  visibleNav,
  type NavItem,
  type SessionUser,
} from './index';

const admin: SessionUser = { id: 1, name: 'Anna', role: 'admin' };
const user: SessionUser = { id: 2, name: 'Jan', role: 'user' };

const item = (key: string, roles: NavItem['roles'], children?: NavItem[]): NavItem => ({
  key,
  path: `/admin/${key}`,
  label: `common.nav.${key}`,
  icon: 'home',
  roles,
  children,
});

describe('canSee', () => {
  it('hides everything from a logged-out visitor', () => {
    expect(canSee(item('a', ['admin', 'user']), null)).toBe(false);
  });

  it('shows an item to a role listed in roles', () => {
    expect(canSee(item('a', ['admin']), admin)).toBe(true);
  });

  it('hides an item from a role not listed in roles', () => {
    expect(canSee(item('a', ['admin']), user)).toBe(false);
  });

  it('hides an item from an unknown role', () => {
    expect(canSee(item('a', ['admin', 'user']), { id: 3, name: 'X', role: 'hacker' } as never)).toBe(false);
  });
});

describe('visibleNav', () => {
  it('keeps a parent with only its visible children', () => {
    const items = [item('p', ['user'], [item('c1', ['user']), item('c2', ['admin'])])];
    const result = visibleNav(items, user);
    expect(result).toHaveLength(1);
    expect(result[0].children?.map((c) => c.key)).toEqual(['c1']);
  });

  it('drops a parent whose children are all hidden', () => {
    const items = [item('p', ['user'], [item('c1', ['admin'])])];
    expect(visibleNav(items, user)).toEqual([]);
  });

  it('does not modify the input', () => {
    const items = [item('p', ['user'], [item('c1', ['user']), item('c2', ['admin'])])];
    const copy = structuredClone(items);
    visibleNav(items, user);
    expect(items).toEqual(copy);
  });
});

describe('flattenNav', () => {
  it('lists parents before their children', () => {
    const items = [item('p', ['user'], [item('c1', ['user'])]), item('q', ['user'])];
    expect(flattenNav(items).map((i) => i.key)).toEqual(['p', 'c1', 'q']);
  });
});

describe('isRole', () => {
  it('accepts known roles only', () => {
    expect(ROLES.every((r) => isRole(r))).toBe(true);
    expect(isRole('hacker')).toBe(false);
    expect(isRole(undefined)).toBe(false);
  });
});

describe('texts', () => {
  const i18n = createI18n();
  const keys = [
    ...Object.values(SERVER_MESSAGES),
    ...Object.values(ROLE_LABELS),
    ...flattenNav(NAVIGATION).map((i) => i.label),
    ...flattenNav(ACCOUNT_NAVIGATION).map((i) => i.label),
    ...PUBLIC_NAVIGATION.map((i) => i.label),
  ];

  it.each(keys)('has a Polish text for %s', (key) => {
    const [ns, ...rest] = key.split('.');
    const text = i18n.t(rest.join('.'), { ns });
    expect(text).not.toBe(rest.join('.'));
    expect(text.trim()).not.toBe('');
  });
});

describe('navigation config', () => {
  it('keeps admin paths under /admin', () => {
    expect(flattenNav(NAVIGATION).every((i) => i.path.startsWith('/admin'))).toBe(true);
  });

  it('keeps account paths under /account', () => {
    expect(flattenNav(ACCOUNT_NAVIGATION).every((i) => i.path.startsWith('/account'))).toBe(true);
  });

  it('keeps public paths outside /admin and /account', () => {
    expect(
      PUBLIC_NAVIGATION.every((i) => !i.path.startsWith('/admin') && !i.path.startsWith('/account')),
    ).toBe(true);
  });

  it('gives every role a home in an enabled area', () => {
    for (const role of ROLES) {
      const home = ROLE_HOME[role];
      expect(home).toBeDefined();
      expect(home === '/admin' ? AREAS.admin : AREAS.account).toBe(true);
    }
  });
});

import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { NavItem } from '@app/shared';
import { NavMenu } from './NavMenu';
import { renderWithProviders } from '../test/render';

const items: NavItem[] = [
  { key: 'dashboard', path: '/admin', label: 'common.nav.dashboard', icon: 'home', roles: ['admin', 'user'] },
  { key: 'my-account', path: '/admin/secret', label: 'common.nav.my_account', icon: 'user', roles: ['admin'] },
];

describe('NavMenu', () => {
  it('shows only items the role may see', () => {
    renderWithProviders(
      <MemoryRouter>
        <NavMenu items={items} user={{ id: 2, name: 'Jan', role: 'user' }} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Pulpit')).toBeInTheDocument();
    expect(screen.queryByText('Moje konto')).not.toBeInTheDocument();
  });

  it('shows nothing to a logged-out visitor', () => {
    renderWithProviders(
      <MemoryRouter>
        <NavMenu items={items} user={null} />
      </MemoryRouter>,
    );
    expect(screen.queryByText('Pulpit')).not.toBeInTheDocument();
  });
});

import { AxiosError, AxiosHeaders } from 'axios';
import { apiErrorMessage } from './client';
import { i18n } from '../../test/render';

function axiosError(data: unknown) {
  return new AxiosError('fail', 'ERR', undefined, undefined, {
    status: 403,
    statusText: 'Forbidden',
    data,
    headers: {},
    config: { headers: new AxiosHeaders() },
  });
}

describe('apiErrorMessage', () => {
  it('translates the key sent by the server', () => {
    expect(apiErrorMessage(axiosError({ error: { message: 'server.no_access' } }), i18n.t)).toBe(
      'Nie masz dostępu do tej części aplikacji.',
    );
  });

  it('explains a missing connection', () => {
    expect(apiErrorMessage(new AxiosError('Network Error', 'ERR_NETWORK'), i18n.t)).toBe(
      'Brak połączenia z serwerem. Czy backend działa? (npm run dev)',
    );
  });
});

/** Klucze komunikatów zwracanych przez backend (tekst w shared/locales/pl/server.json). */
export const SERVER_MESSAGES = {
  notFound: 'server.not_found',
  serverError: 'server.error',
  loginRequired: 'server.login_required',
  noAccess: 'server.no_access',
  invalidData: 'server.invalid_data',
  dbDown: 'server.db_down',
  tooManyLogins: 'server.too_many_logins',
} as const;

export type ServerMessage = (typeof SERVER_MESSAGES)[keyof typeof SERVER_MESSAGES];

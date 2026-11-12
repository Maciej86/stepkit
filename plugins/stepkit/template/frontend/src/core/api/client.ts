import axios, { isAxiosError } from 'axios';
import { translateKey } from '@app/shared';
import type { TFunction } from 'i18next';

export const api = axios.create({ baseURL: '/api', withCredentials: true });

/** Tekst błędu dla człowieka: tłumaczy klucz z odpowiedzi serwera. */
export function apiErrorMessage(err: unknown, t: TFunction): string {
  if (isAxiosError(err) && err.response) {
    const key = (err.response.data as { error?: { message?: string } } | undefined)?.error?.message;
    if (key) return translateKey(t, key);
    return translateKey(t, 'server.error');
  }
  return translateKey(t, 'common.no_connection');
}

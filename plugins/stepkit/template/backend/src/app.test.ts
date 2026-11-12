import { beforeAll, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

vi.mock('./db/pool', () => ({ pool: { query: vi.fn() } }));

const SECRET = 'test-secret-test-secret-test-secret';
process.env.JWT_SECRET = SECRET;

const { pool } = await import('./db/pool');
const { createApp } = await import('./app');
const { signToken } = await import('./auth/token');
const { requireRole } = await import('./middleware/requireRole');
const { validateBody } = await import('./middleware/validateBody');
const { AUTH_COOKIE_NAME } = await import('./config/constants');

function appWithTestRoutes() {
  const extra = express.Router();
  extra.get('/test/admin-only', requireRole('admin'), (_req, res) => {
    res.json({ ok: true });
  });
  extra.post(
    '/test/form',
    validateBody(z.object({ email: z.email('validation.email_invalid') })),
    (req, res) => {
      res.json({ body: req.body });
    },
  );
  return createApp({ extraRoutes: extra });
}

const cookie = (token: string) => `${AUTH_COOKIE_NAME}=${token}`;

describe('health', () => {
  it('answers on /api/health', async () => {
    const res = await request(createApp()).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('reports a database that does not answer', async () => {
    vi.mocked(pool.query).mockRejectedValueOnce(new Error('ECONNREFUSED'));
    const res = await request(createApp()).get('/api/health/db');
    expect(res.status).toBe(503);
    expect(res.body.ok).toBe(false);
    expect(res.body.error.message).toBe('server.db_down');
  });

  it('reports a working database', async () => {
    vi.mocked(pool.query).mockResolvedValueOnce([[{ ok: 1 }], []] as never);
    const res = await request(createApp()).get('/api/health/db');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});

describe('unknown address', () => {
  it('returns 404 with a message key', async () => {
    const res = await request(createApp()).get('/api/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.error.message).toBe('server.not_found');
  });
});

describe('requireRole', () => {
  let app: express.Express;
  beforeAll(() => {
    app = appWithTestRoutes();
  });

  it('rejects a visitor without a cookie', async () => {
    const res = await request(app).get('/api/test/admin-only');
    expect(res.status).toBe(401);
    expect(res.body.error.message).toBe('server.login_required');
  });

  it('rejects a user with the wrong role', async () => {
    const token = signToken({ id: 2, name: 'Jan', role: 'user' });
    const res = await request(app).get('/api/test/admin-only').set('Cookie', cookie(token));
    expect(res.status).toBe(403);
    expect(res.body.error.message).toBe('server.no_access');
  });

  it('lets the right role in', async () => {
    const token = signToken({ id: 1, name: 'Anna', role: 'admin' });
    const res = await request(app).get('/api/test/admin-only').set('Cookie', cookie(token));
    expect(res.status).toBe(200);
  });

  it('treats a token signed with another secret as logged out', async () => {
    const token = jwt.sign({ id: 1, name: 'Anna', role: 'admin' }, 'another-secret');
    const res = await request(app).get('/api/test/admin-only').set('Cookie', cookie(token));
    expect(res.status).toBe(401);
  });

  it('treats a token with an unknown role as logged out', async () => {
    const token = jwt.sign({ id: 1, name: 'Anna', role: 'hacker' }, SECRET);
    const res = await request(app).get('/api/test/admin-only').set('Cookie', cookie(token));
    expect(res.status).toBe(401);
  });
});

describe('validateBody', () => {
  it('returns field keys for invalid data', async () => {
    const res = await request(appWithTestRoutes()).post('/api/test/form').send({ email: 'x' });
    expect(res.status).toBe(400);
    expect(res.body.error.message).toBe('server.invalid_data');
    expect(res.body.error.fields.email).toBe('validation.email_invalid');
  });

  it('passes parsed data on', async () => {
    const res = await request(appWithTestRoutes())
      .post('/api/test/form')
      .send({ email: 'anna@example.com', extra: 'dropped' });
    expect(res.status).toBe(200);
    expect(res.body.body).toEqual({ email: 'anna@example.com' });
  });
});

import { loadEnv } from 'vite';
import { handleSubmitFormRequest } from './submitForm.js';

function attachSubmitMiddleware(middlewares, getEnv) {
  middlewares.use('/api/submit-form', (req, res, next) => {
    const reqPath = (req.url || '/').split('?')[0];
    if (reqPath !== '/' && reqPath !== '') {
      return next();
    }
    handleSubmitFormRequest(req, res, { env: getEnv() }).catch((err) => {
      console.error('[Vite API Plugin Error]', err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ ok: false, error: 'Internal server error.' }));
      }
    });
  });
}

/**
 * Vite dev & preview plugin exposing `/api/submit-form` locally
 * so `npm run dev` and `npm run preview` run the exact same handler as Vercel (`/api/submit-form.js`).
 */
export function otoxFormApiPlugin() {
  let resolvedMode = 'development';
  let resolvedEnvDir = process.cwd();

  const getEnv = () => {
    const loaded = loadEnv(resolvedMode, resolvedEnvDir, '');
    return { ...loaded, ...process.env };
  };

  return {
    name: 'otox-form-api-plugin',
    configResolved(config) {
      resolvedMode = config.mode || 'development';
      resolvedEnvDir = config.envDir || process.cwd();
    },
    configureServer(server) {
      attachSubmitMiddleware(server.middlewares, getEnv);
    },
    configurePreviewServer(server) {
      attachSubmitMiddleware(server.middlewares, getEnv);
    }
  };
}

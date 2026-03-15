import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');
const app = express();
const angularApp = new AngularNodeAppEngine();
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    immutable: true,
  }),
);
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (response?.status === 302) {
        return res.redirect(301, '/ar');
      }
      return response ? writeResponseToNodeResponse(response, res) : next();
    })
    .catch(next);
});
app.use((req, res) => {
  console.log(`Redirecting unknown route: ${req.url} -> /ar`);
  res.redirect(301, '/ar');
});
app.get('/llms.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
});
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = Number(process.env['PORT']) || 4000;
  const host = process.env['HOST'] || '0.0.0.0';

  app.listen(port, host, () => {
    console.log(`
🚀 Angular SSR Server Started
────────────────────────────────
🧠 Node Version   : ${process.version}
⚙️  Environment   : ${process.env['NODE_ENV'] || 'undefined'}
📦 PM2 Mode       : ${process.env['exec_mode'] || 'standalone'}
🔢 PM2 Instance   : ${process.env['pm_id'] ?? 'N/A'}
📡 Listening On   : http://${host}:${port}
────────────────────────────────
    `);
  });
}
export const reqHandler = createNodeRequestHandler(app);

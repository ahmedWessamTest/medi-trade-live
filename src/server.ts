import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import compression from 'compression';
import helmet from 'helmet';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(compression());

app.use(helmet({
  contentSecurityPolicy: false, 
}));

/**
 * 3. تحسين خدمة الملفات الثابتة (Static Files)
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',      // كاش لمدة سنة للملفات اللي فيها hash
    index: false,
    redirect: false,
    immutable: true,   // يخبر المتصفح أن الملف لن يتغير أبداً
    etag: true,        
  }),
);


app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (response) {
        res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=1200'); 
        return writeResponseToNodeResponse(response, res);
      }
      return next();
    })
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = Number(process.env['PORT']) || 4000;
  app.listen(port,'127.0.0.1', () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
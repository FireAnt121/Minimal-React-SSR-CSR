import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';


async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  const ssrRoutes = ['/blog', '/new'];

  app.use(vite.middlewares);

  app.get(/(.*)/, async (req, res) => {
    try {
      let template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
      template = await vite.transformIndexHtml(req.originalUrl, template);

      if (ssrRoutes.includes(req.originalUrl)) {
        const { renderStream } = await vite.ssrLoadModule('/src/entry-server.tsx');
        renderStream(req, res);
      } else {
        console.log(req.originalUrl)
        const html = template.replace('<!--ssr-outlet-->', '');
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      }
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
  });
}

createServer();

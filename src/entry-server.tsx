import React from 'react';
import App from './App';
import { StaticRouter } from 'react-router-dom';
import { renderToPipeableStream } from 'react-dom/server';
import type { Request, Response } from 'express';
import { HelmetProvider } from 'react-helmet-async';

interface MetaTags {
  title?: string;
  description?: string;
  [key: string]: string | undefined;
}

export function renderStream(req: Request, res: Response, meta: MetaTags = {}) {
  const helmetContext: any = {}; // holds metadata

  const stream = renderToPipeableStream(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
    {
      onShellReady() {
        const { helmet } = helmetContext as any;
        console.log(helmet.title.toString())
        console.log(helmet.meta.toString())
        res.setHeader('Content-Type', 'text/html');
        res.write(`<!DOCTYPE html><html><head>`);
        res.write(helmet?.title?.toString() || '');
        res.write(helmet?.meta?.toString() || '');
        res.write(`</head><body><div id="root">`);
        stream.pipe(res);
      },
      onAllReady() {
        res.write(`</div></body></html>`);
        res.end();
      },
      onError(err) {
        console.error('SSR error:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }
  );
}

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import serveFavicon from 'serve-favicon';
import Iso from 'iso';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from '../shared/routes';
import alt from '../shared/alt';

import deviceController from './controllers/device';

const assetsPath = path.resolve(__dirname, '../assets');

const app = express();

app.set('env', process.env.NODE_ENV || 'development');
app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
//app.use(serveFavicon(`${assetsPath}/assets/favicon.png`));
app.use(express.static(assetsPath));

app.use('/', deviceController);

app.get('*', (req, res) => {
  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  var iso = new Iso();

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    const content = renderToString(<RoutingContext {...renderProps} />);
    iso.add(content, alt.flush());
    res.render('index', { content: iso.render() });
  });
});

app.use((err, req, res, next) => {
  console.log('Error on request %s %s', req.method, req.url);
  console.log(err);
  console.log(err.stack);
  res.status(500).send('Internal server error');
});

const server = app.listen(app.get('port'), () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Server is running at http://${host}:${port}`);
});

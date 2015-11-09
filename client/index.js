import React from 'react'
import { match, Router } from 'react-router'
import { render } from 'react-dom'
import { createHistory } from 'history'
import Iso from 'iso';
import alt from '../shared/alt';
import routes from '../shared/routes'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

window.onload = function(){
  Iso.bootstrap(function (state, meta, container) {
    alt.bootstrap(state);

    console.log('Flux store rehydrated');

    match({ routes, location }, () => {
      render(
        <Router routes={routes} history={createHistory()} />,
        document.getElementById('app')
      )
    });
  });
}

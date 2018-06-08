import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Page from './containers/Page'
import './style/main.css'

import store from './implementation/store'
import connectPage from './implementation/connect-page'

render(
  <Provider store={store}>{React.createElement(connectPage(Page))}</Provider>,
  document.getElementById('root')
)

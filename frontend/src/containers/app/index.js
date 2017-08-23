import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import LogoLink from '../../components/typography/LogoLink'
import Home from '../home'
import Notifications from './Notifications'
import LinkManagement from '../linkManagement'

const App = () => (
  <div>
    <LogoLink to="/">
      Link Shortener
    </LogoLink>
    <Notifications />
    <main>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/link/:managementHash" component={ LinkManagement } />
      </Switch>
    </main>
  </div>
)

export default App

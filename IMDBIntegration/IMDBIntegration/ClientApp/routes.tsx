import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { MyShowList } from './components/MyShowList';
import { AddShow } from './components/AddShow';
import { ShowInfo } from './components/ShowInfo';
import { Login } from './components/Login';

export const routes = <Layout>
    <Route exact path='/' component={MyShowList} />
    <Route path='/home' component={Home} />
    <Route path='/myshowlist' component={MyShowList} />
    <Route path='/addshow' component={AddShow} />
    <Route path='/showinfo/:showid' component={ShowInfo} />
    <Route path='/login' component={Login} />
</Layout>;
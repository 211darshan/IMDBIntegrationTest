import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { MyShowList } from './components/MyShowList';
import { AddShow } from './components/AddShow';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/myshowlist' component={MyShowList} />
    <Route path='/addshow' component={AddShow} />
</Layout>;
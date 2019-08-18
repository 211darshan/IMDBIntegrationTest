import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);

    }
    private handleLogout() {
        fetch('api/Account/Logout', {
            method: 'POST'

        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson == 1) {
                    //this.proppush("/login");
                    //this.history.pushState(null, 'login');
                    window.location.href = "Account/Login"


                }
            });
    }

    public render() {
        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>Show Tracker</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        {/*<li>
                            <NavLink to={'/'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>*/}
                        <li>
                            <NavLink to={'/myshowlist'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> My Show List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/addshow'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-plus'></span> Add Show
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'#'} activeClassName='active' onClick={(id) => this.handleLogout()}>
                                <span className='glyphicon glyphicon-log-out'></span> Logout
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}

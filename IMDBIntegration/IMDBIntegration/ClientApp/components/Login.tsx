import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';


export class Login extends React.Component<RouteComponentProps<{}>, {}> {
    constructor() {
        super();
        alert("dd");
        fetch('api/Account/Logout', {
            method: 'POST'

        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson == 1) {
                    //this.proppush("/login");
                    //this.history.pushState(null, 'login');
                    window.location.href= "Account/Login"


                }
            });
        this.handleLogin = this.handleLogin.bind(this);

    }

    private handleLogin(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('api/Account/Login', {
            method: 'POST',
            body: data,

        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson == 1) {
                    this.props.history.push("/myshowlist");
                }
                else {
                    alert("Login failed.");
                }
            })

    }

    public render() {
        let contents = this.renderMyShowTable();

        return <div>
            <h1>My Shows</h1>
            <p>My Shows.</p>
            <p>
                <Link to="">Add New</Link>
            </p>
            {contents}
        </div>;
    }

    // Returns the HTML table to the render() method.
    private renderMyShowTable() {
        return <form onSubmit={this.handleLogin} >
            < div className="form-group row" >
                <label className=" control-label col-md-12" htmlFor="Name">Username</label>
                <div className="col-md-4">
                    <input className="form-control" type="text" name="name" required />
                </div>
            </div >
            < div className="form-group row" >
                <label className=" control-label col-md-12" htmlFor="Name">Password</label>
                <div className="col-md-4">
                    <input className="form-control" type="text" name="name" required />
                </div>
            </div >
            <div className="form-group">
                <button type="submit" className="btn btn-default">Submit</button>
            </div >
        </form>
            ;
    }

} 
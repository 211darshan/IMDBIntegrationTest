import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface ShowListDataState {
    showList: Show[];
    loading: boolean;
}

export class MyShowList extends React.Component<RouteComponentProps<{}>, ShowListDataState> {
    constructor() {
        super();
        this.state = { showList: [], loading: true };

        fetch('api/IMDBShow/GetMyShows')
            .then(this.handleErrors)
            .then(response => response.json() as Promise<Show[]>)
            .then(data => {
                this.setState({ showList: data, loading: false });
            });
        this.handleInfo = this.handleInfo.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    private handleErrors(response) {
        console.log(response);
        if (response.redirected) {
            window.location.href="Account/Login"
        }
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }


    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMyShowTable(this.state.showList);

        return <div>
            <h1>My Shows</h1>
            <p>
                <Link to="/addshow">Add New Show</Link>
            </p>
            {contents}
        </div>;
    }

    private handleInfo(id: string) {
        this.props.history.push("/showinfo/" + id);
    }

    private handleRemove(id: string) {
        if (!confirm("Do you want to delete show?"))
            return;
        else {
            fetch('api/IMDBShow/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        showList: this.state.showList.filter((rec) => {
                            return (rec.showId != id);
                        })
                    });
            });
        }
    }
    // Returns the HTML table to the render() method.
    private renderMyShowTable(showList: Show[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Show Id</th>
                    <th>Show Title</th>
                    <th>Next Episode Id</th>
                    <th>Next Episode Title(Season)</th>
                </tr>
            </thead>
            <tbody>
                {showList.map(shw =>
                    <tr key={shw.showId}>
                        <td></td>
                        <td>{shw.showId}</td>
                        <td>{shw.showTitle}</td>
                        <td>{shw.nextEpisodeId}</td>
                        <td>{shw.nextEpisodeTitle}(Season: {shw.season})</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleInfo(shw.nextEpisodeId)}>Watch Episode</a>  |
                            <a className="action" onClick={(id) => this.handleRemove(shw.showId)}>Remove</a>
                        </td>

                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class Show {
    showId: string = "";
    showTitle: string = "";
    nextEpisodeId: string = "";
    nextEpisodeTitle: string = "";
    season: string = "";
} 
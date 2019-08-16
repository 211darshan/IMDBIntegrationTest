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
            .then(response => response.json() as Promise<Show[]>)
            .then(data => {
                this.setState({ showList: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMyShowTable(this.state.showList);

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
    private renderMyShowTable(empList: Show[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Show Id</th>
                    <th>Show Name</th>
                    <th>Next Episode Id</th>                    
                </tr>
            </thead>
            <tbody>
                {empList.map(emp =>
                    <tr key={emp.showId}>
                        <td></td>
                        <td>{emp.showId}</td>
                        <td>{emp.showName}</td>
                        <td>{emp.nextEpisodeId}</td>                       
                        
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class Show {
    showId: number = 0;
    showName: string = "";
    nextEpisodeId: string = "";
} 
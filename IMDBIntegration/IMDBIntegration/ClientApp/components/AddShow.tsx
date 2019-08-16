import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface ShowListDataState {
    showList: IMDBEntity[];
    loading: boolean;
}

export class AddShow extends React.Component<RouteComponentProps<{}>, ShowListDataState> {
    constructor() {
        super();
        this.state = { showList: [], loading: false };

        //fetch('api/IMDBShow/GetMyShows')
        //    .then(response => response.json() as Promise<Show[]>)
        //    .then(data => {
        //        this.setState({ showList: data, loading: false });
        //    });

        this.handleSearch = this.handleSearch.bind(this);
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

    private handleSearch(e) {
        e.preventDefault();
        this.state = { showList: [], loading: false };


        fetch('https://www.omdbapi.com/?s=' + 'suits' + '&apikey=' + 'cca62f46')
            .then(response => response.json()
                .then(x => x.Search) as Promise<IMDBEntity[]>)
            .then(data => {
                this.setState({ showList: data, loading: false });
            });
    }

    // Returns the HTML table to the render() method.
    private renderMyShowTable(showList: IMDBEntity[]) {
        console.log(showList);
        return showList.length > 0 ?
            <div id="movies">
                {showList.map(shw =>
                    <article key={shw.imdbID}><div className="col-md-4">
                        <div className="well text-center">
                            <div className="alert alert-danger" id="{shw.imdbID}notInCollection"><p><i className="fa fa-exclamation-triangle"></i> Not in Collection</p></div>
                            <figure><img src={shw.Poster} alt={shw.Title} /></figure>
                            <h5 className="whiteheader">{shw.Title} ({shw.Year.substring(0, 4)})</h5>
                            <div className="btn-group">
                                <a className="btn btn-primary btn-rounded" href="#"><i className="fa fa-info-circle"></i> {shw.Type} Details</a>
                            </div>
                        </div>
                    </div></article>
                )}
            </div>
            : <div className="input-group">
                <input type="text" className="form-control" id="searchText" placeholder="Search for any movie or series and press enter..."
                    required />
                <span className="input-group-btn"><input type="submit" id="searchbutton" className="btn btn-primary" value="Go" onClick={this.handleSearch} /></span>
            </div>;
    }
}

export class IMDBEntity {
    imdbID: string = "";
    Poster: string = "";
    Title: string = "";
    Type: string = "";
    Year: string = "";
} 
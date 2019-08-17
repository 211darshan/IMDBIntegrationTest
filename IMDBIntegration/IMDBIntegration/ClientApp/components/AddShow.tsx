import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Show } from './MyShowList';

interface ShowListDataState {
    showList: IMDBEntity[];
    loading: boolean;
    myShows: Show[];
}

export class AddShow extends React.Component<RouteComponentProps<{}>, ShowListDataState> {
    constructor() {
        super();
        this.state = { showList: [], loading: false, myShows: [] };

       
        this.setMyShows();

        this.handleSearch = this.handleSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleInfo = this.handleInfo.bind(this);
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
        //this.state = { showList: [], loading: false, myShows: [] };


        fetch('https://www.omdbapi.com/?s=' + 'suits' + '&apikey=' + 'cca62f46')
            .then(response => response.json()
                .then(x => x.Search) as Promise<IMDBEntity[]>)
            .then(data => {
                this.setState({ showList: data, loading: false });
            });
    }

    private handleAdd(id: string) {
        if (this.state.myShows.some(item => id === item.showId)) {
            alert("Already Added to My Shows");
        }
        else {
            fetch('api/IMDBShow/AddShow', {
                method: 'POST',
                body: JSON.stringify({
                    ShowId: id
                }),
                headers: { "Content-Type": "application/json" }

            }).then((response) => response.json())
            .then((responseJson) => {
                //this.props.history.push("/fetchemployee");
                if (responseJson == 1)
                {
                    this.setMyShows();
                    alert("Show added to My Show List.");                    
                }
                else if (responseJson==2)
                {
                    alert("Episodes does not exists for this show")
                }
                else if (responseJson == 3) {
                    alert("Already Added to My Shows.")
                }
            });
        }
    }

    private handleInfo(id: string) {
        this.props.history.push("/showinfo/"+id);    }

    private setMyShows()
    {
        fetch('api/IMDBShow/GetMyShows')
            .then(response => response.json() as Promise<Show[]>)
            .then(data => {
                this.setState({ myShows: data });
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
                        <div className="alert alert-danger" onClick={(id) => this.handleAdd(shw.imdbID)} id="{shw.imdbID}notInCollection"><p><i className="fa fa-exclamation-triangle"></i> Add to My Show List</p></div>
                        <figure><img src={shw.Poster} alt={shw.Title} /></figure>
                        <h5 className="whiteheader">{shw.Title} ({shw.Year.substring(0, 4)})</h5>
                        <div className="btn-group">
                            <button className="btn btn-primary btn-rounded" onClick={(id) => this.handleInfo(shw.imdbID)}><i className="fa fa-info-circle"></i> {shw.Type} Details</button>
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
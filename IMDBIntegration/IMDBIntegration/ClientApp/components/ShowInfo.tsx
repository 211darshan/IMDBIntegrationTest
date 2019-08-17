import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Show } from './MyShowList';

interface ShowListDataState {
    showData: IMDBEntity;
    loading: boolean;
}

export class ShowInfo extends React.Component<RouteComponentProps<{}>, ShowListDataState> {
    constructor(props) {
        super(props);
        this.state = { showData: new IMDBEntity, loading: true };
        //console.log(this.props);
        var showid = this.props.match.params["showid"];

        fetch('api/IMDBShow/Details/' + showid)
            .then(response => response.json() as Promise<IMDBEntity>)
            .then(data => {
                this.setState({ showData: data, loading: false });
            });
        this.handleWatched = this.handleWatched.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    public render() {
        //let contents = this.renderMyShowTable(this.state.showData);
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMyShowTable(this.state.showData);
        return <div>
            <h1>My Shows</h1>
            <p>My Shows.</p>
            <p>
                <Link to="">Add New</Link>
            </p>
            {contents}
        </div>;
    }

    private handleWatched(id: string, seriesId: string, season: string) {
        alert("Hi");
            fetch('api/IMDBShow/MarkWatched', {
                method: 'POST',
                body: JSON.stringify({
                    ShowId: id,
                    SeriesId: seriesId,
                    Season: season
                }),
                headers: { "Content-Type": "application/json" }

            }).then((response) => response.json())
                .then((responseJson) => {
                    //this.props.history.push("/fetchemployee");
                    if (responseJson == 1) {
                        alert("Show added to My Show List.");
                    }
                    else if (responseJson == 2) {
                        alert("Episodes does not exists for this show")
                    }
                    else if (responseJson == 3) {
                        alert("Already Added to My Shows.")
                    }
                });
        
    }

    private handleAdd(id: string) {
            fetch('api/IMDBShow/AddShow', {
                method: 'POST',
                body: JSON.stringify({
                    ShowId: id
                }),
                headers: { "Content-Type": "application/json" }

            }).then((response) => response.json())
                .then((responseJson) => {
                    //this.props.history.push("/fetchemployee");
                    if (responseJson == 1) {
                        alert("Show added to My Show List.");
                    }
                    else if (responseJson == 2) {
                        alert("Episodes does not exists for this show")
                    }
                    else if (responseJson == 3) {
                        alert("Already Added to My Shows.")
                    }
                });
    }

    // Returns the HTML table to the render() method.
    private renderMyShowTable(showData: IMDBEntity) {
        return (
            <div id="movie">
                <article>
                    <div className="row">
                        <h2 className="text-center" id="movietitle">{showData.title} ({showData.year.substring(0, 4)})</h2>

                        <div className="col-md-4" id="poster">
                            <figure>
                                <img src={showData.poster} className="img-thumbnail img-rounded" id="movieposter" alt={showData.title} />
                            </figure>
                        </div>
                        <div className="col-md-8">
                            <ul className="list-group">
                                <li className="list-group-item"><strong><i className="fa fa-file"></i> Genre:</strong> {showData.genre}</li>
                                <li className="list-group-item"><strong><i className="fa fa-calendar"></i> Released:</strong> {showData.released}</li>
                                <li className="list-group-item"><strong><i className="fa fa-clock-o"></i> Runtime:</strong> {showData.runtime}</li>
                                <li className="list-group-item"><strong><i className="fa fa-star"></i> Rated:</strong> {showData.rated}</li>
                                <li className="list-group-item"><strong><i className="fa fa-star"></i> IMDB Rating:</strong> {showData.imdbRating}</li>
                                <li className="list-group-item"><strong><i className="fa fa-imdb"></i> IMDB ID:</strong> {showData.imdbID}</li>
                                <li className="list-group-item"><strong><i className="fa fa-video-camera"></i> Director:</strong> {showData.director}</li>
                                <li className="list-group-item"><strong><i className="fa fa-pencil"></i> Writer:</strong> {showData.writer}</li>
                                <li className="list-group-item"><strong><i className="fa fa-users"></i> Actors:</strong> {showData.actors}</li>
                                <li className="list-group-item"><strong><i className="fa fa-globe"></i> Language:</strong> {showData.language}</li>
                                <li className="list-group-item"><strong><i className="fa fa-television"></i> Total Seasons:</strong> {showData.totalSeasons}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="well" id="rowplot">
                        <h3>Plot</h3>
                        <p>{showData.plot}</p>
                    </div>
                </article>
                <hr />
                <a href={'//www.imdb.com/title/' + showData.imdbID} target="_blank" className="btn btn-space btn-warning" data-toggle="tooltip" title="See details on IMDB Website"><i className="fa fa-globe"></i> View on IMDB</a>
                <button onClick={showData.type == 'episode' ? (id) => this.handleWatched(showData.imdbID, showData.seriesID, showData.season) : (id) => this.handleAdd(showData.imdbID)} className={'btn btn-rounded btn-space ' + (showData.type == 'episode' ? 'btn-success' : 'btn-danger')} data-toggle="tooltip"><i className="fa fa-cloud-download"></i> {showData.type == 'episode' ? 'Mark as watched' : 'Add to My Show List'}</button>
            </div>
        )

    }

}

export class IMDBEntity {
    imdbID: string = "";
    poster: string = "";
    title: string = "";
    type: string = "";
    year: string = "";
    genre: string = "";
    rated: string = "";
    released: string = "";
    runtime: string = "";
    imdbRating: string = "";
    director: string = "";
    writer: string = "";
    actors: string = "";
    language: string = "";
    totalSeasons: string = "";
    plot: string = "";
    seriesID: string = "";
    season: string= "";
} 
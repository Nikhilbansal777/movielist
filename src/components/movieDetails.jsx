import axios from 'axios';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { context } from '../App';
import '../styles/movieDetail.css';
const MovieDetails = () => {
    const { formatDate } = useContext(context);
    const movieDetail = useLoaderData();

    const stars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<i key={i} className="fa fa-star"></i>);
        }
        return stars;
    };
    return (
        <div id="content_hero" className="center-content hero-ontop">
            <div className="container">
                <div className="row blurb scrollme animateme" data-when="exit" data-from="0" data-to="1">
                    <div className="col-md-9">
                        <span className="title">{movieDetail?.category},</span>
                        <span className="title">{formatDate(movieDetail?.releaseDate)}</span>
                        <h1>{movieDetail.movieName}</h1>
                        <p>{movieDetail.description}</p>
                        <span className="director"> Directed By : {movieDetail?.director}</span>
                        <br />
                        <div className="buttons">
                            <div className="star-rating">
                                {stars(movieDetail.rating)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;

export const getMovieDetail = async ({ params }) => {
    const { id } = params;
    const res = await axios.get(`http://localhost:5000/api/getMovieDetail/${id}`);
    console.log(res.data);
    return res.data;
};
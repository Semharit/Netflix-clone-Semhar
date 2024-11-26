import React, { useEffect, useState } from 'react';
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);

        setMovie(
          ////sets a random movie from an array of results retrieved from an API request
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []); //// Empty dependency array ensures this runs only once when the component mounts

  function truncate(str, n) {////truncate limites our specified length and append ellipses as requestd
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        ////Template literals. This embeds the result of the expression into a string.
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`, ////we use the optional chaininig operator to check if the movie exist and avoid throwing error.
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button play">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </div>
  );
};

export default Banner;

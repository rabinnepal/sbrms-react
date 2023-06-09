import React, { useCallback, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { Navigation } from "swiper";
import axios from "axios";
import { APIClass } from "../../../APICaller/APICaller";
import { useNavigate } from "react-router-dom";
import RatingDisplay from "../../global/RatingDisplay";

const TopMovies = () => {
  const [movies, setMovies] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const navigate = useNavigate();

  console.log(movies, "movies");

  const api = new APIClass();
  const token = `Bearer ${localStorage.getItem("token")}`;

  // // display  top movies
  const getMovies = useCallback(async (e) => {
    const configToken = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${api.baseURL}user/get-toprated-movies/`,
      configToken
    );
    setMovies(res.data.movies);
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const ratings = movies.map((movie) => movie.totalRating / movie.score.length);
  // const ratings = movies.map((movie) => {
  //   const totalRating = movie.score.reduce(
  //     (sum, score) => sum + parseInt(score.rating),
  //     0
  //   );
  //   const averageRating = totalRating / movie.score.length;
  //   return averageRating;
  // });

  return (
    <div>
      <Container>
        <Typography sx={{ ml: 2, fontWeight: 600, fontSize: 20 }}>
          Top Movies
        </Typography>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={60}
          slidesPerView={4}
          scrollbar={{ draggable: false }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 60,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 80,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 60,
            },
          }}
        >
          {movies.slice(0, 10)?.map((movie, index) => {
            return (
              <SwiperSlide key={index}>
                {() => {
                  if (movie?.score.length !== 0 || movie?.score[0].rating >= 4)
                    return (
                      <Box sx={{ p: 2, borderRadius: 20 }}>
                        <Card
                          onClick={(e) =>
                            navigate(`/rating/${movie.movie_id._id}`)
                          }
                        >
                          <CardMedia
                            image={movie?.movie_id?.image}
                            alt={movie?.movie_id?.movie_title}
                            style={{ height: 200 }}
                          />

                          <CardContent
                            sx={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <Typography sx={{ fontSize: 18, color: "blue" }}>
                              {movie?.movie_id?.movie_title}
                            </Typography>
                            <Box>
                              <RatingDisplay
                                rating={ratings[index]}
                                movie={movie}
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    );
                  else {
                    return <div style={{ display: "hidden" }}></div>;
                  }
                }}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </div>
  );
};

export default TopMovies;

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

const NewReleased = () => {
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState([]);
  const navigate = useNavigate();

  const api = new APIClass();
  const token = `Bearer ${localStorage.getItem("token")}`;

  // // display  movies
  const getMovies = useCallback(async (e) => {
    const configToken = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${api.baseURL}user/get-newlyreleased-movies/`,
      configToken
    );
    setMovies(res.data.movies);
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div>
      <Container>
        <Typography sx={{ ml: 2, fontWeight: 600, fontSize: 20 }}>
          Newly Released Movies
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
          {movies
            .slice(0, 10)
            .reverse()
            ?.map((movie, index) => {
              // console.log(movie);
              return (
                <SwiperSlide key={index}>
                  <Box sx={{ p: 2, borderRadius: 20, width: 240 }}>
                    <Card onClick={(e) => navigate(`/rating/${movie._id}`)}>
                      <CardMedia
                        image={movie.image}
                        alt={movie.movie_title}
                        style={{ height: 200 }}
                        onClick={(e) => navigate(`/rating/${movie._id}`)}
                      />

                      <CardContent>
                        <Typography sx={{ fontSize: 18, color: "blue" }}>
                          {movie.movie_title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </Container>
    </div>
  );
};

export default NewReleased;

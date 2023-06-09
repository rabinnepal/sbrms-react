import {
  Box,
  Button,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { APIClass } from "../../../APICaller/APICaller";
import axios from "axios";

const FeedbackSubmission = () => {
  // const api = new APIClass();

  // // add banner

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   let formData = {
  //     comment: data.get("comment"),
  //     rating: data.get("rating"),
  //     // movie_id: data.get("category"),
  //   };
  //   let config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   };

  //   await axios
  //     .post(`${api.baseURL}user/add-comments/`, formData, config)
  //     .then((res) => {
  //       if (res.data.success === true) {
  //         console.log(res.data);
  //         window.alert("Added Successfully!!");
  //         e.target.reset();
  //       } else {
  //         console.log(res.data);
  //         window.alert("Task failed!!");
  //         e.target.reset();
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", pt: 3, fontWeight: 600 }}
      >
        Sentiment Based Movie Rating System
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#7987FF", fontWeight: "bold", fontSize: 26 }}
        >
          Aquaman 2
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, fontSize: 18, mb: 2, p: 1 }}
        >
          Aquaman forges an uneasy alliance with an unlikely ally to save
          Atlantis and the rest of the planet.
        </Typography>
        <img
          src="https://picsum.photos/200/300"
          alt="image"
          height={400}
          width={200}
        />
        <Box sx={{ my: 4, display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
            Submitted!
          </Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
            Thank you for your comment
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Edit your comment</Button>
          <Button variant="contained">Close</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default FeedbackSubmission;

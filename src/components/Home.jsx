import React, { useState, useEffect } from "react";
import Token from "./Config";
//import CardBusiness from "./CardBusiness";
import SearchResults from "./SearchResults";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
//import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { SettingsRemote } from "@mui/icons-material";

const Home = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [businesses, setBusinesses] = useState([]);
  const [term, setTerm] = useState();
  const [location, setLocation] = useState();

  const categories = "restaurants";
  //const location = "NYC";
  //const term = "";

  const url = `https://yelp-cors.herokuapp.com/api.yelp.com/v3/businesses/search?term=${term}&location=${location}&categories=${categories}`;
  const fetchRestaurants = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${Token}`,
          Origin: "localhost",
          withCredentials: true,
        },
      });
      const jsonResponse = await response.json();
      setBusinesses(jsonResponse.businesses);
      console.log(businesses);
    } catch {
      console.log(Error);
    }
  };
  useEffect(() => {
    fetchRestaurants();
  }, [term, location]);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2} sx={{ border: 0 }}>
          <Item sx={{ border: 0, boxShadow: 0 }}>
            <img src="logo1.png" alt="logo" />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item sx={{ border: 0, boxShadow: 0, marginTop: 5 }}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 600,
                margin: "0 auto"
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Restaurant"
                inputProps={{ "aria-label": "search Restaurant" }}
                onChange={(e) => setTerm(e.target.value)}
                value={term}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="address, city or zip code"
                inputProps={{ "aria-label": "search address,city or zip code" }}
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                type="submit"
                sx={{ p: "10px", backgroundColor: "red" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Item>
        </Grid>
      </Grid>
      <div>
        <SearchResults businesses={businesses} />
      </div>
    </div>
  );
};

export default Home;

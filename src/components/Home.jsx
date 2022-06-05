import React, { useState, useEffect } from "react";
import Token from "./Config";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const Home = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2} sx={{border:0}}>
          <Item sx={{ border: 0, boxShadow: 0 }}><img src="logo1.png" alt="logo" /></Item>
        </Grid>
        <Grid item xs={8}>
          <Item sx={{ border: 0, boxShadow: 0 ,marginTop:5}}><Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 600,
          margin: "0 auto",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Restaurant"
          inputProps={{ "aria-label": "search Restaurant" }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="address, city or zip code"
          inputProps={{ "aria-label": "search address,city or zip code" }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="submit"
          sx={{ p: "10px", backgroundColor: "red" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper></Item>
        </Grid>
      </Grid>
      
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import Token from "./Config";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";



const darkTheme = createTheme({
  palette: {
    //mode: "dark",
  },
});

const Business = () => {
  const Image =
    "https://s3-media3.fl.yelpcdn.com/bphoto/54oS76ZQyrhtkwmbbGpadg/o.jpg";

  const styles = {
    paperContainer: {
      backgroundImage: `url(${Image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [businessInfo, setBusinessInfo] = useState({});
  const [rate, setRate] = useState(0);
  const [hours, setHours] = useState([]);
  const [price, setPrice] = useState([]);
  const [displayAddress, setDisplayAddress] = useState([]);
  const [position, setPosition] = useState([0, 0]);
  const daysMap = {
    0: "Mon",
    1: "Tue",
    2: "Wed",
    3: "Thu",
    4: "Fri",
    5: "Sat",
    6: "Sun",
  };

  const getTime = (t) => t.substring(0, 2) + ":" + t.substring(2, 4);
  const id = "vu6PlPyKptsT6oEq50qOzA";
  const url = `https://yelp-cors.herokuapp.com/api.yelp.com/v3/businesses/${id}`;
  const fetchRestaurants = async () => {
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${Token}`, Origin: "example.com" },
      });
      const jsonResponse = await response.json();
      setBusinessInfo(jsonResponse);
      setHours(jsonResponse.hours);
      setRate(jsonResponse.rating);
      setPrice(jsonResponse.price);
      setPosition([
        jsonResponse.coordinates.latitude,
        jsonResponse.coordinates.longitude,
      ]);
      setDisplayAddress(jsonResponse.location.display_address);
    } catch {
      console.log(Error);
    }
  };
  useEffect(() => {
    fetchRestaurants();
  }, []);

  //   const fetchRestaurants = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://gist.githubusercontent.com/devguyio/69427d4b7111b3929c51880c66729f6f/raw/58329bca195e0800ab0a397f4f21cba4fea34e92/yelpbusiness.json"
  //       );
  //       const jsonResponse = await response.json();
  //       //console.log(jsonResponse);
  //       setBusinessInfo(jsonResponse);
  //       setHours(jsonResponse.hours);
  //       setRate(jsonResponse.rating);
  //       setPrice(jsonResponse.price);
  //       setPosition([
  //         jsonResponse.coordinates.latitude,
  //         jsonResponse.coordinates.longitude,
  //       ]);
  //       setDisplayAddress(jsonResponse.location.display_address)
  //     } catch {
  //       console.log(Error);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchRestaurants();
  //   }, []);

  const getpriceRange = (price) => {
    let content = [];
    for (let p of price) {
      content.push(
        <AttachMoneyIcon
          key={price.indexOf(p)}
          sx={{ color: "#fff", fontSize: 25 }}
        />
      );
    }
    return content;
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ width: 1, height: "50%" }}>
        <Paper elevation={0} sx={{ height: 500 }} style={styles.paperContainer}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: 30,
            }}
          >
            <Box sx={{ typography: "title" }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{ color: "#fff", mt: 25, fontWeight: "bold" }}
              >
                {businessInfo.name}
              </Typography>
            </Box>

            <Box>
              <Rating name="read-only" value={rate} readOnly />
              <Typography
                sx={{
                  color: "#fff",
                  marginLeft: 5,
                  fontSize: 25,
                  display: "inline",
                }}
              >
                {businessInfo.review_count}
              </Typography>
            </Box>
            <div>{getpriceRange(price)}</div>
          </Box>
          <Box>
            {" "}
            <Typography
              variant="h4"
              component="h4"
              sx={{
                mt: 25,
                fontWeight: "bold",
                marginLeft: 10,
                marginBottom: 5,
              }}
            >
              Location & opening hours
            </Typography>
          </Box>
          <Divider />
          <Grid
            container
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ marginBottom: 20 }}
          >
            <Grid item xs={6} sx={{ border: 0, boxShadow: 0 }}>
              <Item sx={{ border: 0, boxShadow: 0 }}>
                {" "}
                <TableContainer
                  component={Paper}
                  sx={{ border: 0, boxShadow: 0 }}
                >
                  <Table
                    sx={{ maxWidth: 500, marginLeft: 10 }}
                    aria-label="simple table"
                  >
                    <TableBody>
                      {hours.flatMap((h) =>
                        h.open.map((o) => (
                          <TableRow
                            key={o.day}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ border: 0 }}
                            >
                              {daysMap[o.day]}
                            </TableCell>
                            <TableCell align="right">
                              {getTime(o.start)}
                            </TableCell>
                            <TableCell align="right"> - </TableCell>
                            <TableCell align="right">
                              {getTime(o.end)}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item sx={{ border: 0, boxShadow: 0 }}>
                {" "}
                <MapContainer
                  center={position}
                  zoom={13}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      {displayAddress}. <br />
                    </Popup>
                  </Marker>
                </MapContainer>
              </Item>
            </Grid>
          </Grid>
          <Box>
            {" "}
            <Typography
              sx={{
                mt: 25,
                marginLeft: 10,
                marginBottom: 5,
              }}
            >
              copyright@let's Eat 2022
            </Typography>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Business;

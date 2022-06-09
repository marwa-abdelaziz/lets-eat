import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CardBusiness from "./CardBusiness";
import { styled } from "@mui/material/styles";
import { shadows } from '@mui/system';
//import { PropaneSharp } from "@mui/icons-material";

const SearchResults = (props) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  if (!props.businesses || !props.businesses.length) {
    return <div> </div>;
  }

  const searchResults = props.businesses.map((b) => (
    <Item key={b.id}>
      <CardBusiness business={b} />
    </Item>
  ));

  return (
    <Box sx={{ width: "100%",  boxShadow: 0 , marginTop: 10 }} elevation={0} style={{boxShadow:"none"}}>
      <Stack spacing={2}  elevation={0} sx={{  boxShadow: 0}} style={{boxShadow:"none"}} shadows = {0}>
         {searchResults}
        
      </Stack>
    </Box>
  );
};
export default SearchResults;

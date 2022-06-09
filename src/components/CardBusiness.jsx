import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Rating from "@mui/material/Rating";
import Business from './Business';
import { Link } from 'react-router-dom';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function CardBusiness({business}) {
    // const getId = (id)=>{ <Link to={`/view/${id}`}/>}
  return (

    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          
      }}
   
    //   onClick ={()=>getId(business.id)}
    >
      <Grid container spacing={2} >
        <Grid item>
          <ButtonBase sx={{ width: 150, height: 128 }}>
            <Img alt="complex" src={business.image_url}/>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              <Link to={`/view/${business.id}`} style={{textDecoration:"none" , color:"black" ,fontWeight:700,fontSize:20 }}>
                {business.name}
                </Link>
              </Typography>
              <Typography variant="body2" gutterBottom>
              <Rating name="read-only" value={business.rating} readOnly />
              {business.review_count}
                
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {business.term}
                ID: 1030114
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
const FirstHomeScreenCard = ({Icon, name, desc}) => {
    // const IconComponent = Icons[Icon];
  return (
    <Card sx={{ width:400,  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <CardActionArea>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {Icon}
        </div>
        <CardContent sx={{ color: 'white', backgroundColor: 'red', textAlign: 'center' , padding:"3px"}}>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default FirstHomeScreenCard
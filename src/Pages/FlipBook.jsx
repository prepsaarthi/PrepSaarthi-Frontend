import React from 'react'
import './flipbook.css'
import { Box, Typography } from '@mui/material'
const FlipBook = () => {
  return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', p:'1vmax', position:'relative'}}>

   <div class="book">
	<div class="book__pg-shadow"></div>
	<div class="book__pg"></div>
	<div class="book__pg book__pg--2"></div>
	<div class="book__pg book__pg--3"></div>
	<div class="book__pg book__pg--4"></div>
	<div class="book__pg book__pg--5"></div>
</div>
<Typography component='h2' variant="p" sx={{color:'grey', mb:'2vmax', textAlign:'center ', mt:'2vmax'}}>
                    Our products are coming soon!
                  </Typography>
    </Box>
  )
}

export default FlipBook
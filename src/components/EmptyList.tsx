import React from 'react'
import { ErrorOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { display } from '@mui/system';
import Box from '@mui/material/Box';

function EmptyList() {
	return (
		<Box style={{display:'block', justifyContent:'center'}}>
			<ErrorOutline sx={{fontSize:200, color:"gray", marginLeft:"20%", marginBottom:"5%"}} />
			<Typography sx={{fontFamily:"sans-serif", fontSize:"1.5rem", fontWeight:"700", color:"gray"}}>
				No entries found for this date...
			</Typography>
		</Box>
	)
}

export default EmptyList
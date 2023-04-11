import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import React, {useState, useEffect} from 'react';
import Constants from '../utils/Constants';
import { useAppSelector, useAppDispatch } from '../hooks'
import { updatePostFull } from './postSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
	height:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
	borderRadius:10,
};

interface IPosts {
  postId: string;
  title: string;
  content: string;
  timeSpent:number;
  date: any;
};


function UpdatePost(props: {postProp:IPosts}) {
	const dispatch = useAppDispatch();
	const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
	const [client, setClient] = useState<string>(props.postProp.title);
  const [note, setNote] = useState<string>(props.postProp.content);

	const updatePostFunc = (post:IPosts) => {
		const url = Constants.API_URL_UPDATE_POST;

    fetch(url, {
      method: 'PUT',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      dispatch(updatePostFull({id:props.postProp.postId, client:client, note:note, time:props.postProp.timeSpent, date: props.postProp.date}))
    })
    .catch((error) => {
      console.log(error);
      alert(`CHANGES NOT SAVED`);
    });
	}

	const updatePostClient = () => {
		updatePostFunc({postId:props.postProp.postId, title:client, content:note, timeSpent:props.postProp.timeSpent, date: props.postProp.date})
		
		handleClose()
  }

	return (
		<div>
      <Button sx={{color:"#6b9080"}} onClick={handleOpen}>Update</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Entry
          </Typography>
          <Typography component={'span'} id="modal-modal-description" sx={{ mt: 2 }}>
					<div style={{marginLeft:"23vh"}}>
						<Box
						component="form"
						sx={{
							'& > :not(style)': { m: 1, width: '25ch', marginTop: "5vh", marginBottom: "5vh"},
						}}
						noValidate
						autoComplete="off">
						<TextField id="client" label="Client" variant="outlined"
						value={client}
						onChange={(event) => {
							setClient(event.target.value);
						}} />
						<TextField id="note" label="Notes" variant="outlined"
						value={note} 
						onChange={(event) => {
							setNote(event.target.value);
						}}/>
						<Button onClick={updatePostClient} sx={{height:"5.8vh"}} variant='contained' >Update Post</Button>
					</Box>
    		</div>
          </Typography>
        </Box>
      </Modal>
    </div>
	)
}

export default UpdatePost
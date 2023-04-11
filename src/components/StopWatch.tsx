import React, {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../hooks'
import { updatePost } from './postSlice';
import Constants from '../utils/Constants';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';

interface IPosts {
  postId: string;
  title: string;
  content: string;
  timeSpent:number;
	date: any;
};

function StopWatch(props: {stopWatchProp:IPosts}) {
  let initTime = 0;
  if(props.stopWatchProp.timeSpent !== 0){
    initTime = props.stopWatchProp.timeSpent;
  }
	const dispatch = useAppDispatch();
	const [time, setTime] = useState(initTime);
  const [running, setRunning] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [manualTimeUpdate, setManualTimeUpdate] = React.useState<Dayjs | null>(dayjs('2022-04-07'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

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
    })
    .catch((error) => {
      console.log(error);
      alert('SERVER ERROR: TIME NOT SAVED ( TRY SAVING TIME AFTER SERVER CONNECTION IS RESTORED )');
    });
	}
	
  const handleManualTimeUpdate = (formatedTime: string) => {
    let hms = formatedTime;
    var a = hms.split(':');
    var seconds = (+parseInt(a[0])) * 60 * 60 + (+parseInt(a[1])) * 60 + (+parseInt(a[2])); 
    console.log("formated",seconds*1000)
    dispatch(updatePost({id: props.stopWatchProp.postId, time: seconds*1000 }))
    updatePostFunc({postId:props.stopWatchProp.postId, title:props.stopWatchProp.title, content:props.stopWatchProp.content, timeSpent:seconds*1000, date: props.stopWatchProp.date})
    setTime(seconds*1000)
  }

	return (
		<div className="stopwatch">
      <div style={{marginTop:'1%', marginRight:'22%'}} key={props.stopWatchProp.postId} className="numbers">
        <div style={{ width: '100%'}}>
        <Box
          component="div"
          sx={{
            display: 'inline',
            p: 1,
            m: 1,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
            color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
            borderRadius: 3,
            fontSize: '1.5rem',
            fontWeight: '700',
            marginLeft: '30%',
          }}
        >
          {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
          
        </Box>
    </div>
      </div>
      <div style={{marginTop:'3%'}} className="buttons">
        <Button sx={{color:"#38b000"}} onClick={() => setRunning(true)}>Start</Button>
        <Button 
          sx={{color:"#d90429"}}
          onClick={() =>{
					setRunning(false)
					dispatch(updatePost({id: props.stopWatchProp.postId, time: time }))
          updatePostFunc({postId:props.stopWatchProp.postId, title:props.stopWatchProp.title, content:props.stopWatchProp.content, timeSpent:time, date: props.stopWatchProp.date})
					}}>Stop</Button>
        <Button 
          sx={{color:"black"}}
          onClick={() => {
					setTime(0)
					dispatch(updatePost({id: props.stopWatchProp.postId, time: 0 }))
          updatePostFunc({postId:props.stopWatchProp.postId, title:props.stopWatchProp.title, content:props.stopWatchProp.content, timeSpent:time, date: props.stopWatchProp.date})
					}}>Reset</Button>
        <Button sx={{color:"black"}} onClick={()=>handleClickOpen()}>Enter Time</Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <TimePicker
              ampm={false}
              openTo="hours"
              views={['hours', 'minutes', 'seconds']}
              inputFormat="HH:mm:ss"
              mask="__:__:__"
              label=""
              value={manualTimeUpdate}
              onChange={(newValue) => {
                setManualTimeUpdate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button sx={{color:"black"}} onClick={() => {handleManualTimeUpdate(manualTimeUpdate!.format('HH:mm:ss'))}}>Update Time</Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
	)
}

export default StopWatch
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import StopWatch from './StopWatch';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid'
import Constants from '../utils/Constants';
import UpdatePost from './UpdatePost';
import EmptyList from './EmptyList';
import {
  TableContainer,
  Table,
  TableHead, 
  TableBody,
  TableRow,
  TableCell,
  Paper
} from "@mui/material"
import React, {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../hooks'
import { addPost, deletePost, removeAllPosts } from './postSlice';

interface IPosts {
  postId: string;
  title: string;
  content: string;
  timeSpent:number;
	date: any;
};

function MainPage() {
	let dateTime = new Date()
	const dispatch = useAppDispatch();
  const postList = useAppSelector((state) => state.post.value);
  const [client, setClient] = useState<string>("");
  const [note, setNote] = useState<string>("");
	const [date, setDate] = React.useState<Dayjs | null>(
    dayjs(dateTime),
  );

  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  const getPosts = (postDate: string) => {
    const url = `${Constants.API_URL_FILTER_POSTS_BY}/${postDate}`;

    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(postsFromServer => {
			dispatch(removeAllPosts())
			for(const post in postsFromServer){
				console.log(postsFromServer[post].id)
				dispatch(addPost({
					postId:postsFromServer[post].postId, 
					title:postsFromServer[post].title, 
					content:postsFromServer[post].content,
					timeSpent:postsFromServer[post].timeSpent,
					date:postsFromServer[post].date
				}))
			}
    })
    .catch((error) => {
      console.log(error);
      alert('SERVER ERROR: POST COULDN\'T BE RETRIEVED');
    });
  }

	const savePosts = (post: IPosts) => {
		const url = Constants.API_URL_CREATE_POST;

    fetch(url, {
      method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(responseFromServer => {
      dispatch(addPost({postId:post.postId, title:client, content:note, timeSpent:0, date:post.date}))
      console.log(responseFromServer);
    })
    .catch((error) => {
      console.log(error);
      alert('SERVER ERROR: POST COULDN\'T BE SAVED');
    });
	}

	const deletePostFunc = (postId: string) => {
		const url = `${Constants.API_URL_DELETE_POST_BY_ID}/${postId}`;

		fetch(url, {
      method: 'DELETE',
			headers: {
				'Content-Type' : 'application/json'
			}
    })
    .then(response => response.json())
    .then(responseFromServer => {
      console.log(responseFromServer);
      dispatch(deletePost(postId));
    })
    .catch((error) => {
      console.log(error);
      alert('SERVER ERROR: POST COULDN\'T BE DELETED');
    });
	}

  useEffect(() => {
    // Update the document title using the browser API
    console.log(postList)
  },[postList]);

  const addPostFunc = () => {
		const uuid = uuidv4();
		savePosts({postId:uuid, title:client, content:note, timeSpent:0, date:date!.format("DDMMYYYY")})
  }
  
	
	return (
		<div>
      <Box style={{display:'flex', justifyContent:'center', marginBottom:'3%', marginTop:'5%'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date"
              inputFormat="DD/MM/YYYY"
              value={date}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          
          <Button sx={{height:'5.8vh', marginLeft:'2%'}} variant='contained' onClick={()=>getPosts(date!.format("DDMMYYYY"))}>Get All Posts</Button>
      </Box>
      <div style={{display:'flex', justifyContent:'center', marginBottom:'3%', marginTop:'2%'}}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch', marginTop: "", marginBottom: "", },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="client" label="Client" variant="outlined"
        onChange={(event) => {
          setClient(event.target.value);
        }} />
        <TextField id="note" label="Notes" variant="outlined" 
        onChange={(event) => {
          setNote(event.target.value);
        }}/>
        <Button onClick={addPostFunc} sx={{height:"73%"}} variant='contained' >Add Post</Button>
      </Box>
      </div>
      <Box style={{display:'flex', justifyContent:'center', marginBottom:'3%', marginTop:'5%'}}>
      {postList.length === 0 && renderEmptyList()}
      </Box>
      {postList.length > 0 && renderPostsTable()}
		</div>
	)

  function renderEmptyList(){
    return(
      <EmptyList />
    )
  }

	function renderPostsTable(){
    return(
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow style={{backgroundColor:'black'}}>
              <TableCell style={{textAlign:'center', fontSize:'1.5rem', fontWeight:700, color:'white'}}>Time Spent</TableCell>
              <TableCell style={{textAlign:'center', fontSize:'1.5rem', fontWeight:700, color:'white'}}>Client</TableCell>
              <TableCell style={{textAlign:'center', fontSize:'1.5rem', fontWeight:700, color:'white'}}>Notes</TableCell>
              <TableCell style={{textAlign:'center', fontSize:'1.5rem', fontWeight:700, color:'white'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postList.map((post:IPosts) => (
              <TableRow key={post.postId}>
              <TableCell><StopWatch key={post.postId} stopWatchProp={post} /></TableCell>
              <TableCell style={{textAlign:'center'}}>{post.title}</TableCell>
              <TableCell style={{textAlign:'center'}}>{post.content}</TableCell>
              <TableCell>
                <Stack justifyContent='center' spacing={2} direction="row">
								<UpdatePost postProp={post} />
                  <Button
									onClick={() => {
										deletePostFunc(post.postId)
									}} variant="contained">Delete</Button>
                </Stack>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default MainPage
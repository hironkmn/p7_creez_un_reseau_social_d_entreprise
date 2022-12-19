import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-avataaars-sprites';
import { useForm } from "react-hook-form";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import { Box } from '@mui/system';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
require('dotenv').config()


const jwt = require('jsonwebtoken')


function Posts(props) {
  const user = props.post.userId
  let avatar = createAvatar(style, {
    seed: user,
    size: 30,
    backgroundColor: 'white'
  })
  const [openForm, setOpenForm] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const [nbLikes, setNbLikes] = React.useState(props.post.likes);

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleClickOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleDelete = () => {
    let token = localStorage.getItem('token')
    let post = document.getElementById(props.post._id)
    post.remove()
    fetch(process.env.REACT_APP_POSTS_URL + props.post._id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
  }

  const handleLike = (event) => {
    let token = localStorage.getItem('token')
    let tokenDecoded = jwt.decode(localStorage.getItem('token'))
    fetch(process.env.REACT_APP_POSTS_URL + props.post._id + '/like', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ userId: tokenDecoded.userId, like: event.target.checked ? 1 : 0 })
    })
    if (event.target.checked) {
      setNbLikes(nbLikes + 1)
    } else {
      setNbLikes(nbLikes - 1)
    }
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = async (d) => {
    const formData = new FormData()
    formData.append('titre', d.titre)
    formData.append('description', d.description)
    formData.append('image', d.image[0])
    let token = localStorage.getItem('token')
    let response = await fetch(process.env.REACT_APP_POSTS_URL + props.post._id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: formData
    })
    let post = await response.json()
    props.setPosts((posts) => {
      let index = posts.findIndex((p) => p._id === post._id)
      posts.splice(index, 1, post)
      return posts
    } )
    window.location.reload()
  }

  const svg = new Blob([avatar], { type: "image/svg+xml" })
  const url = URL.createObjectURL(svg)

  return (
    <div id={props.post._id}>
      <Card sx={{ maxWidth: '100%' }}>
        <CardHeader
          avatar={
            <Avatar src={url} aria-label="recipe">
            </Avatar>
          }
          title={props.post.titre}
          subheader={props.post.date}
        />
        <CardMedia
          component="img"
          height="194"
          image={props.post.imageUrl}
          alt="Paella dish"
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.post.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Checkbox onClick={handleLike} checked={nbLikes>0} aria-label='like button' icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />} />
          {nbLikes}
          <IconButton onClick={handleClickOpenForm} flearia-label="edit button">
            {props.hasRoles && <EditIcon />}
          </IconButton>
          <Dialog open={openForm} onClose={handleCloseForm} fullWidth={true}>
            <DialogTitle>
              Editez votre post
            </DialogTitle>
            <Divider />
            <DialogContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField id="standard-basic" label="Titre" variant="standard" defaultValue={props.post.titre} required {...register('titre')} />
                <TextField
                  id="outlined-multiline-static"
                  label="Texte"
                  multiline
                  rows={4}
                  fullWidth
                  margin='normal'
                  required
                  {...register('description')}
                  defaultValue={props.post.description}
                />
                <Box className='form-buttons' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label htmlFor="upload-photo">
                    <input
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      accept='image/png, image/jpeg'
                      {...register('image')}
                    />
                    <Fab
                      color="primary"
                      component="span"
                      aria-label="add"
                      variant="circular"
                    >
                      <ImageIcon />
                    </Fab>
                  </label>
                  <Button variant='text' type='submit' onClick={handleCloseForm}>Poster</Button>
                </Box>
              </form>
            </DialogContent>
          </Dialog>
          <IconButton onClick={handleClickOpenConfirmation} sx={{ marginLeft: 'auto' }} aria-label='delete button'>
            {props.hasRoles && <DeleteIcon />}
          </IconButton>
          <Dialog
            open={openConfirmation}
            onClose={handleCloseConfirmation}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Attention !"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Voulez-vous supprimer ce post ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmation}>Non</Button>
              <Button onClick={() => { handleCloseConfirmation(); handleDelete() }} autoFocus>
                Oui
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
      <Divider />
    </div>
  );
}

export default Posts
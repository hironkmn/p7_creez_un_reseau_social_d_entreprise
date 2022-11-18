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


const jwt = require('jsonwebtoken')


function Posts(props) {
  const [expanded, setExpanded] = React.useState(false);
  const user = props.posts.userId
  let avatar = createAvatar(style, {
    seed: user,
    size: 30,
    backgroundColor: 'white'
  })
  const [openForm, setOpenForm] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

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
    let token = jwt.decode(localStorage.getItem('token'))
    let post = document.getElementById(props.posts._id)
    post.remove()
    fetch('http://localhost:3000/api/posts?id='+ props.posts._id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = async (d) => {
    const formData = new FormData()
    formData.append('titre', d.titre)
    formData.append('description', d.description)
    formData.append('image', d.image[0])
    let token = localStorage.getItem('token')
    let response = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: formData
    })
    response.json()
  }

  const svg = new Blob([avatar], { type: "image/svg+xml" })
  const url = URL.createObjectURL(svg)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div id={props.posts._id}>
    <Card sx={{ maxWidth: '100%' }}>
      <CardHeader
        avatar={
          <Avatar src={url} aria-label="recipe">
          </Avatar>
        }
        title={props.posts.titre}
        subheader='Octobre'
      />
      <CardMedia
        component="img"
        height="194"
        image={props.posts.imageUrl}
        alt="Paella dish"
        sx={{objectFit: "contain"}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.posts.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Checkbox aria-label='like button' icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />} />
        {props.posts.likes}
        <IconButton onClick={handleClickOpenForm} dixplay flearia-label="edit button">
          <EditIcon />
        </IconButton>
        <Dialog open={openForm} onClose={handleCloseForm} fullWidth={'lg'}>
          <DialogTitle>
            Editez votre post
          </DialogTitle>
          <Divider />
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField id="standard-basic" label="Titre" variant="standard" required {...register('titre')} />
              <TextField
                id="outlined-multiline-static"
                label="Texte"
                multiline
                rows={4}
                fullWidth
                margin='normal'
                required
                {...register('description')}
              />
              <Box className='form-buttons' sx={{ display: 'flex' }}>
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
          <DeleteIcon />
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
            <Button onClick={React.useEffect(() => {handleCloseConfirmation(); handleDelete()})} autoFocus>
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
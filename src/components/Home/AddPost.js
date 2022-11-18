import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import ImageIcon from '@mui/icons-material/Image';
import { Box } from '@mui/system';
import { useForm } from "react-hook-form";

export default function FormDialog() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { register, handleSubmit } = useForm();
    const onSubmit = async (d) => {
        console.log(d)
        const formData = new FormData()
        formData.append('titre', d.titre)
        formData.append('description', d.description)
        formData.append('image',d.image[0] )
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
    return (
        <div>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen} sx={{ position: 'fixed', bottom: 12, right: 12 }}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} fullWidth={'lg'}>
                <DialogTitle>
                    Racontez ce que vous voulez...
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
                            <Button variant='text' type='submit' onClick={handleClose}>Poster</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
import { Avatar, Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { updateProfileAction } from '../../Redux/Auth/auth.action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    outline: "none",
    overFlow: " scroll-y",
    borderRadius: 3,
};




export default function ProfileModal({ open, handleClose }) {
    const jwt = localStorage.getItem("jwt");
    const { loading, error } = useSelector(store => store.auth);
    const dispatch = useDispatch()
    
    const handleSubmit = (values) => {
        console.log("values", values)
    }
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: ""
        },
        onSubmit: (values,) => {
            console.log("values", values)
            dispatch(updateProfileAction(values,jwt))
        },
    })

    useEffect(() => {
        if (!loading && !error) {
            handleClose();
        }
    }, [loading, error]);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex items-center justify-between'>
                            <div className="flex items-start space-x-3">
                                <IconButton onClick={handleClose}>
                                    <CloseIcon></CloseIcon>
                                </IconButton>
                                <p>Edit Profile</p>
                            </div>
                            <Button type='submit'>Save</Button>
                        </div>
                        <div>
                            <div className='h-[15rem]'>
                                <img className="w-full h-full rounded-t-md" src="" alt="" />
                            </div>
                            <div className='pl-5'>
                                <Avatar className='transform -translate-y-24' sx={{ width: "10rem", height: "10rem" }}
                                    src=''>

                                </Avatar>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <TextField 
                            fullWidth 
                            id='firstName' 
                            name='firstName' 
                            label="First Name" 
                            value={formik.values.firstName}
                            onChange={formik.handleChange} />
                            <TextField 
                            fullWidth 
                            id='lastName' 
                            name='lastName' 
                            label="Last Name" 
                            value={formik.values.lastName}
                            onChange={formik.handleChange} />
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}


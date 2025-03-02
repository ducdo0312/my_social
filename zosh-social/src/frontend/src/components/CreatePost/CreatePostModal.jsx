import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import { createCommentAction, createPostAction } from '../../Redux/Post/post.action';
import { useDispatch } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: ".6rem",
    outline: "none"
};
const CreatePostModal = ({ handleClose, open }) => {

    const [selectedImage, setSelectedImage] = useState();
    const [selectedVideo, setSelectedVideo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch=useDispatch()
    const handleSelectImage = async(event) => {
        setIsLoading(true);
        const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
        setSelectedImage(imageUrl);
        setIsLoading(false);
        formik.setFieldValue("image", imageUrl)
    };
    const handleSelectVideo = async(event) => {
        setIsLoading(true);
        const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
        setSelectedVideo(videoUrl);
        setIsLoading(false);
        formik.setFieldValue("video", videoUrl)
    };
    const formik = useFormik({
        initialValues:{
            caption:"",
            image:"",
            video:""
        },
        onSubmit:(values)=>{
            console.log("formik values", values);
            dispatch(createPostAction(values))
        }
    });


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div className='flex space-x-4 items-center'>
                            <Avatar />
                            <div>
                                <p className='font-bold text-lg'> ABC0</p>
                                <p className='text-sm'>@abc</p>
                            </div>
                        </div>
                        <textarea 
                        className='outline-none w-full mt-5 p-2 bg-transp rounded-md border border-[#3b4054]'
                        placeholder='write caption...' name="caption"
                            onChange={formik.handleChange}
                            id="" value={formik.values.caption} rows="4">
                        </textarea>

                        <div className='flex space-x-5 items-center mt-5'>
                            <div>
                                <input type="file" name="" id="image-input" accept='image/*' onChange={handleSelectImage} style={{ display: "none" }}
                                />
                                <label htmlFor="image-input">
                                    <IconButton color='primary' component ="span" >
                                        <ImageIcon>

                                        </ImageIcon>
                                    </IconButton>
                                </label>
                                <span>Image </span>
                            </div>
                        </div>
                        <div className='flex space-x-5 items-center mt-5'>
                            <div>
                                <input type="file" name="" id="video-input" accept='video/*' onChange={handleSelectVideo} style={{ display: "none" }}
                                />
                                <label htmlFor="video-input">
                                    <IconButton color='primary' >
                                        <VideocamIcon />
                                    </IconButton>
                                </label>
                                <span>Video </span>
                            </div>
                        </div>
                        {selectedImage && <div>
                            <img className='h-[10rem]' src={selectedImage} alt="" />
                        </div>}
                        <div className='flex w-full justify-end'>
                            <Button variant="contained" type="submit" sx={{ borderRadius: '1.5rem' }}>Post</Button>
                        </div>
                    </div>
                </form>
                <Backdrop
                    
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={isLoading}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </Modal>
    )
}

export default CreatePostModal
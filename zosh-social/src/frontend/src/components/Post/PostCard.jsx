import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../Redux/Post/post.action';
import { isLikedByReqUser } from '../../utils/isLikedByReqUser';
const PostCard = ({ item }) => {
    const dispatch = useDispatch()
    const [showComments, setShowComments] = useState(false);
    const handleShowComment = () => setShowComments(!showComments);
    const {post,auth}=useSelector(store=>store)
    const handleCreateComment = (content) => {
        const reqData = {
            postId: item.id,
            data: {
                content
            }
        }
        dispatch(createCommentAction(reqData))
    }
    const handleLikePost=()=>{
        dispatch(likePostAction(item.id))
    }
    console.log("is like???", isLikedByReqUser(auth.user.id, item))
    console.log("use--------------", item.user)
    return (
        <Card className=''>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={item.user.firstName + " " + item.user.lastName}
                subheader={item.user.email}
            />
            {/* <CardMedia
                component="img"
                height="194"
                image={item.image}
                alt="Paella dish"
            /> */}
            <img className="w-full max-h-[30rem] object-cover" src={item.image} alt="" />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.caption}
                </Typography>
            </CardContent>
            <CardActions className='flex justify-between' disableSpacing>
                <div>
                    <IconButton onClick={handleLikePost}>
                        {isLikedByReqUser(auth.user.id, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton>
                        {<ShareIcon />}
                    </IconButton>
                    <IconButton onClick={handleShowComment}>
                        {<ChatIcon />}
                    </IconButton>
                </div>
                <div>
                    <IconButton>
                        {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </div>

            </CardActions>
            {showComments && <section>
                <div className='flex items-center space-x-5 mx-3 my-5'>
                    <Avatar sx={{}} />
                    <input onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleCreateComment(e.target.value);
                            console.log("enter pressed", e.target.value);
                        }
                    }}
                        className='w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2' type='text' placeholder='write comment' />
                </div>
                <Divider />
                <div className='mx-3 space-y-2 my-5 text-xs'>

                    {item.comments?.map((comment)=> 
                    <div className='flex items-center space-x-5'>
                        <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}>
                            {comment.user.firstName[0]}
                        </Avatar>
                        <p>{comment.content}</p>
                    </div>)}
                    
                </div>
            </section>}
        </Card>
    )
}

export default PostCard
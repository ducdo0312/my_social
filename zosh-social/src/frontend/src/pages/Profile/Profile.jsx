import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostCard from '../../components/Post/PostCard';
import UserReelCard from '../../components/Reels/UserReelCard';
import { useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';
const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "report", name: "Report" },

]
const posts = [1, 1, 1, 1];
const reels = [1, 1, 1, 1];
const SavedPost = [1, 1, 1, 1];



const Profile = () => {
  
  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { auth } = useSelector(store => store)
  const navigate = useNavigate()
  const { id } = useParams()
  const [value, setValue] = React.useState('post');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card className='py-10 w-[70%]'>
      <div className='rounded-md'>
        <div className='h-[rem]'>

          <img className='w-full h-full rounded-t-md'
            src="https://vozer.vn/storage/images/tien-de-51575396.jpg" alt="" />
        </div>
        <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
          <Avatar className='transform -translate-y-24' sx={{ width: "10rem", height: "10rem" }} src='' />
          <Button sx={{ borderRadius: '20px' }} variant='outlined' onClick={() => setOpen(true)}>
            Edit Profile
          </Button>
        </div>
        <div className='p-5'>
          <div>
            <h1 className='py-1 font-bold text-xl'>{auth.user?.firstName + " " + auth.user?.lastName}</h1>
            <p>{auth.user?.email}</p>
          </div>
          <div className="flex gap-2 items-center py-3">
            <span> {auth.user?.followers?.length || 0} followers </span>
            <span> {auth.user?.followings?.length || 0} followings </span>

          </div>
          <div>
            <p>Vương mỗ nghịch tu, nghịch thien</p>
          </div>
          <section>
            <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
              >

                {tabs.map((item) => <Tab key={item.value} value={item.value} label={item.name} wrapped />)}

              </Tabs>
            </Box>
            <div className='flex justify-center mt-5'>
              {value === "post" ? <div className=' w-[70%] space-y-5'>
                {posts.map((item) => <div className='border border-slate-100 rounded-md'> </div>)}
              </div> : value === 'reels' ? <div className='flex flex-wrap gap-2 my-10'>
                {reels.map((item) => <UserReelCard></UserReelCard>)}
              </div> : value === 'saved' ? <div className='w-[70%] space-y-5'>
                {SavedPost.map((item) => <div></div>)}
              </div> : <div>Report</div>}
            </div>
          </section>
          <ProfileModal open={open} handleClose={handleClose} />
        </div>
      </div>
    </Card>
  )
}

export default Profile
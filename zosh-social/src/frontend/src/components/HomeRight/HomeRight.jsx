import React from 'react'
import PopularUserCard from './PopularUserCard'
import SearchUser from '../SearchUser/SearchUser'
import { Card } from '@mui/material'

const popularUser = [1, 1, 1, 1, 1]
const HomeRight = () => {
    return (
        <div className='pr-5'>
            <SearchUser />

            <Card className='p-5'>
                <div className='flex justify-betwwen py-5 items-center'>
                    <p className='font-semibold opacity-70'>Suggestions for you</p>
                    <p className='font-semibold opacity-70'>View All</p>

                </div>

                <div className=''>
                    {popularUser.map((item)=><PopularUserCard />)}
                </div>
            </Card>


        </div>
    )
}

export default HomeRight
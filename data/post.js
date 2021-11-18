import {USERS} from './users.js'

export const POSTS = [
    {
        imageUrl:"https://images.unsplash.com/photo-1637189315455-3e7e629a05b9?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        user: USERS[0].user,
        likes:750,
        caption:'This is the 1st post This is the 1st post This is the 1st post This is the 1st post This is the 1st post',
        profilePicture: USERS[0].image,
        comments:[
            {
                user: 'theman',
                comment: 'Very nice post'
            },
            {
                user: 'thewomen',
                comment: 'Cant beilve it!!'
            }
        ]
    },
    {
        imageUrl:"https://images.unsplash.com/photo-1637221615119-f43356ae336d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        user: USERS[1].user,
        likes:250,
        caption:'This is the 2st post',
        profilePicture: USERS[1].image,
        comments:[
            {
                user: 'devman',
                comment: 'Whats the location??'
            },
            {
                user: 'womenCoder',
                comment: 'Beautifull location!!'
            }
        ]
    }
]
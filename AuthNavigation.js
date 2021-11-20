import React from 'react'
import { View, Text } from 'react-native'
import { SignedInStack, SignedOutStack } from './navigation'
import {firebase} from './firebase.js'

const AuthNavigation = () => {

    const [currentUser,setCurrentUser] = React.useState(null)

    const userHandler = user => user ? setCurrentUser(user) : setCurrentUser(null)

    React.useEffect(()=>(
        firebase.auth().onAuthStateChanged(user=>userHandler(user))
    ),[firebase])

    return (
        <>
            {
                currentUser ?  <SignedInStack/> : <SignedOutStack/>
            }

        </>
    )
}

export default AuthNavigation

import React from 'react'
import { View, SafeAreaView, Text, StyleSheet, FlatList } from 'react-native'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import Stories from '../components/home/Stories'
import { POSTS } from '../data/post.js'
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs'
import {db} from '../firebase'

const HomeScreen = ({navigation}) => {

        const [posts , setPosts] = React.useState([])
    
        React.useEffect(()=>{
        db.
        collectionGroup('posts').
        onSnapshot(snapshot => {
            setPosts(snapshot.docs.map( doc => doc.data()))
        })
    },[])


    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories />
            <View style={styles.divider}></View>
            <FlatList
                data={posts}
                renderItem={({item})=>(
                    <>
                        <Post post={item} />
                        <View style={styles.divider}></View>
                    </>
                )}
                keyExtractor={item => item.user}
            />
            <BottomTabs icons={bottomTabIcons} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
    },
    divider: {
        height: 0.5,
        backgroundColor: "grey"
    },
})

export default HomeScreen

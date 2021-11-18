import React from 'react'
import { View, SafeAreaView, Text, StyleSheet , FlatList } from 'react-native'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import Stories from '../components/home/Stories'
import { POSTS } from '../data/post.js'

const HomeScreen = () => {

    console.log(POSTS[0]);

    const renderItem = ({ item }) => (
        <>
        <Post post={item} />
        <View style={styles.divider}></View>
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Stories />
            <View style={styles.divider}></View>
            {/* <Post post={POSTS[0]} /> */}
            <FlatList
                data={POSTS}
                renderItem={renderItem}
                keyExtractor={item => item.user}
            />
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

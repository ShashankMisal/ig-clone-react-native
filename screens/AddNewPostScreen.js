import React from 'react'
import { View, Text , SafeAreaView ,StyleSheet } from 'react-native'
import AddNewPost from '../components/addNewPost/AddNewPost'

const AddNewPostScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <AddNewPost navigation={navigation}  />
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

export default AddNewPostScreen

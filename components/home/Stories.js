import React from 'react'
import { View, Text, ScrollView, FlatList, StyleSheet, Image } from 'react-native'
import { USERS } from '../../data/users.js'

const Stories = () => {

    const renderItem = ({ item }) => (
        <View style={styles.singleStory}>
            <Image source={{ uri: item.image }} style={styles.storyImage} />
            <Text style={{ color: "white" }} >
                {
                    item.user.length > 10 ? item.user.slice(0, 10).toLowerCase() + '...' : item.user
                }
            </Text>
        </View>
    );

    return (
        <View style={styles.storiesContainer}>
            <FlatList
                data={USERS}
                renderItem={renderItem}
                keyExtractor={item => item.user}
                horizontal
            />
        </View>
    )
}

const styles = StyleSheet.create({
    storiesContainer: {
        marginBottom: 10
    },
    storyImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#ff8501"
    },
    singleStory: {
        alignItems: "center",
        margin: 10
    }
})

export default Stories

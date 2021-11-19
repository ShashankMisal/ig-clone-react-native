import React from 'react'
import { View, SafeAreaView, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = ({ navigation }) => {
    return (
        <View>
            <Header navigation={navigation} />
            <FormikPostUploader navigation={navigation} />
        </View>
    )
}


const Header = ({ navigation }) => (
    <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity onPress={ () => navigation.goBack() }>
            <Image
                source={{ uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png' }}
                style={styles.backArrowIcon}
            />
        </TouchableOpacity>
        <Text style={styles.headerText}>NEW POST</Text>
        <Text></Text>
    </SafeAreaView>
)



const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10
    },
    backArrowIcon: {
        width: 30,
        height: 30,
    },
    headerText: {
        color: "white",
        fontWeight: '700',
        fontSize: 20

        // flex:1
    },

})

export default AddNewPost

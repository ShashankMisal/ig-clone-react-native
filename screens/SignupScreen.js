import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import SignUpForm from '../components/signupScreen/SignUpForm'

const SignupScreen = ({navigation}) => {
    return (
        <View style={styles.loginContainer}>
            <View style={styles.logoContainer}>
                <Image
                    source={{
                        uri: 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png',
                        width: 100,
                        height: 100
                    }}
                />
            </View>
            <SignUpForm navigation={navigation} />
        </View>
    )
}



const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: "white"
    },
    logoContainer: {
        marginTop: 90,
        alignItems: "center"
    }


})


export default SignupScreen

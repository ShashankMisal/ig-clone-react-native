import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import LoginForm from '../components/loginScreen/LoginForm'

const LoginScreen = ({navigation}) => {
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
            <LoginForm navigation={navigation} />
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


export default LoginScreen

import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'

const Header = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image
                    style={styles.logo}
                    source={require('../../assets/header-logo.png')}
                />
            </TouchableOpacity>

            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png'
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png'
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
    },
    iconContainer: {
        flexDirection: "row"
    },
    logo: {
        width: 100,
        height: 60,
        padding: 10,
        resizeMode: "contain"
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
    }

})

export default Header

import React from 'react'
import { View, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import {firebase} from '../../firebase'

export const bottomTabIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png',
        inactive:
            'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png',
    },
    {
        name: 'Search',
        active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/search--v1.png',
    },
    {
        name: 'Reels',
        active: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/instagram-reel.png',
    },
    {
        name: 'Shop',
        active:
            'https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png',
        inactive:
            'https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png',
    },
    {
        name: 'Profile',
        active:
            'https://yt3.ggpht.com/ytc/AKedOLRzZooqYwfui_FlDKEAsYkD8rvL66qDV4McI5fl=s68-c-k-c0x00ffffff-no-rj',
        inactive:
            'https://yt3.ggpht.com/ytc/AKedOLRzZooqYwfui_FlDKEAsYkD8rvL66qDV4McI5fl=s68-c-k-c0x00ffffff-no-rj',
    },
]



const BottomTabs = ({ icons }) => {


    const [activeTab, setActiveTab] = React.useState('Home')

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab (icon.name)}>
            <Image 
            source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }} 
            style={[
                styles.bottomTabsIcon,
                icon.name==='Profile'?styles.bottomTabUserAvatar():null,
                activeTab==='Profile' && icon.name === activeTab ? styles.bottomTabUserAvatar(activeTab):null
            ]} 
            />
        </TouchableOpacity>
    )


    return (
        <View style={styles.bottomTabsContainer}>
            <FlatList
                data={icons}
                contentContainerStyle={styles.list}
                horizontal
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <Icon icon={item} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    bottomTabsIcon: {
        width: 35,
        height: 35,
        margin: 10
    },
    bottomTabsContainer:{
        position:"relative",
        width:'100%',
        bottom:'0%',
        zIndex:99,
        backgroundColor:'#000'
    },
    list: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    bottomTabUserAvatar: (activeTab='') => ({
        borderRadius: 50,
        borderWidth: activeTab === 'Profile' ? 3 : 0,
        borderColor: "#ff8501",
    })

})

export default BottomTabs

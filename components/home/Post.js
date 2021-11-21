import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import {firebase , db} from '../../firebase'

const Post = ({ post }) => {

    const handleLike = post => {
        const currentlikeStatus = !post.likes_by_users?.includes(
            firebase.auth().currentUser.email
        )

        db.collection('users')
            .doc(post.owner_email)
            .collection('posts')
            .doc(post.id)
            .update({
                likes_by_users: currentlikeStatus?
                 firebase.firestore.FieldValue.arrayUnion(
                    firebase.auth().currentUser.email
                ):
                firebase.firestore.FieldValue.arrayRemove(
                    firebase.auth().currentUser.email
                )
            }).then(()=>{console.log("pushed Suceesfullt")}).catch((error)=>{console.log(error.message)})

    }


    return (
        <View >
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ margin: 10 }}>
                <PostFooter post={post} handleLike={handleLike} />
                <Likes post={post} />
                <Captions post={post} />
                <CommentSection post={post} />
                <Comments post={post} />
            </View>
        </View>
    )
}


const postFooterIcons = [
    {
        name: "like",
        imageUrl: "https://img.icons8.com/fluency-systems-regular/48/ffffff/like--v1.png",
        likedImageUrl: 'https://img.icons8.com/emoji/48/000000/heart-suit.png'
    },
    {
        name: "Comment",
        imageUrl: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/ffffff/external-comment-chat-flatart-icons-outline-flatarticons-2.png',
    },
    {
        name: "Share",
        imageUrl: 'https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/ffffff/external-paper-plane-social-media-vitaliy-gorbachev-lineal-vitaly-gorbachev.png',
    },
    {
        name: "Save",
        imageUrl: 'https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/ffffff/external-bookmark-interface-kiranshastry-lineal-kiranshastry.png',
    },
]



const PostHeader = ({ post }) => {
    return (
        <View style={styles.postHeaderContainer}>
            <View style={styles.userNameAvatarContainer}>
                <Image
                    source={{
                        uri: post?.profilePicture
                    }}
                    style={styles.userAvatar}
                />
                <Text style={{ color: "white" }}>{post?.user}</Text>
            </View>
            <Text style={{ color: "white", fontWeight: 'bold' }}>
                ...
            </Text>
        </View>
    )
}

const PostImage = ({ post }) => (
    <View style={styles.postImageContainer}>
        <Image
            source={{
                uri: post.imageUrl
            }}
            style={styles.postImage}
        />
    </View>
)

const PostFooter = ({post,handleLike}) => (
    <View style={styles.postFooterIconsContainer}>
        <View style={styles.leftFooterIconsContainer}>
            <TouchableOpacity onPress={()=>handleLike(post)}>
            <Image 
            style={styles.footerIcon} 
            source={{
                uri:post.likes_by_users?.includes(firebase.auth().currentUser.email)
                ? postFooterIcons[0].likedImageUrl
                : postFooterIcons[0].imageUrl
            }} 
            />
            </TouchableOpacity>

            {/* <Icon imgUrl={postFooterIcons[0].imageUrl} /> */}
            <Icon imgUrl={postFooterIcons[1].imageUrl} />
            <Icon imgUrl={postFooterIcons[2].imageUrl} />
        </View>
        <Icon imgUrl={postFooterIcons[3].imageUrl} />
    </View>
)

const Icon = ({ imgUrl }) => (
    <TouchableOpacity>
        <Image style={styles.footerIcon} source={{ uri: imgUrl }} />
    </TouchableOpacity>
)

const Likes = ({ post }) => (
    <View>
        <Text style={{ color: "white", fontWeight: "700", marginTop: 10 }}>
            {post.likes_by_users?.length.toLocaleString('en')} likes
        </Text>
    </View>
)

const Captions = ({ post }) => (
    <View style={{ margin: 5 }}>
        <Text style={{ color: "white" }}>
            <Text style={{ fontWeight: "700" }}>
                {post.user}
            </Text>
            <Text>
                {' '}{post.caption}
            </Text>
        </Text>
    </View>
)

const CommentSection = ({ post }) => (
    <View>
        {
            !!post.comments.length && (
                <Text style={{ color: "grey" }}>
                    View {post.comments.length > 1 && 'all'}{' '}{post.comments.length}{' '}{post.comments.length > 1 ? 'comments' : 'comment'}
                </Text>
            )
        }

    </View>
)

const Comments = ({ post }) => (
    <FlatList
        data={post.comments}
        keyExtractor={item => item.createdAt}
        renderItem={(item) => (
            <View style={{ marginTop: 5 }}>
                <Text style={{ color: "white" }}>
                    <Text style={{ fontWeight: "700" }}>
                        {item.item.user}
                    </Text>
                    <Text>
                        {console.log(item)}
                        {' '}{item.item.comment}
                    </Text>
                </Text>
            </View>
        )}
    />
)


const styles = StyleSheet.create({
    postHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        alignItems: "center"
    },
    userNameAvatarContainer: {
        flexDirection: "row",
        alignItems: "center",

    },
    userAvatar: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#ff8501",
        marginRight: 10
    },
    postImageContainer: {
        flex: 1,
        height: 450
    },
    postImage: {
        height: "100%",
        resizeMode: "cover"
    },
    footerIcon: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    postFooterIconsContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    leftFooterIconsContainer: {
        flexDirection: "row",
        padding: 1
    }
})

export default Post

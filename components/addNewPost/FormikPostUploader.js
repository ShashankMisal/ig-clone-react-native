import React from 'react'
import { View, Text, Image, TextInput, StyleSheet, Button } from 'react-native'
import * as Yup from 'yup'
import { Formik, Input } from 'formik'
import { firebase, db } from '../../firebase'


const validationSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("Please Enter a Url"),
    caption: Yup.string().max(2200, 'Capion has reached the character limit')
})

const PLACEHOLDER_IMG = 'https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder.jpg'


const FormikPostUploader = ({ navigation }) => {

    const [thumbnail, setThumbnail] = React.useState(PLACEHOLDER_IMG)

    const [currentLoggedInUser, setCurrentLoggedInUser] = React.useState(null);


    const getUserName = () => {
        const user = firebase.auth().currentUser

        const unsubscribe = db
            .collection('users')
            .where('owner_uid', '==', user.uid)
            .limit(1)
            .onSnapshot(snapshot =>{
                snapshot.docs.map(doc => {
                    setCurrentLoggedInUser({
                        username: doc.data().username,
                        profilePicture: doc.data().profilePicture
                    })
                })
            })

        return unsubscribe
    }

    React.useEffect(() => {
        getUserName()
    }, [])



    const uploadPostToFirebase = (imageUrl, caption) => {

        const unsubscribe = db
            .collection('users')
            .doc(firebase.auth().currentUser?.email)
            .collection('posts')
            .add({
                imageUrl: imageUrl,
                caption: caption,
                user: currentLoggedInUser.username,
                profilePicture: currentLoggedInUser?.profilePicture,
                owner_uid: firebase.auth().currentUser.uid,
                owner_email:firebase.auth().currentUser.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_users: [],
                comments: []
            })
            .then(() => navigation.goBack())
            .catch((error)=>console.log(error,"uploaderror"))

        return unsubscribe
    }



    return (
        <Formik
            initialValues={{ caption: '', imageUrl: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                uploadPostToFirebase(values.imageUrl, values.caption)
            }}
            validateOnMount
        >
            {
                ({ handleBlur, handleChange, handleSubmit, values, errors, isValid, dirty, touched }) => (
                    <>
                        <View style={styles.formContainer}>
                            <Image
                                style={{ width: 100, height: 100 }}
                                source={{ uri: thumbnail ? thumbnail : PLACEHOLDER_IMG }} />

                            <TextInput
                                placeholder="Write a Caption"
                                placeholderTextColor="grey"
                                name="caption"
                                multiline
                                style={styles.input}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                selectTextOnFocus={true}
                                value={values.caption}
                            />
                            {
                                errors.caption && (
                                    <Text style={{ fontSize: 10, color: "red" }}>
                                        {errors.caption}*
                                    </Text>
                                )
                            }

                            <TextInput
                                name="imageUrl"
                                placeholder="Enter a ImageUrl"
                                placeholderTextColor="grey"
                                style={styles.input}
                                onChangeText={handleChange('imageUrl')}
                                onBlur={handleBlur('imageUrl')}
                                value={values.imageUrl}
                                selectTextOnFocus={true}
                                onChange={e => setThumbnail(e.nativeEvent.text)}
                            />
                            {
                                errors.imageUrl && (
                                    <Text style={{ fontSize: 10, color: "red" }}>
                                        {errors.imageUrl}*
                                    </Text>
                                )
                            }

                            <View style={styles.shareButton}>
                                <Button title="SHARE" onPress={handleSubmit} disabled={!isValid} />
                            </View>

                        </View>
                    </>
                )
            }

        </Formik>
    )
}


const styles = StyleSheet.create({

    formContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    input: {
        // height: 40,
        width: '100%',
        marginVertical: 10,
        marginHorizontal: 8,
        borderWidth: 1,
        padding: 10,
        borderColor: "grey",
        color: "white"
    },
    shareButton: {
        width: '100%',
        marginTop: 5,
    }
});

export default FormikPostUploader

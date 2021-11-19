import React from 'react'
import { View, Text, Image, TextInput, StyleSheet, Button } from 'react-native'
import * as Yup from 'yup'
import { Formik, Input } from 'formik'


const validationSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("Please Enter a Url"),
    caption: Yup.string().max(2200, 'Capion has reached the character limit')
})

const PLACEHOLDER_IMG = 'https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder.jpg'


const FormikPostUploader = () => {

    const [thumbnail, setThumbnail] = React.useState(PLACEHOLDER_IMG)


    return (
        <Formik
            initialValues={{ caption: '', imageUrl: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
            validateOnMount
        >
            {
                ({ handleBlur, handleChange, handleSubmit, values, errors, isValid, dirty, touched }) => (
                    <>
                        <View style={styles.formContainer}>
                            <Image 
                            style={{ width: 100, height: 100 }} 
                            source={{ uri: thumbnail ? thumbnail :PLACEHOLDER_IMG }} />

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
                                onChange={e => setThumbnail (e.nativeEvent.text)}
                            />
                            {
                                errors.imageUrl && (
                                    <Text style={{ fontSize: 10, color: "red" }}>
                                        {errors.imageUrl}*
                                    </Text>
                                )
                            }

                            <View style={styles.shareButton}>
                            <Button title="SHARE" onPress={handleSubmit} disabled={!dirty || !isValid} />
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
    shareButton:{
        width: '100%',
        marginTop:5,
    }
});

export default FormikPostUploader

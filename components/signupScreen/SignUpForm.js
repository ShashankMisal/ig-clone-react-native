import React,{useCallback} from 'react'
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity,Alert } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'
import {firebase,db} from '../../firebase'

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    username: Yup.string().required('An username is required').min(2, 'You username should have at least 2 characters'),
    password: Yup.string().required('Password is required').min(6, 'Your password should have at least 6 characters')
})



const SignUpForm = ({ navigation }) => {

    const onSignUp = useCallback(async (email, password , username) => {

        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            if (response.user){
                db
                .collection('users')
                .doc(response.user.email)
                .set({
                    owner_uid: response.user.uid,
                    username:username,
                    email:response.user.email,
                    profilePicture: await getRandomProiflePic(),
                })
            }
        } catch (error) {
            Alert.alert(error.message)
        }

    },[])

    const getRandomProiflePic = useCallback(
        async () => {
            const response = await fetch('https://randomuser.me/api')
            const data = await response.json()
            return data.results[0].picture.large
        }
        ,[]) 

    return (
        <Formik
            initialValues={{ email: '', password: '', username: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
               onSignUp(values.email,values.password,values.username)
            }}
            validateOnMount={true}
        >
            {
                ({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                    <>
                        <View style={styles.formContainer}>

                            <TextInput
                                placeholder="Username"
                                autoCapitalize='none'
                                keyboardType="email-address"
                                autoFocus
                                placeholderTextColor="#444"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                selectTextOnFocus={true}
                                value={values.username}
                                style={[styles.input,
                                {
                                    borderColor:
                                        1 > values.username.length || values.username.length >= 2
                                            ? "#ccc"
                                            : "red"
                                }
                                ]}
                            />
                            {
                                errors.username && (
                                    <Text style={{ fontSize: 10, color: "red", alignSelf: "flex-start", marginBottom: 5 }}>
                                        {errors.username}*
                                    </Text>
                                )
                            }
                            <TextInput
                                placeholder="Email-Id"
                                autoCapitalize='none'
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                autoFocus
                                placeholderTextColor="#444"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                selectTextOnFocus={true}
                                value={values.email}
                                style={[styles.input,
                                {
                                    borderColor:
                                        values.email.length < 1 || Validator.validate(values.email)
                                            ? "#ccc"
                                            : "red"
                                }
                                ]}
                            />
                            {
                                errors.email && (
                                    <Text style={{ fontSize: 10, color: "red", alignSelf: "flex-start", marginBottom: 5 }}>
                                        {errors.email}*
                                    </Text>
                                )
                            }

                            <TextInput
                                name="imageUrl"
                                placeholder="Password"
                                placeholderTextColor="#444"
                                autoCapitalize='none'
                                secureTextEntry
                                autoCorrect={false}
                                textContentType="password"
                                autoFocus
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                selectTextOnFocus={true}
                                style={[styles.input,
                                {
                                    borderColor:
                                        1 > values.password.length || values.password.length >= 6
                                            ? "#ccc"
                                            : "red"
                                }
                                ]}
                            />
                            {
                                errors.password && (
                                    <Text style={{ fontSize: 10, color: "red", alignSelf: "flex-start" }}>
                                        {errors.password}*
                                    </Text>
                                )
                            }

                            <View style={styles.loginButton(isValid)}>
                                <Pressable titleSize={20} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>
                                        Sign Up
                                    </Text>
                                </Pressable>
                            </View>

                            <View style={styles.signUpContainer}>
                                <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                                    <Text>
                                        Already have an account?
                                        <Text style={{ color: "#6BB0f5" }}>
                                            {' '}Log In
                                        </Text>
                                    </Text>

                                </TouchableOpacity>
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
        color: "black"
    },
    loginButton: (isValid) => ({
        width: '100%',
        backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 42,
        borderRadius: 4,
        marginTop: 10

    }),
    buttonText: {
        fontWeight: '700',
        color: "white",
        fontSize: 18
    },
    signUpContainer: {
        marginTop: 10
    }

});

export default SignUpForm

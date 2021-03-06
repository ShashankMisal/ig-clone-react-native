import React,{useCallback} from 'react'
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'
import {firebase} from '../../firebase'

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string().required('Password is required').min(6, 'Your password should have at least 6 characters')
})



const LoginForm = ({ navigation }) => {

    const onLogin = useCallback(async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log("logged in firebase success")
        } catch (error) {
            Alert.alert(error.message)
        }

    }, [])


    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onLogin(values.email, values.password)
            }}
            validateOnMount={false}
        >
            {
                ({ handleBlur, handleChange, handleSubmit, values, errors, isValid,touched }) => (
                    <>
                        <View style={styles.formContainer}>

                            <TextInput
                                placeholder="Phone no , email or username"
                                autoCapitalize='none'
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                placeholderTextColor="#444"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
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
                                (errors.email && touched.email) ? (
                                    <Text style={{ fontSize: 10, color: "red", alignSelf: "flex-start", marginBottom: 5 }}>
                                        {errors.email}*
                                    </Text>
                                ):null
                            }

                            <TextInput
                                name="imageUrl"
                                placeholder="Password"
                                placeholderTextColor="#444"
                                autoCapitalize='none'
                                secureTextEntry
                                autoCorrect={false}
                                textContentType="password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
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
                                (errors.password && touched.password)?(
                                    <Text style={{ fontSize: 10, color: "red", alignSelf: "flex-start" }}>
                                        {errors.password}*
                                    </Text>
                                ):null
                            }

                            <View style={{ alignSelf: "flex-end", marginBottom: 30 }}>
                                <Text style={{ color: "#6BB0f5" }}>
                                    Forgot password?
                                </Text>
                            </View>

                            <View style={styles.loginButton(isValid)}>
                                <Pressable titleSize={20} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>
                                        Log In
                                    </Text>
                                </Pressable>
                            </View>

                            <View style={styles.signUpContainer}>
                                <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                                    <Text>
                                        Don't have an account?
                                        <Text style={{ color: "#6BB0f5" }}>
                                            {' '}Sign Up
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
        borderRadius: 4

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

export default LoginForm

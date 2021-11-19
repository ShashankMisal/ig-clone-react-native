import React from 'react'
import { View, Text, Image, TextInput, StyleSheet, Button, Pressable, TouchableOpacity } from 'react-native'
import * as Yup from 'yup'
import { Formik, Input } from 'formik'
import Validator from 'email-validator'

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string().required('Password is required').min(6, 'Your password should have at least 6 characters')
})

const LoginForm = () => {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values)
                // navigation.push('HomeScreen')
            }}
            validateOnMount
        >
            {
                ({ handleBlur, handleChange, handleSubmit, values, errors, isValid, dirty, touched }) => (
                    <>
                        <View style={styles.formContainer}>
                                
                            <TextInput
                                placeholder="Phone no , email or username"
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
                                      1 >  values.password.length || values.password.length >= 6
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
                                <TouchableOpacity>
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

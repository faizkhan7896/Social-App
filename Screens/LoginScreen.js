import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    StyleSheet,
    ScrollView
} from 'react-native';
import FormInput from '../Components/FormInput';
import FormButton from '../Components/FormButton';
import SocialButton from '../Components/SocialButton';
import { AuthContext } from '../Navigation/AuthProvider.android';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { login, googleLogin, fbLogin } = useContext(AuthContext);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('../Assets/design/logo.jpg')}
                style={styles.logo}
            />
            <Image
                source={require('../Assets/design/insta.png')}
                style={styles.logo2}
            />

            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>


            <FormButton
                buttonTitle="Log In"
                onPress={() => login(email, password)}
            />


            {Platform.OS === 'android' ? (
                <View>
                    <SocialButton
                        buttonTitle="Sign In with Facebook"
                        btnType="facebook"
                        color="#71b5f4"
                        // backgroundColor="#e6eaf4"
                        onPress={() => fbLogin()}
                    />

                    {/* <SocialButton
                        buttonTitle="Sign In with Google"
                        btnType="google"
                        color="#de4d41"
                        backgroundColor="#f5e7ea"
                        onPress={() => googleLogin()}
                    /> */}
                </View>

            ) : null}
            <Text style={{
                fontSize: 15,
                color: '#b5b1b1',
                fontWeight: "bold",
                marginTop: 10
            }}>OR</Text>


            <TouchableOpacity
                style={styles.signup}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.navButtonText}>Don't have an acount? </Text>
                <Text style={styles.forgotText}>Sign up.</Text>
            </TouchableOpacity>
            <Image
                source={require('../Assets/design/from.jpg')}
                style={styles.form}
            />
        </ScrollView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        backgroundColor: "#fff",
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',

    },
    form: {
        height: 120,
        width: 120,
        resizeMode: 'contain',

    },
    logo2: {
        height: 100,
        width: "40%",
        resizeMode: "contain",
        marginTop: -20,
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 15,
        marginLeft: 200,
        marginBottom: 30
    },
    signup: {
        marginVertical: 20,
        flexDirection: "row"
    },
    navButtonText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#b5b1b1',
        fontFamily: 'Lato-Regular',
    },
    forgotText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#2588e6',
        fontWeight: "bold"
    },
});
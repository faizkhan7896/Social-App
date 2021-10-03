import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import FormButton from '../Components/FormButton';
import { AuthContext } from '../Navigation/AuthProvider';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import firestore from '@react-native-firebase/firestore';
import PostCardprofile from '../Components/PostCardprofile';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import first from './Profililepic/first'
import Second from './Profililepic/Second'
import Third from './Profililepic/Third'
import Bookmark from './Profililepic/Bookmark'
import { color } from 'react-native-reanimated';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({ navigation, route }) => {
    const { user, logout } = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);
    const [userData, setUserData] = useState(null);

    const fetchPosts = async () => {
        try {
            const list = [];

            await firestore()
                .collection('posts')
                .where('userId', '==', route.params ? route.params.userId : user.uid)
                .orderBy('postTime', 'desc')
                .get()
                .then((querySnapshot) => {
                    // console.log('Total Posts: ', querySnapshot.size);

                    querySnapshot.forEach((doc) => {
                        const {
                            userId,
                            post,
                            postImg,
                            postTime,
                            likes,
                            comments,
                        } = doc.data();
                        list.push({
                            id: doc.id,
                            userId,
                            userName: 'Test Name',
                            userImg:
                                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                            postTime: postTime,
                            post,
                            postImg,
                            liked: false,
                            likes,
                            comments,
                        });
                    });
                });

            setPosts(list);

            if (loading) {
                setLoading(false);
            }

            console.log('Posts: ', posts);
        } catch (e) {
            console.log(e);
        }
    };


    const getUser = async () => {
        await firestore()
            .collection('users')
            .doc(route.params ? route.params.userId : user.uid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('User Data', documentSnapshot.data());
                    setUserData(documentSnapshot.data());
                }
            })
    }


    useEffect(() => {
        getUser();
        fetchPosts();
        navigation.addListener("focus", () => setLoading(!loading));
    }, [navigation, loading]);

    const handleDelete = () => { };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" />

            <ScrollView>
                <View >
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                marginRight: 60,
                                marginLeft: 20,

                            }}>
                            <Ionicons name="ios-chevron-back-circle-outline" size={25} color="#000" />
                        </TouchableOpacity>


                        <View style={{
                            height: 70,
                            backgroundColor: "#fff",
                            flexDirection: "row",
                            alignItems: 'center',
                            justifyContent: "space-between",
                            marginLeft: 20,

                        }}>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("Messages")}
                                style={{ marginRight: 20, }}>
                                <Image style={{ height: 30, width: 30, resizeMode: "contain" }} source={require("../Assets/aligncenter.png")} />
                                {/* <MaterialCommunityIcons name="menu-open" size={25} color="#000" /> */}
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    showsVerticalScrollIndicator={false}>
                    <LinearGradient
                        colors={['#bc2a8d', '#e95950', '#fccc63']}
                        style={{ padding: 3, borderRadius: 50 }}>
                        <Image
                            style={styles.userImg}
                            source={{ uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' }}
                        />
                    </LinearGradient>
                    <Text style={styles.userName}>{userData ? userData.fname || 'Test' : 'Test'} {userData ? userData.lname || 'User' : 'User'}</Text>
                    {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
                    <Text style={styles.aboutUser}>
                        {userData ? userData.about || 'No details added.' : ''}
                    </Text>

                    <View style={styles.userInfoWrapper}>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.userInfoTitle}>{posts.length}</Text>
                            <Text style={styles.userInfoSubTitle}>POSTS</Text>
                        </View>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.userInfoTitle}>10,000</Text>
                            <Text style={styles.userInfoSubTitle}>FOLLOWERS</Text>
                        </View>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.userInfoTitle}>100</Text>
                            <Text style={styles.userInfoSubTitle}>FOOLOWING</Text>
                        </View>
                    </View>
                    <View style={styles.userBtnWrapper}>
                        {route.params ? (
                            <>
                                <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
                                    <Text style={styles.userBtnTxt}>Message</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
                                    <Text style={styles.userBtnTxt}>Follow</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <View style={{
                                    alignItems: 'center', flexDirection: "row", width: "100%", backgroundColor: "#fff",
                                    height: 50, justifyContent: "space-evenly",
                                }}>
                                    <LinearGradient
                                        colors={['#bc2a8d', '#e95950', '#fccc63']}
                                        style={[styles.userBtn, {}]}>

                                        <TouchableOpacity
                                            onPress={() => { navigation.navigate('EditProfile'); }}
                                            style={{ flexDirection: "row", }}>
                                            <MaterialIcons name="person-add-alt-1" size={25} color="#fff" />
                                            <Text style={styles.userBtnTxt}>Follow</Text>
                                        </TouchableOpacity>

                                    </LinearGradient>

                                    <TouchableOpacity style={[styles.userBtn2, {
                                        justifyContent: 'center', alignItems: 'center', height: 55,
                                        flexDirection: "row", borderWidth: 3, borderRadius: 100, borderColor: "#f1f1f4"
                                    }]}>
                                        <MaterialIcons name="email" size={25} color="#000" />
                                        <Text style={{
                                            color: '#000',
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            alignItems: 'center',
                                            marginLeft: 7
                                        }}>Message</Text>
                                    </TouchableOpacity>

                                    {/* <TouchableOpacity
                                        style={styles.userBtn}
                                        onPress={() => logout()}>
                                        <Text style={styles.userBtnTxt}>Logout</Text>
                                    </TouchableOpacity> */}
                                </View>
                            </>
                        )}
                    </View>

                    {/* fetching a post */}

                    {/* {posts.map((item) => (
                    <PostCardprofile key={item.id} item={item} onDelete={handleDelete} />
                ))} */}


                </ScrollView>

                <Tab.Navigator
                    initialRouteName="first"
                    tabBarOptions={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        activeTintColor: '#000',
                        inactiveTintColor: "gray",
                        showIcon: true,
                        showLabel: false,
                        indicatorStyle: {
                            backgroundColor: "#fff"
                        }
                    }}>

                    <Tab.Screen
                        name="first"
                        component={first}
                        options={({ }) => ({
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons style={{ marginTop: -5, marginLeft: -10 }}
                                    name="grid-large" color={color} size={27} />
                            ),
                        })} />

                    <Tab.Screen
                        name="Second"
                        component={Second}
                        options={({ }) => ({
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons style={{ transform: [{ rotate: '90deg' }], marginLeft: -10 }}
                                    name="view-carousel" color={color} size={27} />
                            ),
                        })} />

                    <Tab.Screen
                        name="Third"
                        component={Third}
                        options={({ }) => ({
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons style={{ marginTop: -5, marginLeft: -10 }}
                                    name="camera-account" color={color} size={30} />
                            ),
                        })} />
                    <Tab.Screen
                        name="Bookmark"
                        component={Bookmark}
                        options={({ }) => ({
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons style={{ marginTop: -5, marginLeft: -10 }}
                                    name="bookmark" color={color} size={30} />
                            ),
                        })} />


                </Tab.Navigator>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -25,
    },
    userImg: {
        height: 100,
        width: 100,
        borderRadius: 75,
    },
    iconCOntainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userBtn: {
        height: 55,
        width: "40%",
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row"
    },
    userBtn2: {
        height: 35,
        width: "40%",
    },
    userBtnTxt: {
        color: '#fff',
        fontSize: 18,
        fontWeight: "bold",
        alignItems: 'center',
        marginLeft: 7
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    header: {
        height: 70,
        width: "100%",
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",


    },
    logo2: {
        height: 50,
        width: "40%",
        resizeMode: "contain",
        alignSelf: 'center',

    },
    igtv: {
        height: 30,
        width: "40%",
        resizeMode: "contain",
        marginRight: -100
    },
});
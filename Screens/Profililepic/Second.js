import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { AuthContext } from '../../Navigation/AuthProvider';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import firestore from '@react-native-firebase/firestore';
import PostCardprofile from '../../Components/PostCardprofile';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


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

            <ScrollView
                style={styles.container}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                showsVerticalScrollIndicator={false}>


                {posts.map((item) => (
                    <PostCardprofile key={item.id} item={item} onDelete={handleDelete} />
                ))}
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
    },
    userImg: {
        height: 100,
        width: 100,
        borderRadius: 75,
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
        height: 45,
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
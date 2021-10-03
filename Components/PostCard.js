

import React, { useContext, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    Container,
    Card,
    UserInfo,
    UserImg,
    UserName,
    UserInfoText,
    PostTime,
    PostText,
    PostImg,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Divider,
} from '../styles/FeedStyles';
import files from '../Assets/fileBase64'

import ProgressiveImage from './ProgressiveImage';
import LottieView from "lottie-react-native";
import lottie from '../Assets/lottie/44921-like-animation.json'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../Navigation/AuthProvider';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, Text, View } from 'react-native';
import Share from 'react-native-share';


const PostCard = ({ item, onDelete, onPress }) => {
    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);



    likeIcon = item.liked ? 'heart' : 'heart-outline';
    likeIconColor = item.liked ? '#2e64e5' : '#333';

    if (item.likes == 1) {
        likeText = '1 Like';
    } else if (item.likes > 1) {
        likeText = item.likes + ' Likes';
    } else {
        likeText = 'Like';
    }

    if (item.comments == 1) {
        commentText = '1 Comment';
    } else if (item.comments > 1) {
        commentText = item.comments + ' Comments';
    } else {
        commentText = 'Comment';
    }

    const myCustomShare = async () => {
        const shareOptions = {
            message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
            url: files.appLogo,
            // urls: [files.image1, files.image2]
        }

        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log(JSON.stringify(ShareResponse));
        } catch (error) {
            console.log('Error => ', error);
        }
    };

    const getUser = async () => {
        await firestore()
            .collection('users')
            .doc(item.userId)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('User Data', documentSnapshot.data());
                    setUserData(documentSnapshot.data());
                }
            });
    };

    useEffect(() => {
        getUser();
    }, []);


    const [likescount, setlikescount] = useState("")
    const [likes, setlikes] = useState(false)
    const [bookmark, setBookmark] = useState(false)
    const [Comments, setComments] = useState(0)
    const [likeskey, setlikeskey] = useState(0)



    const likeincrease = async () => {
        setlikescount(!likescount ? + "1" : "0")

    }

    const Commentsincrease = async () => {
        setComments(Comments + 1)

    }

    return (
        <Card key={item.id}>
            <UserInfo>
                <UserImg
                    source={{
                        uri: userData
                            ? userData.userImg ||
                            'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                            : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                    }}
                />
                <UserInfoText>

                    <TouchableOpacity onPress={onPress}>
                        <UserName>
                            {userData ? userData.fname || 'Test' : 'Test'}{' '}
                            {userData ? userData.lname || 'User' : 'User'}
                        </UserName>
                    </TouchableOpacity>

                    <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                </UserInfoText>
                <TouchableOpacity
                    style={{ marginLeft: 200, marginTop: 10 }} >
                    <Entypo name="dots-three-vertical" size={20} />
                </TouchableOpacity>

            </UserInfo>


            {item.postImg != null ? (
                <ProgressiveImage
                    defaultImageSource={require('../Assets/default-img.jpg')}
                    source={{ uri: item.postImg }}
                    style={{ width: '100%', height: 250 }}
                    resizeMode="cover"
                />
            ) : (
                <Divider />
            )}
            <InteractionWrapper>

                <View style={{ flexDirection: "row", alignItems: 'center', }}>
                    {/* <Interaction
                        onPress={() => likeincrease()}
                        active={item.liked}>
                        <Ionicons name={likeIcon} size={30} color={likeIconColor} />
                    </Interaction> */}
                    <Interaction
                        onPress={() => {
                            setlikes(!likes)
                            likeincrease()
                        }}
                        active={item.liked}>
                        <Ionicons name={likes ? "ios-heart" : "ios-heart-outline"} size={30}
                            color={likes ? "red" : "#000"} />
                    </Interaction>


                    <Interaction
                        onPress={() => Commentsincrease()}
                    >
                        <Ionicons name="md-chatbubble-outline" size={23} color="#000" />
                        {/* <InteractionText>{commentText}</InteractionText> */}
                    </Interaction>

                    <Interaction onPress={() => myCustomShare()}>
                        <Feather name="send" size={22} color="#000" />
                        {/* <InteractionText>Share</InteractionText> */}
                    </Interaction>
                </View>

                <Interaction onPress={() => {
                    setBookmark(!bookmark)
                    alert("your item has been saved")
                }}>
                    <Ionicons name={bookmark ? "ios-bookmark" : "ios-bookmark-outline"} size={25}

                        color={bookmark ? "#000" : "#000"} />
                </Interaction>

                {user.uid == item.userId ? (

                    <Interaction onPress={() => onDelete(item.id)}>
                        <LottieView
                            style={styles.deleteLottie}
                            source={require("../Assets/lottie/57979-delete.json")}
                            autoPlay
                        />
                    </Interaction>
                ) : null}

            </InteractionWrapper>
            <View style={{ marginBottom: 15 }}>
                <InteractionText style={{ marginTop: -10, fontSize: 17, marginLeft: 20, }}>{likescount} likes</InteractionText>

                <View style={{ flexDirection: "row" }}>
                    <UserName style={{ marginLeft: 20, marginRight: -10 }}>
                        {userData ? userData.fname || 'Test' : 'Test'}{' '}
                        {userData ? userData.lname || 'User' : 'User'}
                    </UserName>
                    <PostText>{item.post}</PostText>
                </View>

                <Text style={{ marginTop: -5, fontStyle: "italic", color: "#13579c" }}>  #Amazing #Travel #Instagram #Movies #Entertainment</Text>
                <Text style={{ fontStyle: "italic", color: "#13579c" }}>  #Nature #Shopping #Marketing </Text>
                <InteractionText style={{ fontSize: 15, marginLeft: 20, color: "#cfcfcf" }}>View all {Comments} Comments</InteractionText>
                <PostTime style={{ marginLeft: 20, fontSize: 15, color: "#cfcfcf" }}>{moment(item.postTime.toDate()).fromNow()}</PostTime>

            </View>
        </Card>
    );
};

export default PostCard;

const styles = StyleSheet.create({

    heart: {
        width: 20,
        height: 20,
        tintColor: "#6e7f8d",
    },
    heartFilled: {
        tintColor: "#df245e",
    },
    heartLottie: {
        width: 60,
        height: 60,
        marginTop: -8,
        marginRight: -26,
        marginLeft: -12
    },
    commentLottie: {
        width: 35,
        height: 35,
        marginTop: -2,
    },
    shareLottie: {
        width: 60,
        height: 60,
        marginTop: -7,
        marginRight: -10,
        marginLeft: -10
    },
    deleteLottie: {
        width: 20,
        height: 40,

    },
    textDate: {
        color: "#6e7f8d",
        fontSize: 14,
    },
    modal: {
        backgroundColor: "#cfcfcf",
        height: 400,
        width: "100%",
        marginTop: 320,
        borderRadius: 20

    },
});


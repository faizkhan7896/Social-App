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

import { AuthContext } from '../Navigation/AuthProvider';

import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet } from 'react-native';

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


    // const animation = React.useRef(null);
    // const isFirstRun = React.useRef(true);

    // React.useEffect(() => {
    //     if (isFirstRun.current) {
    //         if (isLiked) {
    //             animation.current.play(66, 66);
    //         } else {
    //             animation.current.play(19, 19);
    //         }
    //         isFirstRun.current = false;
    //     } else if (isLiked) {
    //         animation.current.play(19, 50);
    //     } else {
    //         animation.current.play(0, 19);
    //     }
    // }, [isLiked]);

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
            </UserInfo>
            <PostText>{item.post}</PostText>
            {/* {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : <Divider />} */}
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
                <Interaction active={item.liked}>
                    <LottieView
                        // ref={animation}
                        style={styles.heartLottie}
                        source={require("../Assets/lottie/44921-like-animation.json")}
                        autoPlay
                    />
                    <InteractionText active={item.liked}>{likeText}</InteractionText>
                </Interaction>
                <Interaction>
                    {/* <Ionicons name="md-chatbubble-outline" size={25} /> */}

                    <LottieView
                        // ref={animation}
                        style={styles.commentLottie}
                        source={require("../Assets/lottie/lf20_7LZWld.json")}
                        autoPlay
                    />
                    <InteractionText>{commentText}</InteractionText>
                </Interaction>
                <Interaction onPress={() => myCustomShare()}>
                    {/* <Feather name="send" size={23} /> */}
                    <LottieView
                        // ref={animation}
                        style={styles.shareLottie}
                        source={require("../Assets/lottie/2442-send.json")}
                        autoPlay
                    />
                    <InteractionText>Share</InteractionText>
                </Interaction>
                {user.uid == item.userId ? (
                    <Interaction onPress={() => onDelete(item.id)}>
                        <LottieView
                            // ref={animation}
                            style={styles.deleteLottie}
                            source={require("../Assets/lottie/57979-delete.json")}
                            autoPlay
                        />
                        {/* <Ionicons name="md-trash-bin" size={25} /> */}
                    </Interaction>
                ) : null}
            </InteractionWrapper>
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
        width: 40,
        height: 40,
        marginTop: -3
    },
    textDate: {
        color: "#6e7f8d",
        fontSize: 14,
    },
});

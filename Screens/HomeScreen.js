import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    FlatList,
    Alert,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native'

import PostCard from '../Components/PostCard'
// import { HomeContainer } from '../styles/FeedStyles'
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container } from '../styles/FeedStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Storys from '../Components/Storys'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';



const HomeScreen = ({ navigation }) => {

    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);

    const sheetRef = React.useRef(null);


    const fetchPosts = async () => {
        try {
            const list = [];

            await firestore()
                .collection('posts')
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

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        fetchPosts();
        setDeleted(false);
    }, [deleted]);

    const handleDelete = (postId) => {
        Alert.alert(
            'Delete post',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed!'),
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => deletePost(postId),
                },
            ],
            { cancelable: false },
        );
    };

    const deletePost = (postId) => {
        console.log('Current Post Id: ', postId);

        firestore()
            .collection('posts')
            .doc(postId)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    const { postImg } = documentSnapshot.data();

                    if (postImg != null) {
                        const storageRef = storage().refFromURL(postImg);
                        const imageRef = storage().ref(storageRef.fullPath);

                        imageRef
                            .delete()
                            .then(() => {
                                console.log(`${postImg} has been deleted successfully.`);
                                deleteFirestoreData(postId);
                            })
                            .catch((e) => {
                                console.log('Error while deleting the image. ', e);
                            });
                        // If the post image is not available
                    } else {
                        deleteFirestoreData(postId);
                    }
                }
            });
    };

    const deleteFirestoreData = (postId) => {
        firestore()
            .collection('posts')
            .doc(postId)
            .delete()
            .then(() => {
                Alert.alert(
                    'Post deleted!',
                    'Your post has been deleted successfully!',
                );
                // setDeleted(true);
            })
            .catch((e) => console.log('Error deleting posst.', e));
    };

    const ListHeader = () => {
        return null;
    };
    const renderContent = () => (
        <View
            style={{
                backgroundColor: "#ebebeb",
                height: 330,
            }}
        >
            <TouchableOpacity style={{ alignItems: 'center', marginTop: -15 }}>
                <MaterialIcons name="horizontal-rule" size={57} color="gray" />
            </TouchableOpacity>

            <View style={{ marginLeft: 20, marginTop: -47 }}>
                <TouchableOpacity
                    style={{ marginTop: 23 }}
                    onPress={() => alert("pressed")}>
                    <Text style={{ fontSize: 17, }}>Report...</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={{ marginTop: 23 }}
                    onPress={() => alert("pressed")}>
                    <Text style={{ fontSize: 17, }}>Not Interested</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={{ marginTop: 23 }}
                    onPress={() => alert("pressed")}>
                    <Text style={{ fontSize: 17, }}>Turn on Post Notification</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={{ marginTop: 23 }}
                    onPress={() => alert("pressed")}>
                    <Text style={{ fontSize: 17, }}>Copy Link</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginTop: 23 }}
                    onPress={() => alert("pressed")}>
                    <Text style={{ fontSize: 17, }}>Share to</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginTop: 23 }}
                    onPress={() => alert("pressed")}>
                    <Text style={{ fontSize: 17, }}>Unfollow</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginTop: 23 }}
                    onPress={() => alert("pressed")}>
                    <Text style={{ fontSize: 17, }}>Mute</Text>
                </TouchableOpacity>

            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" />

            {loading ? (
                <ScrollView
                    style={{ flex: 1, }}
                    contentContainerStyle={{ alignItems: 'center' }}>
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                                <View
                                    style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 30 }}>
                            <View style={{ width: 300, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }}
                            />
                            <View
                                style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }}
                            />
                        </View>
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                                <View
                                    style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 30 }}>
                            <View style={{ width: 300, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }}
                            />
                            <View
                                style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }}
                            />
                        </View>
                    </SkeletonPlaceholder>
                </ScrollView>
            ) : (
                <View>
                    <BottomSheet
                        ref={sheetRef}
                        snapPoints={[400, -5]}
                        borderRadius={10}
                        renderContent={renderContent}
                        // callbackNode={this.fall}
                        enabledGestureInteraction={true}
                    />
                    <View style={{ borderBottomWidth: 1, borderBottomColor: "#cfcfcf", }}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                // onPress={() => sheetRef.current.snapTo(0)}
                                onPress={() => navigation.navigate("AddPost")}
                                style={{
                                    marginRight: 60,
                                    marginLeft: 20,

                                }}>
                                <Feather name="camera" size={25} color="#000" />
                            </TouchableOpacity>
                            <Image
                                source={require('../Assets/design/insta.png')}
                                style={styles.logo2}
                            />

                            <View style={{
                                height: 70,
                                backgroundColor: "#fff",
                                flexDirection: "row",
                                alignItems: 'center',
                                justifyContent: "space-between",
                                marginLeft: 20,

                            }}>
                                <Image
                                    source={require('../Assets/design/IGTV-Logo.jpg')}
                                    style={styles.igtv}
                                />
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Messages")}
                                    style={{ marginRight: 20, }}>
                                    <Feather name="send" size={25} color="#000" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>


                    <View>

                        <ScrollView>
                            <Storys />
                            <FlatList
                                data={posts}
                                renderItem={({ item }) => (
                                    <PostCard
                                        item={item}
                                        onDelete={handleDelete}
                                        onPress={() =>
                                            navigation.navigate('HomeProfile', { userId: item.userId })
                                        }
                                    />
                                )}
                                keyExtractor={(item) => item.id}
                                ListHeaderComponent={ListHeader}
                                ListFooterComponent={ListHeader}
                                showsVerticalScrollIndicator={true}
                            />
                        </ScrollView>

                    </View>
                </View>
            )}
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
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

})


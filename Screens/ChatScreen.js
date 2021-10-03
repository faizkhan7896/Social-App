import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [modal, setmodal] = useState(false);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'Hello world',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>

                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{ marginBottom: 5, marginRight: 5 }}
                        size={32}
                        color="#2e64e5"
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5',
                    },
                    left: {
                        backgroundColor: '#fff',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                    left: {
                        color: '#000',
                    },
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={22} color='#333' />
        );
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });
    };

    return (
        <View style={{
            flex: 1,
            //  backgroundColor: "#000",
        }} >
            {/* <ImageBackground
                source={require('../Assets/BG.png')}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    position: 'absolute',
                }} /> */}


            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}

                renderInputToolbar={(props) => {
                    return <View style={{ flexDirection: "row", marginTop: 7, alignItems: 'center', }}>


                        <InputToolbar {...props}
                            containerStyle={{
                                borderRadius: 30, marginLeft: 20
                            }}
                            textInputStyle={{ color: "black", marginLeft: 35, marginBottom: 7 }}
                        />
                        <TouchableOpacity>
                            <FontAwesome5
                                style={{ marginLeft: 30, marginBottom: 15 }}
                                name='laugh-beam'
                                color='gray'
                                size={23}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setmodal(true)}
                            style={{ marginLeft: 210 }}>
                            <Entypo
                                style={{ marginLeft: 20, }}
                                name='attachment'
                                color='gray'
                                size={20}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => takePhotoFromCamera(true)}
                        >
                            <Fontisto
                                style={{ marginLeft: 20 }}
                                name='camera'
                                color='gray'
                                size={20}
                            />
                        </TouchableOpacity>

                    </View>


                }}

            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setmodal(false)
                }}
            >
                <View
                    animation="slideInUp"
                    style={[styles.modal, {}]}>


                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "70%", marginTop: 20, }}>
                        <TouchableOpacity >
                            <MaterialIcons name="file-copy" size={30} color="#fff" style={{ height: 60, width: 60, backgroundColor: "#6067cd", paddingLeft: 15, paddingTop: 16, borderRadius: 50 }} />
                            <Text style={{ marginTop: 8 }}>Document</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ alignItems: 'center', }}
                            onPress={() => clickImage(true)}>
                            <MaterialIcons name="photo-camera" size={30} color="#fff" style={{ height: 60, width: 60, backgroundColor: "#eb427a", paddingLeft: 15, paddingTop: 16, borderRadius: 50 }} />
                            <Text style={{ marginTop: 8 }}>Camera</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ alignItems: 'center', }}
                            onPress={() => pickImageAndUpload()}>
                            <MaterialIcons name="image" size={30} color="#fff" style={{ height: 60, width: 60, backgroundColor: "#c76dd5", paddingLeft: 15, paddingTop: 16, borderRadius: 50 }} />
                            <Text style={{ marginTop: 8 }}>Gallery</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "70%", marginTop: 30, }}>
                        <TouchableOpacity style={{ alignItems: 'center', }}>
                            <MaterialIcons name="headset" size={30} color="#fff" style={{ height: 60, width: 60, backgroundColor: "#fba018", paddingLeft: 15, paddingTop: 16, borderRadius: 50 }} />
                            <Text style={{ marginTop: 8 }}>Audio</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ height: 60, width: 60, backgroundColor: "#5cb2a1", paddingLeft: 13, paddingTop: 13, borderRadius: 50 }}>
                            <FontAwesome
                                style={{ backgroundColor: "#fff", height: 35, width: 35, paddingTop: 8, paddingLeft: 12, borderRadius: 20 }}
                                name="rupee"
                                color="#27d366"
                                size={20}
                            />
                            <Text style={{ marginTop: 20, width: "150%", marginLeft: -13 }}>Payment</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ alignItems: 'center', }}>
                            <MaterialIcons name="location-pin" size={30} color="#fff" style={{ height: 60, width: 60, backgroundColor: "#039b52", paddingLeft: 15, paddingTop: 16, borderRadius: 50 }} />
                            <Text style={{ marginTop: 8 }}>Location</Text>
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity style={{ marginRight: 180, marginTop: 20, alignItems: 'center', }}>
                        <MaterialIcons name="person" size={35} color="#fff" style={{ height: 60, width: 60, backgroundColor: "#09abf6", paddingLeft: 13, paddingTop: 11, borderRadius: 50 }} />
                        <Text style={{ marginTop: 8 }}>Contact</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => setmodal(false)}

                        style={{
                            backgroundColor: "#075e55", height: 40, width: 80,
                            justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginLeft: 230
                        }}
                    >
                        <Text style={{ color: "#fff" }}>Cancel</Text>

                    </TouchableOpacity>

                </View>

            </Modal>
        </View >



    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        backgroundColor: "#fff",
        height: 400,
        width: "85%",
        alignItems: 'center',
        marginTop: 320,
        alignSelf: 'center',
        borderRadius: 20

    },
    Modaltext: {
        color: "#000",
        textAlign: "center"
    },
});

import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
} from '../styles/MessageStyle';
import firestore from '@react-native-firebase/firestore';
import MessageInput from '../Components/MessageInput';

export default function MessagesScreen({ navigation, user }) {

    const [users, setUsers] = useState(null)
    const getUsers = async () => {
        const querySanp = await firestore().collection('users').get()
        const allusers = querySanp.docs.map(docSnap => docSnap.data())
        //  console.log(allusers)
        setUsers(allusers)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        // <View style={{ flex: 1, backgroundColor: "#fff", }}>
        //     <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", marginTop: 20 }}>Messages</Text>


        <Container>
            {/* <StatusBar backgroundColor='#fff' BarStyle='dark-content' /> */}

            <MessageInput
                // labelValue={email}
                // onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Search"
                iconType="search1"
                keyboardType="email-address"
                autoCapitalize="none"
                backgroundColor="#ebebeb"
                autoCorrect={false}
            />

            <FlatList
                data={users}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Card onPress={() => navigation.navigate('Chat', { userName: item.fname })}>
                        <UserInfo>
                            <UserImgWrapper>
                                <Image source={{ uri: item.userImg }} style={styles.img} />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName>{item.fname}</UserName>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", marginLeft: 3 }}>{item.lname}</Text>
                                </UserInfoText>
                                <MessageText>{item.email}</MessageText>
                                <PostTime>{item.about}</PostTime>

                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            />
        </Container>

        // </View>

    );
};



const styles = StyleSheet.create({
    img: { width: 60, height: 60, borderRadius: 30, backgroundColor: "green" },
    text: {
        fontSize: 18,
        marginLeft: 15,
    },
    mycard: {
        flexDirection: "row",
        margin: 3,
        padding: 4,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "white"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
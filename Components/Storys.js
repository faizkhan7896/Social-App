// import Boxproduct from "./Boxproduct";

import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, ScrollView, FlatList, TouchableOpacity, Statusbar } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { UserInfoText, } from '../styles/MessageStyle';
import LinearGradient from 'react-native-linear-gradient';


function sli({ navigation }) {
    // <Statusbar backgroundColor="#fff" />


    const [users, setUsers] = useState(null)
    const [userData, setUserData] = useState(null);

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
        <View>
            <FlatList
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={users}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        // onPress={() => navigation.navigate(item.link)}
                        style={{
                            height: 130, width: 90,
                            backgroundColor: '#fff', alignItems: "center",
                            justifyContent: "center", alignSelf: "center",
                        }}>
                        {/* <Image
                            style={{ height: 70, width: 115, resizeMode: "contain", borderRadius: 150, }}
                            source={{ uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' }}
                        />
                        <Text style={{ fontSize: 12, fontWeight: "bold", marginLeft: 3 }}>
                            {userData ? userData.fname || 'Test' : 'Test'} {userData ? userData.lname || 'User' : 'User'}</Text>
                        <Text>{route.params ? route.params.userId : user.uid}</Text> */}
                        <LinearGradient
                            colors={['#bc2a8d', '#e95950', '#fccc63']}
                            style={{ padding: 3, borderRadius: 50 }}>
                            <Image style={{ height: 70, width: 70, borderRadius: 150, borderColor: "#fff", borderWidth: 2 }}
                                source={{ uri: item.userImg }} />

                        </LinearGradient>

                        <UserInfoText>
                            <Text style={{ fontSize: 12, fontWeight: "bold", marginLeft: 3 }}>{item.fname}</Text>
                            <Text style={{ fontSize: 12, fontWeight: "bold", marginLeft: 3 }}>{item.lname}</Text>
                        </UserInfoText>

                        <Text>{item.id}</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    )


}
export default sli;

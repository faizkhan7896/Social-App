import React, { useEffect, useState, useContext } from 'react';
import { View, TouchableOpacity, Text, Image, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import HomeScreen from '../Screens/HomeScreen';
import ChatScreen from '../Screens/ChatScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import MessagesScreen from '../Screens/MessageScreen';
import EditProfileScreen from '../Screens/EditProfileScreen';
import SearchScreen from '../Screens/SearchScreen';
import notificationScreen from '../Screens/notificationScreen';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../Navigation/AuthProvider';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({ navigation }) => (




    <Stack.Navigator>
        <Stack.Screen
            name="RN Social"
            component={HomeScreen}
            options={{
                headerShown: false,
                // headerTitleAlign: 'center',
                // headerTitleStyle: {
                //     color: '#2e64e5',
                //     fontFamily: 'Kufam-SemiBoldItalic',
                //     fontSize: 18,
                // },
                // headerStyle: {
                //     shadowColor: '#fff',
                //     elevation: 0,
                // },
                // headerRight: () => (
                //     <View style={{ marginRight: 10 }}>
                //         <FontAwesome5.Button
                //             name="plus"
                //             size={22}
                //             backgroundColor="#fff"
                //             color="#2e64e5"
                //             onPress={() => navigation.navigate('AddPost')}
                //         />
                //     </View>
                // ),
            }}
        />

        <Stack.Screen
            name="AddPost"
            component={AddPostScreen}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#2e64e515',
                    shadowColor: '#2e64e515',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
        />
        <Stack.Screen
            name="HomeProfile"
            component={ProfileScreen}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
        />
        {/* message stack navigate nahi ho raha tha is liye homestack me daal diya  */}
        {/* <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({ title: route.params.userName, headerBackTitleVisible: false, })} /> */}


    </Stack.Navigator>
);

const MessageStack = ({ navigation, user }) => {

    return (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen name="Messages" component={MessagesScreen} options={{
                title: "Direct",
                headerLeft: () => (
                    <View style={{ marginRight: 10, flexDirection: "row" }}>
                        <Ionicons.Button name="ios-chevron-back-outline" size={30} backgroundColor="#fff" color="#000" />
                    </View>
                ),

                headerRight: () => (
                    <View style={{ marginRight: 10, flexDirection: "row" }}>
                        <Ionicons.Button name="ios-videocam-outline" size={32} backgroundColor="#fff" color="#000" />
                        <FontAwesome.Button style={{ marginTop: 4 }} name="edit" size={27} backgroundColor="#fff" color="#000" />
                    </View>
                ),
            }} />
            <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) =>
                ({ title: route.params.userName, headerBackTitleVisible: false, })} />
            {/* <Stack.Screen name="Chat" options={({ route }) => ({ title: route.params.name })}>
                {props => <ChatScreen {...props} user={user} />}
            </Stack.Screen> */}
        </Stack.Navigator>
    );
}
const ProfileStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
                headerTitle: 'Edit Profile',
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
            }}
        />
    </Stack.Navigator>
);

const AppStack = () => {
    const getTabBarVisibility = (route) => {
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : '';

        if (routeName === 'Chat') {
            return false;
        }
        return true;
    };

    const [users, setUsers] = useState(null)
    const [userData, setUserData] = useState(null);
    const { user, logout } = useContext(AuthContext);



    const getUsers = async () => {
        const querySanp = await firestore().collection('users').where('uid', '!=', user.uid).get()
        const allusers = querySanp.docs.map(docSnap => docSnap.data())
        //  console.log(allusers)
        setUsers(allusers)
    }

    useEffect(() => {
        getUsers()
    }, [])


    return (
        <Tab.Navigator
            initialRouteName="Home"
            // tabBarLabel={false}
            tabBarOptions={{
                activeTintColor: '#000',
                showLabel: false
            }}>

            <Tab.Screen
                name="Home"
                component={FeedStack}
                options={({ route }) => ({
                    // tabBarVisible: route.state && route.state.index === 0,
                    tabBarIcon: ({ color, size }) => (

                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={size}
                        />
                    ),

                })}
            />
            {/* <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    // tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="search" color={color} size={size} />
                    ),
                }}
            /> */}

            <Tab.Screen
                name="Messages"
                component={MessageStack}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="message" color={color} size={size} />
                    ),
                })}
            />
            <Tab.Screen
                name="AddPost"
                component={AddPostScreen}
                options={{
                    // tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <LinearGradient
                            colors={['#bc2a8d', '#e95950', '#fccc63']}
                            style={{ marginBottom: 20, borderRadius: 50, height: 55, width: 55, alignItems: 'center', justifyContent: 'center', }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderColor: "#fff", borderWidth: 2, borderRadius: 40, height: 50, width: 50 }}>
                                <Feather style={{}} name="plus" color="#fff" size={30} />

                            </View>
                        </LinearGradient>
                    ),
                }}
            />
            <Tab.Screen
                name="notification"
                component={notificationScreen}
                options={{
                    // tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="heart" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    // tabBarLabel: 'Home',
                    tabBarIcon: ({ }) => (
                        // <Image
                        //     source={require('../Assets/Users/user-3.jpg')}
                        //     style={{ height: 50,width: "40%",resizeMode: "contain",alignSelf: 'center',borderRadius: 140 }}
                        // />
                        <Image
                            style={{ height: 50, width: "40%", resizeMode: "contain", alignSelf: 'center', borderRadius: 140 }}
                            source={{ uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>

    );
};
export default AppStack;
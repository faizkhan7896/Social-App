import React, { useEffect, useState } from 'react'
import Routes from './Routes'
import { AuthProvider } from './AuthProvider'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet } from 'react-native';


const index = () => {


    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}

export default index



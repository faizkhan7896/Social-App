import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../Utils/Dimentions';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({
    buttonTitle,
    btnType,
    color,
    backgroundColor,
    ...rest
}) => {
    let bgColor = backgroundColor;
    return (
        <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: bgColor }]}
            {...rest}>
            <View style={styles.iconWrapper}>
                <FontAwesome name={btnType} style={styles.icon} size={22} color="#fff" />
            </View>
            <View style={styles.btnTxtWrapper}>
                <Text style={[styles.buttonText, { color: color }]}>{buttonTitle}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SocialButton;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '70%',
        height: windowHeight / 15,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 3,
    },
    iconWrapper: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#3796f0",
        borderRadius: 25,
        marginTop: 5
    },
    icon: {
        fontWeight: 'bold',
        marginTop: 5
    },
    btnTxtWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Lato-Regular',
    },
});

// import React from 'react';
// import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
// import { windowHeight, windowWidth } from '../Utils/Dimentions';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const SocialButton = ({
//     buttonTitle,
//     btnType,
//     color,
//     backgroundColor,
//     ...rest
// }) => {
//     let bgColor = backgroundColor;
//     return (
//         <TouchableOpacity
//             style={[styles.buttonContainer,
//                 //  { backgroundColor: bgColor }
//             ]}
//             {...rest}>
//             <View style={styles.iconWrapper}>
//                 <FontAwesome name={btnType} style={styles.icon} size={20} color="#fff" />
//             </View>
//             <View style={styles.btnTxtWrapper}>
//                 <Text style={[styles.buttonText, { color: "#71b5f4" }]}>{buttonTitle}</Text>
//             </View>
//         </TouchableOpacity>
//     );
// };

// export default SocialButton;

// const styles = StyleSheet.create({
    // buttonContainer: {
    //     marginTop: 10,
    //     width: '70%',
    //     height: windowHeight / 15,
    //     padding: 10,
    //     flexDirection: 'row',
    //     borderRadius: 3,
    // },
    // iconWrapper: {
    //     width: 25,
    //     height: 25,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: "#71b5f4",
    //     borderRadius: 25,
    //     marginTop: 5
    // },
    // icon: {
    //     fontWeight: 'bold',
    //     marginTop: 5
    // },
    // btnTxtWrapper: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // buttonText: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     fontFamily: 'Lato-Regular',
    // },
// });
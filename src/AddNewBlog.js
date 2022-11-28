import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler'
import { request, PERMISSIONS } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNewBlog = () => {

    const navigation = useNavigation();

    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageData, setImageData] = useState('');

    const checkPermission = async () => {
        request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
            // setPermissionResult(result)
            console.log(result)
            if (result == 'granted') {
                chooseImage();
            }
            else if (result == 'denied') {
                alert('Permission denied!');
            } else {
                alert('Something went wrong, Please try again!');
            }
        });
    }

    const chooseImage = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (result.didCancel) { }
        else {
            setImage(result.assets[0].uri);
            setImageData(result);
        }
        console.log(result);
    }

    const saveBlogBtn = async () => {
        if (imageData != '' && title && description) {
            const reference = storage().ref(`images/${imageData.assets[0].fileName}`);
            const pathToFile = imageData.assets[0].uri;
            await reference.putFile(pathToFile);
            const url = await storage().ref(`images/${imageData.assets[0].fileName}`).getDownloadURL();
            console.log("url: "+url);
            if (url != '') {
                saveBlog(url);
            }
        }
        else {
            alert('Validation error!');
        }
    }

    const saveBlog = async (photo) => {
        const email = await AsyncStorage.getItem('email');
        firestore()
            .collection('blogs')
            .add({
                title: title,
                description: description,
                photo: photo,
                email: email
            })
            .then(() => {
                console.log('blog added!');
                navigation.goBack();
            })
            .catch((e) => {
                alert(e);
            });
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            <TouchableOpacity onPress={() => checkPermission()}>
                {
                    image == '' ? <Image source={{ uri: 'https://spiritshot-acorex.com/wp-content/uploads/2022/10/AdobeStock_245163894.jpeg' }}
                        style={styles.blogImageStyle} /> :
                        <Image source={{ uri: image }}
                            style={styles.blogImageStyle} />
                }
                <Text style={styles.selectPicStyle}>Select Picture</Text>
            </TouchableOpacity>

            <TextInput
                value={title}
                onChangeText={(e) => setTitle(e)}
                placeholderTextColor='black'
                placeholder='Enter blog title'
                cursorColor='black'
                style={styles.inputStyle}
            />

            <TextInput
                value={description}
                onChangeText={(e) => setDescription(e)}
                placeholderTextColor='black'
                placeholder='Enter blog description'
                cursorColor='black'
                style={styles.inputStyle}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={saveBlogBtn}>
                <Text style={{ fontSize: 20, color: 'white' }}>Submit</Text>
            </TouchableOpacity>

        </View>
    )
}

export default AddNewBlog

const styles = StyleSheet.create({
    blogImageStyle: {
        borderRadius: 100,
        height: 120,
        width: 120,
        alignSelf: 'center',
        marginTop: 50
    },
    selectPicStyle: {
        alignSelf: 'center',
        color: 'black',
        marginBottom: 50
    },
    inputStyle: {
        borderWidth: 1,
        height: 50,
        width: '90%',
        borderRadius: 8,
        color: 'black',
        padding: 8,
        marginBottom: 12
    },
    submitBtn: {
        backgroundColor: 'black',
        padding: 12,
        width: '90%',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16
    }
});


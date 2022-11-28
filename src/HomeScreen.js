import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    firestore()
      .collection('blogs')
      .get()
      .then(querySnapshot => {
        console.log('Total blogs: ', querySnapshot.size);
        const tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          tempData.push(documentSnapshot.data());
        });
        setBlogs(tempData);
      });
  },[isFocused]);

  const signOut=async()=>{
    await AsyncStorage.clear();
    navigation.navigate('LoginScreen');
    console.log('logout');
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={blogs}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('ProductDetailsScreen',{productData:item})}>
              <View style={{ flexDirection: 'row', paddingBottom: 8, paddingTop: 8, marginLeft: 8, alignItems: 'center' }}>
                <Image source={{ uri: 'https://spiritshot-acorex.com/wp-content/uploads/2022/10/AdobeStock_245163894.jpeg' }}
                  style={styles.userImageStyle} />
                <Text style={{ color: 'black', fontWeight: '700', marginLeft: 8 }}>{item.email}</Text>
              </View>
              <Image source={{ uri: item.photo }}
                style={styles.imageStyle} />
              <Text style={{
                color: 'black', fontWeight: '600', fontSize: 18,
                paddingLeft: 8, paddingRight: 8
              }}>{item.title}</Text>
              <Text style={{
                color: 'grey', fontSize: 14, paddingLeft: 8, paddingRight: 8,
                paddingBottom: 8
              }}>{item.description}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity style={styles.blogStyle} onPress={() => navigation.navigate('AddNewBlog')}>
        <Text style={{ fontSize: 24, paddingRight: 8, color: 'white' }}>+</Text>
        <Text style={{ fontSize: 16, paddingLeft: 8, color: 'white' }}>Add Blog</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.blogStyle1} onPress={signOut}>
      <Text style={{ fontSize: 16, color: 'white' }}>SignOut</Text>
      </TouchableOpacity>

    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  imageStyle: {
    height: 230,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  userImageStyle: {
    borderRadius: 100,
    height: 35,
    width: 35
  },
  container: {
    flex: 1,
  },
  blogStyle: {
    position: 'absolute',
    height: 50,
    width: '35%',
    flexDirection: 'row',
    backgroundColor: 'purple',
    bottom: 16,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32
  },
  blogStyle1: {
    position: 'absolute',
    height: 50,
    width: '30%',
    flexDirection: 'row',
    backgroundColor: 'purple',
    bottom: 80,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32
  },
  card: {
    backgroundColor: '#EAE8E8',
    margin: 8,
    borderRadius: 8
  }
});


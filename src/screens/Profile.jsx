import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card';
import {getAPI} from '../utils/api/getAPI';
import {useState, useEffect} from 'react';

export default function Profile(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let postIds = [];

  const [userData, setUserData] = useState({
    userName: '',
    userEmail: '',
  });

  let userId;

  const setUserInfo = async () => {
    userId = await AsyncStorage.getItem('userId');
    const userName = await AsyncStorage.getItem('userName');
    const userEmail = await AsyncStorage.getItem('userEmail');
    setUserData({...userData, userName, userEmail});
  };


  const getPostsIdFromUserId = async () => {
    let response = await getAPI(`user/postIds?userId=${userId}`);
    console.log(response.data.message);
    if (response.status === 500) {
      ToastAndroid.show(
        'Some error occurred, Please try again later!',
        ToastAndroid.SHORT,
      );
    } else {
      postIds = response.data.message;
    }
  };


  const getPostById = async id => {
    let response = await getAPI(`post/getbyid?postId=${id}`);
    console.log(response);
    if (response.status === 500) {
      ToastAndroid.show(
        'Some error occurred, Please try again later!',
        ToastAndroid.SHORT,
      );
    } else {
      setPosts(prevPosts => [...prevPosts, ...response.data.message]);
    }
  };


  const renderPosts = ({item}) => {
    console.log(item);
    return (
      <View key={item._id} style={{marginBottom: 12}}>
        <Card navigation={props.navigation} data={item} />
      </View>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={{marginVertical: 16, alignItems: 'center'}}>
        <ActivityIndicator size="large" color="white" />
      </View>
    ) : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      await setUserInfo();
      await getPostsIdFromUserId();
      console.log(postIds.length);
      postIds.forEach(async function(id) {
        await getPostById(id);
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.userData}>
          <Image
            style={styles.profilePhoto}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_640.jpg',
            }}
          />
        </View>
        <Text style={styles.name}>{userData.userName}</Text>
        <Text style={styles.email}>{userData.userEmail}</Text>
        <View style={styles.btn}>
          <Pressable
            style={styles.updateBtn}
            onPress={() => props.navigation.navigate('home')}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '400',
                textAlign: 'center',
              }}>
              Update Profile
            </Text>
          </Pressable>
        </View>

        <View style={styles.posts}>
          <Text style={styles.postHeading}>Your Posts</Text>

          <View style={styles.userposts}>
            <FlatList
              data={posts}
              renderItem={renderPosts}
              keyExtractor={item => item._id.toString()}
              ListFooterComponent={renderLoader}
            />
          </View>
        </View>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 6,
  },
  userData: {
    position: 'relative',
    height: 150,
    backgroundColor: '#047857',
    borderRadius: 15,
  },
  profilePhoto: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 999,
    borderColor: 'white',
    borderWidth: 4,
    left: '50%',
    bottom: '0%',
    transform: [{translateX: -50}, {translateY: 50}],
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 55,
  },
  email: {
    color: '#f3f4f6',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  btn: {
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateBtn: {
    paddingHorizontal: 30,
    backgroundColor: '#047857',
    paddingVertical: 10,
    color: '#f1f5f9',
    borderRadius: 9999,
  },
  posts: {
    width: '100%',
  },
  postHeading: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 44,
    paddingBottom: 20,
  },
  userposts: {
    gap: 12,
  },
});

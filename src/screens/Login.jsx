import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  ToastAndroid,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleIcon from './../assets/google.png';
import {useState} from 'react';
import {postAPI} from '../utils/api/postAPI';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Login(props) {
  const [loginClicked, setLoginClicked] = useState(false);
  const [showIncorrectPassword, setShowIncorrectPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    name: '',
    email: '',
  });

  const login = async () => {
    setShowIncorrectPassword(false);
    setLoginClicked(true);
    if (loginData.email && loginData.password) {
      let response = await postAPI('user/login', loginData);
      if (response.status === 200) {
        await AsyncStorage.setItem('userId', response.data.userId);
        await AsyncStorage.setItem('userName', response.data.userName);
        await AsyncStorage.setItem('userEmail', response.data.userEmail);
        props.navigation.navigate('home');
      } else if (response.status === 404) {
        ToastAndroid.show('Create an account first', ToastAndroid.SHORT);
      } else if (response.status === 401) {
        setShowIncorrectPassword(true);
      } else if (response.status === 500) {
        ToastAndroid.show(
          'Some error occurred, Please try again later!',
          ToastAndroid.SHORT,
        );
      }
      setLoginClicked(false);
    } else {
      ToastAndroid.show('Please fill all the details', ToastAndroid.SHORT);
      setLoginClicked(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginSection}>
        <View style={styles.headerSection}>
          <Text style={styles.heading}>Welcome Back</Text>
          <Text style={styles.subHeading}>Enter your details below</Text>
          <View style={styles.inputBoxes}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#f1f5f9"
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={text => setLoginData({...loginData, email: text})}
            />
            <View style={{width: '90%', alignItems: 'center', gap: 2}}>
              <TextInput
                style={[styles.input, {width: '100%'}]}
                placeholderTextColor="#f1f5f9"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text =>
                  setLoginData({...loginData, password: text})
                }
              />
              {showIncorrectPassword && (
                <Text
                  style={{color: 'red', fontSize: 12, alignSelf: 'flex-start'}}>
                  *Incorrect Password
                </Text>
              )}
            </View>
            <Pressable
              style={
                loginClicked
                  ? [styles.loginBtn, {backgroundColor: '#0c4a6e'}]
                  : styles.loginBtn
              }
              onPress={() => {
                if (!loginClicked) {
                  login();
                }
              }}>
              {loginClicked && (
                <ActivityIndicator size="small" color="white" />
              )}
              <Text style={{color: 'white', fontSize: 16}}>Sign In</Text>
            </Pressable>
            <Text style={{color: '#9ca3af'}}>
              Don't have an account?{' '}
              <Text
                style={{color: '#0284c7', textDecorationLine: 'underline'}}
                onPress={() => props.navigation.navigate('signup')}>
                Create an account
              </Text>
            </Text>
            <Text style={{color: '#9ca3af'}}>OR</Text>
            <Pressable
              style={styles.googleBtn}
              onPress={() => props.navigation.navigate('home')}>
              <Image style={styles.image} source={GoogleIcon} />
              <Text style={{color: 'white', fontSize: 16}}>
                Continue With Google
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#111827',
    position: 'relative',
    flex: 1,
  },
  loginSection: {
    position: 'absolute',
    width: screenWidth,
    backgroundColor: '#1f2937',
    bottom: 0,
    paddingBottom: 28,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerSection: {
    marginTop: 24,
    gap: 8,
  },
  heading: {
    textAlign: 'center',
    fontSize: 28,
    color: 'white',
    fontWeight: '600',
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 12,
    color: '#f1f5f9',
    fontWeight: '500',
  },
  inputBoxes: {
    marginTop: 20,
    gap: 16,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    color: '#f1f5f9',
    backgroundColor: '#111827',
    fontSize: 16,
    width: '90%',
    borderColor: '#6b7280',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  loginBtn: {
    width: '90%',
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: '#075985',
    color: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  image: {
    height: 18,
    width: 18,
  },
  googleBtn: {
    flexDirection: 'row',
    gap: 12,
    width: '90%',
    borderRadius: 5,
    paddingVertical: 10,
    // backgroundColor: '#075985',
    borderWidth: 2,
    borderColor: '#075985',
    color: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  Pressable,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {useState} from 'react';
import GoogleIcon from './../assets/google.png';
import {postAPI} from '../utils/api/postAPI';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function SignUp(props) {
  const [emailErrorMsg, setEmailErrorMsg] = useState(false);
  const [signUpClicked, setSignUpClicked] = useState(false);

  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const signup = async () => {
    setEmailErrorMsg(false);
    setSignUpClicked(true);
    try {
      if (signUpData.email && signUpData.password && signUpData.name) {
        let response = await postAPI('user/signup', signUpData);
        if (response.status === 200) {
          props.navigation.navigate('login');
        } else if (response.status === 400) {
          setEmailErrorMsg(true);
        } else if (response.status === 500) {
          ToastAndroid.show(
            'Some error occurred, Please try again later!',
            ToastAndroid.SHORT,
          );
        }
        setSignUpClicked(false);
      } else {
        ToastAndroid.show('Please fill all the details', ToastAndroid.SHORT);
        setSignUpClicked(false);
      }
    } catch (error) {
      setSignUpClicked(false);
      console.log(error);
      ToastAndroid.show(
        'Some error occurred, Please try again later!',
        ToastAndroid.SHORT,
      );
    }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginSection}>
        <View style={styles.headerSection}>
          <Text style={styles.heading}>Create An Account</Text>
          <Text style={styles.subHeading}>Enter your details below</Text>
          <View style={styles.inputBoxes}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#f1f5f9"
              placeholder="Name"
              value={signUpData.name}
              onChangeText={text => setSignUpData({...signUpData, name: text})}
            />
            <View style={{width: '90%', alignItems: 'center', gap: 2}}>
              <TextInput
                style={[styles.input, {width: '100%'}]}
                placeholderTextColor="#f1f5f9"
                placeholder="Email"
                keyboardType="email-address"
                value={signUpData.email}
                onChangeText={text =>
                  setSignUpData({...signUpData, email: text})
                }
              />
              {emailErrorMsg && (
                <Text
                  style={{color: 'red', fontSize: 12, alignSelf: 'flex-start'}}>
                  *This email has already been taken
                </Text>
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholderTextColor="#f1f5f9"
              placeholder="Password"
              secureTextEntry={true}
              value={signUpData.password}
              onChangeText={text =>
                setSignUpData({...signUpData, password: text})
              }
            />
            <Pressable
              style={
                signUpClicked
                  ? [styles.signupBtn, {backgroundColor: '#0c4a6e'}]
                  : styles.signupBtn
              }
              onPress={() => {
                if (!signUpClicked) {
                  signup();
                }
              }}>
              {signUpClicked && (
                <ActivityIndicator size="small" color="white" />
              )}
              <Text style={{color: 'white', fontSize: 16}}>Sign Up</Text>
            </Pressable>
            <Text style={{color: '#9ca3af'}}>
              Already have an account?{' '}
              <Text
                style={{color: '#0284c7', textDecorationLine: 'underline'}}
                onPress={() => props.navigation.navigate('login')}>
                Sign In
              </Text>
            </Text>
            <Text style={{color: '#9ca3af'}}>OR</Text>
            <Pressable style={styles.googleBtn} onPress={() => signup()}>
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
  signupBtn: {
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

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useState} from 'react';
import {postAPI} from '../utils/api/postAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { uploadImageToCloudinary } from '../utils/helper/uploadImageToCloudinary';

const AddPost = () => {
  const [postData, setPostData] = useState({
    userId: '',
    userName: '',
    description: '',
    landmark: '',
    location: '',
    travelDate: '',
    image: '',
  });

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setPostData({...postData, travelDate: formattedDate});
      setShowDate(true);
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showLocation, setShowLocation] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showLandmark, setshowLandmark] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const setUserInfo = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const userName = await AsyncStorage.getItem('userName');
    setPostData({...postData, userId, userName});
  };

  const submitPost = async () => {
    if (
      postData.description === '' ||
      (showLocation && postData.location === '') ||
      (showLandmark && postData.landmark === '') ||
      (showImage && postData.image === '') ||
      (showDate && postData.travelDate === '')
    ) {
      ToastAndroid.show('Please fill all the details', ToastAndroid.SHORT);
      return;
    }
    if (isSubmitting === true) {
      return;
    }
    setIsSubmitting(true);
    let imageURI = await uploadImageToCloudinary(postData.image);
    setPostData((prevData) => ({ ...prevData, image: imageURI }));
    let response = await postAPI('post/add', postData);
    if (response.status === 200) {
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      setIsSubmitting(false);
    } else if (response.status === 500) {
      ToastAndroid.show(
        'Some error occurred, Please try again later!',
        ToastAndroid.SHORT,
      );
      setIsSubmitting(false);
    }
  };

  const selectImage = async () => {
    await launchImageLibrary(
      {
        title: 'Select Image',
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo',
        chooseFromLibraryButtonTitle: 'Choose from Library',
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 800,
        maxHeight: 600,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // Update the image state with the selected image URI
          console.log(response.assets[0].uri);
          setPostData({...postData, image: response.assets[0].uri});
        }
      },
    );
  };

 

  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <ScrollView style={{backgroundColor: '#111827', flex: 1}}>
      <View style={styles.nav}>
        <Text style={styles.navHeading}>Post</Text>
        <Pressable
          style={[
            styles.logoutBtn,
            {
              gap: 6,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            },
          ]}>
          {isSubmitting && <ActivityIndicator size="small" color="white" />}
          <Text style={{color: '#f1f5f9', fontSize: 14}} onPress={submitPost}>
            Submit
          </Text>
        </Pressable>
      </View>

      <View style={{padding: 12}}>
        <Text style={styles.postHeading}>Your Experience</Text>
        <View style={styles.formFields}>
          <TextInput
            style={styles.input}
            multiline
            editable
            numberOfLines={8}
            placeholder="Write your thoughts..."
            placeholderTextColor="#f1f5f9"
            textAlignVertical="top"
            onChangeText={text => setPostData({...postData, description: text})}
          />
          {showDate && (
            <View style={styles.textContainer}>
              <View style={styles.iconContainerLeft}>
                <Icon
                  name="calendar"
                  size={20}
                  color="white"
                  backgroundColor="transparent"
                />
              </View>
              <TextInput
                style={styles.smallInput}
                placeholder="Date"
                placeholderTextColor="#f1f5f9"
                value={postData.travelDate}
                editable={false}
                onChangeText={text =>
                  setPostData({...postData, travelDate: text})
                }
              />
              <Pressable
                style={styles.iconContainerRight}
                onPress={() => {
                  setShowDate(false);
                  setPostData({...postData, travelDate: ''});
                }}>
                <Icon
                  name="x"
                  size={20}
                  color="white"
                  backgroundColor="transparent"
                />
              </Pressable>
            </View>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          {showLocation && (
            <View style={styles.textContainer}>
              <View style={styles.iconContainerLeft}>
                <Icon
                  name="globe"
                  size={20}
                  color="white"
                  backgroundColor="transparent"
                />
              </View>
              <TextInput
                style={styles.smallInput}
                placeholder="Location"
                placeholderTextColor="#f1f5f9"
                onChangeText={text =>
                  setPostData({...postData, location: text})
                }
              />
              <Pressable
                style={styles.iconContainerRight}
                onPress={() => {
                  setShowLocation(false);
                  setPostData({...postData, location: ''});
                }}>
                <Icon
                  name="x"
                  size={20}
                  color="white"
                  backgroundColor="transparent"
                />
              </Pressable>
            </View>
          )}

          {showLandmark && (
            <View style={styles.textContainer}>
              <View style={styles.iconContainerLeft}>
                <Icon
                  name="map"
                  size={20}
                  color="white"
                  backgroundColor="transparent"
                />
              </View>
              <TextInput
                style={styles.smallInput}
                placeholder="Landmark"
                placeholderTextColor="#f1f5f9"
                onChangeText={text =>
                  setPostData({...postData, landmark: text})
                }
              />
              <Pressable
                style={styles.iconContainerRight}
                onPress={() => {
                  setshowLandmark(false);
                  setPostData({...postData, landmark: ''});
                }}>
                <Icon
                  name="x"
                  size={20}
                  color="white"
                  backgroundColor="transparent"
                />
              </Pressable>
            </View>
          )}

          {showImage && (
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: postData.image,
                }}
                resizeMode="contain"
              />
              <Pressable
                style={{position: 'absolute', top: 0, right: 0, margin: 8}}
                onPress={() => {
                  setShowImage(false);
                  setPostData({...postData, image: ''});
                }}>
                <Icon
                  name="x"
                  size={20}
                  color="white"
                  backgroundColor="transparent"
                />
              </Pressable>
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 40,
            gap: 16,
            flexWrap: 'wrap',
          }}>
          {!showDate && (
            <Pressable
              style={styles.buttons}
              onPress={() => {
                setShowDatePicker(true);
              }}>
              <Icon name="plus" size={18} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                Date
              </Text>
            </Pressable>
          )}
          {!showLocation && (
            <Pressable
              style={styles.buttons}
              onPress={() => setShowLocation(true)}>
              <Icon name="plus" size={18} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                Location
              </Text>
            </Pressable>
          )}
          {!showLandmark && (
            <Pressable
              style={styles.buttons}
              onPress={() => setshowLandmark(true)}>
              <Icon name="plus" size={18} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                Landmark
              </Text>
            </Pressable>
          )}
          {!showImage && (
            <Pressable
              style={styles.buttons}
              onPress={async () => {
                await selectImage();
                setShowImage(true);
              }}>
              <Icon name="plus" size={18} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                Image
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    color: '#f1f5f9',
    backgroundColor: '#111827',
    fontSize: 14,
    width: '100%',
    borderColor: '#6b7280',
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    position: 'relative',
  },
  buttons: {
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    flexDirection: 'row',
    backgroundColor: '#047857',
    paddingVertical: 10,
    color: '#f1f5f9',
    borderRadius: 9999,
  },
  postHeading: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 20,
  },
  formFields: {
    gap: 12,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  smallInput: {
    color: '#f1f5f9',
    backgroundColor: '#111827',
    fontSize: 14,
    flex: 1,
    borderColor: '#6b7280',
    borderWidth: 1,
    padding: 12,
    position: 'relative',
  },
  iconContainerLeft: {
    width: 45,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6b7280',
    height: '100%',
  },
  iconContainerRight: {
    width: 45,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6b7280',
    height: '100%',
  },
  nav: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#111827',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  logoutBtn: {
    borderRadius: 9999,
    paddingHorizontal: 20,
    backgroundColor: '#047857',
    color: '#f1f5f9',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navHeading: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  imgContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030712',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default AddPost;

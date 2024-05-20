import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {formatDate} from '../utils/helper/formatDate';

export default function Card({navigation, data}) {
  return (
    <View style={styles.container}>
      {data.image !== '' && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: data.image,
            }}
            resizeMode="contain"
          />
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.profile}>
          <View style={styles.profilePicture}>
            <Image
              style={styles.profileImage}
              source={{
                uri: 'https://th.bing.com/th/id/OIP.NqY3rNMnx2NXYo3KJfg43gHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
              }}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{data.userName}</Text>
            <Text style={styles.postDate}>{formatDate(data.date)}</Text>
          </View>
        </View>
        <Text style={styles.text}>{data.description}</Text>
        {(data.travelDate != '' ||
          data.location != '' ||
          data.landmark != '') && (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 20,
              marginTop: 20,
            }}>
            {data.travelDate !== '' && (
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <FontAwesome6
                  name="calendar-day"
                  size={18}
                  color="#10b981"
                  backgroundColor="transparent"
                />
                <Text style={{color: '#d1d5db'}}>{data.travelDate}</Text>
              </View>
            )}
            {data.location !== '' && (
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <FontAwesome6
                  name="location-dot"
                  size={18}
                  color="#ef4444"
                  backgroundColor="transparent"
                />
                <Text style={{color: '#d1d5db'}}>{data.location}</Text>
              </View>
            )}
            {data.landmark !== '' && (
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <FontAwesome6
                  name="location-crosshairs"
                  size={18}
                  color="#3b82f6"
                  backgroundColor="transparent"
                />
                <Text style={{color: '#d1d5db'}}>{data.landmark}</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.dividerLine}></View>
        {/* <View
          style={styles.comments}
          onPress={() => navigation.navigate('comments')}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#f1f5f9"
            placeholder="Write comment..."
          />
          <Pressable>
            <View style={styles.arrowBtn}>
              <Icon
                name="arrow-up"
                size={20}
                color="white"
                backgroundColor="transparent"
              />
            </View>
          </Pressable>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f2937',
  },
  imageContainer: {
    height: 200,
    backgroundColor: '#030712',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  dividerLine: {
    height: 1,
    marginVertical: 12,
    borderRadius: 2000,
    backgroundColor: '#6b7280',
  },
  text: {
    color: '#f1f5f9',
    marginHorizontal: 'auto',
    paddingTop: 12,
  },
  profile: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
  },
  profilePicture: {
    width: 45,
    height: 45,
    backgroundColor: 'green',
    borderRadius: 9999,
  },
  profileInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  profileName: {
    color: '#f1f5f9',
    fontWeight: '600',
  },
  postDate: {
    color: '#f1f5f9',
    fontSize: 12,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 9999,
  },
  loc: {
    color: 'red',
  },
  comments: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    color: '#f1f5f9',
    backgroundColor: '#1f2937',
    fontSize: 14,
    flex: 1,
    borderColor: '#1f2937',
    borderTopWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  commentBtn: {
    backgroundColor: '#1f2937',
    color: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBtn: {
    backgroundColor: '#111827',
    padding: 8,
    borderRadius: 999,
    marginRight: 0,
  },
});

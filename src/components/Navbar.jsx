import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navbar({navigation}) {
  return (
    <View style={styles.nav}>
      <Pressable onPress={() => navigation.navigate('profile')}>
        <Image
          style={styles.profileImage}
          source={{
            uri: 'https://th.bing.com/th/id/OIP.NqY3rNMnx2NXYo3KJfg43gHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
          }}
        />
      </Pressable>
      {/* <TextInput
        style={styles.input}
        placeholderTextColor="#f1f5f9"
        placeholder="Search..."
      /> */}
      <View style={styles.btnContainer}>
        <Pressable
          style={styles.addBtn}
          onPress={() => navigation.navigate('addpost')}>
          <Icon name="plus" size={18} color="white" />
        </Pressable>
        <Pressable
          style={styles.logoutBtn}
          onPress={async () =>{ 
            await AsyncStorage.removeItem("userId");
            await AsyncStorage.removeItem("userName");
            await AsyncStorage.removeItem("userEmail");
            navigation.navigate('login');}}>
          <Text style={{color: '#f1f5f9', fontSize: 14}}>Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    backgroundColor: '#111827',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    color: '#f1f5f9',
    marginHorizontal: 8,
    backgroundColor: '#111827',
    fontSize: 14,
    borderColor: '#6b7280',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 9999,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  logoutBtn: {
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#075985',
    color: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    borderRadius: 9999,
    backgroundColor: '#047857',
    width: 36,
    height: 36,
    color: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

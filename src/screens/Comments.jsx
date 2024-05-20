import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
} from 'react-native';
import CommentCard from '../components/CommentCard';
import Icon from 'react-native-vector-icons/Feather';

export default function Comments() {
  return (
    <View style={{flex: 1, backgroundColor: '#111827'}}>
      <View style={styles.nav}>
        <Text style={styles.navHeading}>Comments</Text>
      </View>
      <ScrollView
        style={{flex: 1, backgroundColor: '#111827', marginBottom: 52}}>
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </ScrollView>
      <View style={styles.comments}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#f1f5f9"
          placeholder="Write comment..."
        />
        <Pressable style={styles.commentBtn}>
          <View style={styles.arrowBtn}>
            <Icon
              name="arrow-up"
              size={20}
              color="white"
              backgroundColor="transparent"
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  comments: {
    position: 'absolute',
    bottom: 0,
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
    paddingHorizontal: 12,
    paddingVertical: 12,
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
    marginRight: 8,
  },
  nav: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  navHeading: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

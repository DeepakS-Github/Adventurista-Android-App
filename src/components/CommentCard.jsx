import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function CommentCard() {
  return (
    <View style={styles.userCommentContainer}>
      <View style={styles.profile}>
        <View style={styles.profilePicture}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://th.bing.com/th/id/OIP.NqY3rNMnx2NXYo3KJfg43gHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            }}
          />
        </View>
        <Text style={styles.profileName}>Deepak</Text>
        <Text style={styles.postDate}>July 10, 2023</Text>
      </View>
      <View style={styles.commentContainer}>
        <Text style={styles.commentTxt}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userCommentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 2
  },
  profilePicture: {
    width: 35,
    height: 35,
    backgroundColor: 'green',
    borderRadius: 9999,
  },
  profileName: {
    color: '#f1f5f9',
    fontWeight: '600',
    fontSize: 14,
  },
  postDate: {
    color: '#f1f5f9',
    fontSize: 10,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 9999,
  },
  commentContainer: {
    marginLeft: 47
  },
  commentTxt: {
    color: '#cbd5e1',
  },
});

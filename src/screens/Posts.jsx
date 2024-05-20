import {
  StyleSheet,
  View,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import {useEffect, useState} from 'react';
import {getAPI} from '../utils/api/getAPI';


export default function Home(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPosts = async page => {
    console.log(page);
    if (!hasMoreData) {
      return;
    }
    setIsLoading(true);
    let response = await getAPI(`post/getpage?page=${page}`);
    console.log(response);
    if (response.status === 500) {
      ToastAndroid.show(
        'Some error occurred, Please try again later!',
        ToastAndroid.SHORT,
      );
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }
    setIsLoading(false);
    if (response.data.message.length === 0) {
      setHasMoreData(false);
    }
    setPosts(prevPosts => [...prevPosts, ...response.data.message]);
    console.log(posts);
    setIsRefreshing(false);
  };

  const renderPosts = ({item}) => {
    console.log(item);
    return (
      <View key={item._id} style={{marginBottom: 12}}>
        <Card navigation={props.navigation} data={item}/>
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

  const loadMorePosts = () => {
    setCurrentPage(currentPage + 1);
  };

  const onRefresh = () => {
    setCurrentPage(1);
    setHasMoreData(true);
    setIsRefreshing(true);
    setPosts([]);
  };

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  return (
    <View style={{backgroundColor: '#111827', flex: 1}}>
      <Navbar navigation={props.navigation} />
      <FlatList
        data={posts}
        renderItem={renderPosts}
        keyExtractor={(item) => item._id.toString()}
        ListFooterComponent={renderLoader}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

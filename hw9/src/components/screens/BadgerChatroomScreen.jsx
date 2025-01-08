import { StyleSheet, Text, View , ScrollView,FlatList} from "react-native";
import { useEffect, useState } from 'react';
import BadgerChatMessage from '../helper/BadgerChatMessage';

function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const getAllMessages = () => {
        fetch(`https://cs571.org/rest/f24/hw6/messages?chatroom=${props.name}`, {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => {
            setMessages(data.messages);
        })

    }

    const handleRefresh = () => {
        setIsRefreshing(true);
        getAllMessages();
        setIsRefreshing(false);
    }

    useEffect(() => {
        getAllMessages();
    },[]);

    console.log(messages);

    return (
    <FlatList
      data={messages} // data source
      // item is each element in the data source
      renderItem={({ item }) => (
        <BadgerChatMessage message={item} />
      )} // 渲染每一条消息
      keyExtractor={(item) => item.id.toString()} // 提供唯一的 key
      refreshing={isRefreshing} // 控制刷新状态的布尔值(是否在刷新)
      onRefresh={handleRefresh} // 下拉触发的函数
    />
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerChatroomScreen;
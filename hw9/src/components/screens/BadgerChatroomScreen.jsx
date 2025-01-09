import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import BadgerChatMessage from "../helper/BadgerChatMessage";

function BadgerChatroomScreen(props) {
  const [messages, setMessages] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const getAllMessages = () => {
    fetch(`https://cs571.org/rest/f24/hw6/messages?chatroom=${props.name}`, {
      method: "GET",
      headers: {
        "X-CS571-ID":
          "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setMessages(data.messages);
      });
  };

  const handleCreatePost = () => {
    fetch(`https://cs571.org/rest/f24/hw6/messages?chatroom=${props.name}`, {
      method: "POST",
      headers: {
        "X-CS571-ID":
          "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: body,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log("updateMessage " + data);
        setIsModalVisible(false);

        Alert.alert("Successfully Posted", "Successfully Posted", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        getAllMessages();
        setTitle("");
        setBody("");
      });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    getAllMessages();
    setIsRefreshing(false);
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  useEffect(() => {
    if (title.length > 0 && body.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [title, body]);

  console.log(messages);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages} // data source
        // item is each element in the data source
        renderItem={({ item }) => <BadgerChatMessage message={item} />}
        keyExtractor={(item) => item.id.toString()} // 提供唯一的 key
        refreshing={isRefreshing} // showing the refresh sign
        onRefresh={handleRefresh} // the function that will be called when pull down
      />
      <Pressable
        style={styles.postButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.postButtonText}>ADD POST</Text>
      </Pressable>

      {/* create a Modal to post a message： onRequestClose={() => setIsModalVisible(false)}是返回键的时候推出Modal*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        {/* this layer making the backgrounder color is grey */}
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Create a Post</Text>

            <View>
              <Text style={styles.modalText}>Title</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
              ></TextInput>
            </View>

            <View>
              <Text style={styles.modalText}>Body</Text>
              <TextInput
                style={{ ...styles.input, height: 100 }}
                multiline={true}
                numberOfLines={4}
                value={body}
                onChangeText={(text) => setBody(text)}
              ></TextInput>
            </View>

            <View style={styles.buttonsContainer}>
              <Pressable
                style={
                  isDisabled
                    ? {
                        ...styles.button,
                        backgroundColor: "#D3D3D3",
                        width: 170,
                      }
                    : {
                        ...styles.button,
                        backgroundColor: "#B10F33",
                        width: 170,
                      }
                }
                disabled={isDisabled}
                onPress={handleCreatePost}
              >
                <Text
                  style={
                    isDisabled
                      ? { ...styles.modalText, color: "grey", fontSize: 22 }
                      : { ...styles.modalText, color: "white", fontSize: 22 }
                  }
                >
                  CREATE POST
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setIsModalVisible(false)}
                style={{ ...styles.button }}
              >
                <Text
                  style={{ ...styles.modalText, color: "white", fontSize: 22 }}
                >
                  CANCEL
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    gap: 10,
  },
  postButton: {
    display: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#B10F33",
    height: 80,
  },
  postButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
  },
  overlay: {
    // this is used to make the background dark
    flex: 1, // 覆盖整个屏幕
    backgroundColor: "rgba(0, 0, 0, 0.6)", // 半透明暗灰色
    justifyContent: "center", // 垂直居中
    alignItems: "center", // 水平居中
    zIndex: 100, // 使得这个view在最上层
  },
  modalContainer: {
    display: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    width: 350,
    borderRadius: 20,
    gap: 15,
  },
  modalText: {
    fontSize: 30,
    fontWeight: "600",
  },
  input: {
    width: 280,
    height: 45,
    padding: 5,
    borderWidth: 1.5,
    borderColor: "black",
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
    backgroundColor: "#9E9E9E",
    borderRadius: 8,
  },
});

export default BadgerChatroomScreen;

import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


import CS571 from '@cs571/mobile-client'
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';


const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    fetch("https://cs571.org/rest/f24/hw6/chatrooms",{
      method: "GET",
      headers: {
        "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
      }
    }).then(response => {
      if(response.ok){
        return response.json();
      }
    }).then(data => {
      console.log("chatrooms "+data);
      setChatrooms(data);
    })
  }, []);

  function handleLogin(username, pin) {
    console.log(username, pin);
        fetch("https://cs571.org/rest/f24/hw6/login", {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                 "pin": pin
            })
        }).then(response => {
            if(response.ok){
                return response.json();
            }
            if(response.status === 401){
                Alert.alert("That username or pin is incorrect!");
                return; // 防止后续代码继续执行
            }
            throw new Error(`Unexpected response status: ${response.status}`); // 处理其他错误
        }).then(data => {
          if (data) {
            console.log("login", data);
            setIsLoggedIn(true);
            
          }
        }).catch(err => {
          console.error("Error during login:", err);
          Alert.alert("Login failed. Please try again later.");
        });
  }

  

  function handleSignup(username, pin) {
    // hmm... maybe this is helpful!
    setIsLoggedIn(true); // I should really do a fetch to register first!
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          {/* // this is a static way to create the landing screen */}
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            // this is a dynamic way to create the chatroom screens
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} />}
              </ChatDrawer.Screen>
            })
          }
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} />
  }
}
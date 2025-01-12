import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import CS571 from "@cs571/mobile-client";
import * as SecureStore from "expo-secure-store";
import BadgerChatroomScreen from "./screens/BadgerChatroomScreen";
import BadgerRegisterScreen from "./screens/BadgerRegisterScreen";
import BadgerLoginScreen from "./screens/BadgerLoginScreen";
import BadgerLandingScreen from "./screens/BadgerLandingScreen";
import BadgerLogoutScreen from "./screens/BadgerLogoutScreen";
import BadgerSignupScreen from "./screens/BadgerSignupScreen";

const ChatDrawer = createDrawerNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    fetch("https://cs571.org/rest/f24/hw6/chatrooms", {
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
        setChatrooms(data);
      });
  }, []);

  function handleLogin(username, pin) {
    console.log(username, pin);
    fetch("https://cs571.org/rest/f24/hw6/login", {
      method: "POST",
      headers: {
        "X-CS571-ID":
          "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        pin: pin,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          const cookies = response.headers.get("set-cookie");
          console.log(cookies); // 输出服务器返回的 Cookies
          if (cookies) {
            // 从 Cookies 中解析 JWT
            const jwt = getCookieValue(cookies, "badgerchat_auth"); // 假设 JWT 名为 'jwt'
            if (jwt) {
              // 存储 JWT 到 SecureStore
              await SecureStore.setItemAsync("JWT", jwt);
              console.log("JWT successfully stored in SecureStore.");
              setIsLoggedIn(true); // 更新登录状态
              return response.json();
            } else {
              console.error("JWT not found in Cookies.");
              Alert.alert("Login failed. Please try again.");
            }
          }
        }
        if (response.status === 401) {
          Alert.alert("That username or pin is incorrect!");
          return; // 防止后续代码继续执行
        }
        throw new Error(`Unexpected response status: ${response.status}`); // 处理其他错误
      })
      .then((data) => {
        if (data) {
          console.log("login");
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
        Alert.alert("Login failed. Please try again later.");
      });
  }

  function handleSignup(username, pin) {
    // hmm... maybe this is helpful!
    setIsLoggedIn(true); // I should really do a fetch to register first!
  }

  function getCookieValue(cookieString, name) {
    // 使用正则表达式匹配指定的 Cookie 名称及其值
    const match = cookieString.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    // 如果匹配成功，返回解码后的值；否则返回 null
    return match ? decodeURIComponent(match[1]) : null;
  }

  if (isLoggedIn || isGuest) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          {/* // this is a static way to create the landing screen */}
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            // this is a dynamic way to create the chatroom screens
            chatrooms.map((chatroom) => {
              return (
                <ChatDrawer.Screen key={chatroom} name={chatroom}>
                  {(props) => (
                    <BadgerChatroomScreen name={chatroom} isGuest={isGuest} />
                  )}
                </ChatDrawer.Screen>
              );
            })
          }
          {isLoggedIn && (
            <ChatDrawer.Screen name="Logout">
              {(props) => <BadgerLogoutScreen setIsLoggedIn={setIsLoggedIn} />}
            </ChatDrawer.Screen>
          )}
          {isGuest && (
            <ChatDrawer.Screen name="Signup">
              {(props) => <BadgerSignupScreen setIsGuest={setIsGuest} />}
            </ChatDrawer.Screen>
          )}
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return (
      <BadgerRegisterScreen
        handleSignup={handleSignup}
        setIsRegistering={setIsRegistering}
      />
    );
  } else {
    return (
      <BadgerLoginScreen
        handleLogin={handleLogin}
        setIsRegistering={setIsRegistering}
        setIsGuest={setIsGuest}
      />
    );
  }
}

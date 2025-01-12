import { Text, StyleSheet,Pressable, Alert } from "react-native";
import BadgerCard from "./BadgerCard"
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

function BadgerChatMessage(props) {
    const [isAbleDelete, setIsAbleDelete] = useState(false);
    
    const dt = new Date(props.message.created);

    useEffect(() => {
        
            fetch("https://cs571.org/rest/f24/hw6/whoami",{
                method: "GET",
                headers: {
                    "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
                }
            }).then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error(`Unexpected response status: ${response.status}`);
            }).then(data => { 
                if(props.message.poster === data.user.username){
                    setIsAbleDelete(true);
                }
    
            })
        
    },[])

    function deletePost() {
        console.log(props.message.id);
        fetch(`https://cs571.org/rest/f24/hw6/messages?id=${props.message.id}`, {
            method: "DELETE",
            headers: {
                "X-CS571-ID":"bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
            }
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }else(
                console.log(res.status)
            )
        }).then((data) => {
            console.log(data);
            Alert.alert("Delete successfully!");
            props.getAllMessages();
        })
    }

    return <BadgerCard style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}>
        <Text style={{fontSize: 28, fontWeight: 600}}>{props.message.title}</Text>
        <Text style={{fontSize: 12}}>by {props.message.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
        <Text></Text>
        <Text>{props.message.content}</Text>
        {isAbleDelete &&
            <Pressable
                style={styles.button}
                onPress={deletePost}
                >
                <Text
                style={styles.buttonText} 
                >
                    DELETE POST
                </Text>
            </Pressable>}   
    </BadgerCard>
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "rgb(220, 53, 69)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 5,
        height: 40,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
})

export default BadgerChatMessage;

import { useState} from "react";
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

function BadgerLoginScreen(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <View style={styles.inputForm}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} value={userName} onChangeText={(text) => setUserName(text)}></TextInput>
        </View>
        <View style={styles.inputForm}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)}></TextInput>
        </View>
        <Pressable style={styles.button} onPress={() => props.handleLogin(userName, password)}>
            <Text style={{color: "white", fontSize:20, fontWeight: '500'}}>LOGIN</Text>
        </Pressable>
        {/* <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} /> */}

        <View style={styles.buttonsContainer}>
            <Pressable style={{...styles.button, backgroundColor: 'grey'}} onPress={() => props.setIsRegistering(true)}>
                <Text style={{color: "white", fontSize:15, fontWeight: '500'}}>SIGNUP</Text>
            </Pressable>
            <Pressable style={{...styles.button, width:200, backgroundColor: 'grey'}}>
            <Text style={{color: "white", fontSize:15, fontWeight: '500'}}>CONTINUE AS GUEST</Text>
            </Pressable>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
  
    inputForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label:{
        fontSize: 20,
    },
    input:{
        width: 240,
        height: 40,
        padding: 5,
        borderWidth: 1.5,
        borderColor: 'black'
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 40,
        backgroundColor:"#B10F33",
        borderRadius: 8,
    },

    buttonsContainer: {
        flexDirection: 'row',
        gap:10
    }
});

export default BadgerLoginScreen;


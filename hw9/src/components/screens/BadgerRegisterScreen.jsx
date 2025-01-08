import { useState, useEffect} from "react";
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

function BadgerRegisterScreen(props) {
    const [userName, setUserName] = useState('');
    const [pin, setPin] = useState('');
    const [confirmedPin, setConfirmedPin] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    // if (userName.length > 0 && pin.length > 0 && confirmedPin.length > 0) {
    //     setIsDisabled(false);
    // } write this directly will cause Too many re-renders
    useEffect(() => {
        // 更新 isDisabled 的状态
        if (userName.length > 0 && pin.length > 0 && confirmedPin.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [userName, pin, confirmedPin]); // 仅在这些值发生变化时执行


    //  "Please enter a pin" when a pin is missing, 
    //  "pins do not match" when the pins do not match, 
    //  "a pin must be 7 digits" when it is not exactly 7 digits. T
    //  if the username is already taken, inform the user.
    const handleSignUp = () => {
        if (pin.length === 0) {
            Alert.alert("Please enter a pin");
        }else if (pin.length !== 7) {
            Alert.alert("a pin must be 7 digits");
        }else if (pin !== confirmedPin) {
            Alert.alert("pins do not match");
        }else{
            fetch("https://cs571.org/rest/f24/hw6/register", {
                method: "POST",
                headers: {
                    "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": userName,
                    "pin": pin
                })
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                if(response.status === 409){
                    Alert.alert("username is already taken");
                }
            }).then(data => {
                console.log('register '+data);
                props.setIsRegistering(false);
            })
        }

    }

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
       
        <View style={styles.inputForm}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} value={userName} onChangeText={(text) => setUserName(text)}></TextInput>
        </View>
        <View style={styles.inputForm}>
            <Text style={styles.label}>PIN</Text>
            <TextInput style={styles.input} value={pin} onChangeText={(text) => setPin(text)}></TextInput>
        </View>
        <View style={styles.inputForm}>
            <Text style={styles.label}>Confirmed PIN</Text>
            <TextInput style={styles.input} secureTextEntry={true} value={confirmedPin} onChangeText={(text) => setConfirmedPin(text)}></TextInput>
        </View>

        {pin.length === 0 ? <Text style={{color: 'red',fontSize: 16}}>Please enter a pin.</Text> : null}
      
        <View style={styles.buttonsContainer}>
            <Pressable style={isDisabled ? {...styles.button, backgroundColor: '#D3D3D3'} : {...styles.button}} disabled={isDisabled} onPress={handleSignUp}>
                <Text style={isDisabled ? {color: "#708090", fontSize:15, fontWeight: '500'} : {color: "white", fontSize:15, fontWeight: '500'}}>SIGNUP</Text>
            </Pressable>
            <Pressable style={{...styles.button, width:120, backgroundColor: 'grey'}}>
                <Text style={{color: "white", fontSize:15, fontWeight: '500'}}>NEVER MIND</Text>
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

export default BadgerRegisterScreen;
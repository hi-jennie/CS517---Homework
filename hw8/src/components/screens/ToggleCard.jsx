import { View, Switch, Text,StyleSheet } from "react-native";
import PrefContext from "../context/PrefContext";
import { useContext } from "react";


function ToggleCard(props) {
    const {prefs, setPrefs} = useContext(PrefContext);

    // const handleToggle = () => {
    //     const newPrefs = {...prefs};
    //     newPrefs[props.tag] = !newPrefs[props.tag];
    //     setPrefs(newPrefs);
    // }

    // better way to update state
    const handleToggle = () => {
        setPrefs(prev => ({
            ...prev,
            [props.tag]: !prev[props.tag],
        }));
    };

    return (
    <View style={styles.container}>
        { prefs[props.tag] ? <Text style={styles.text}>Currently showing {props.tag} articles.</Text> :
        <Text style={styles.text}>Currently NOT showing {props.tag} articles.</Text> }
        
        <Switch
            // 当 valued 为 true 时，滑块处于活动状态， false 时处于非活动状态
            value={prefs[props.tag]}
            onValueChange={handleToggle}
            thumbColor={prefs[props.tag] ? "white" : "#f4f3f4"} // 滑块颜色
            trackColor={{ false: "#767577", true: "black" }} // 轨道颜色
        ></Switch>
    </View>)
}

export default ToggleCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundColor:"white",
        padding: 10,
        width: "100%",
        borderRadius: 15,
    },
    text: {
        fontSize: 15
    }
});
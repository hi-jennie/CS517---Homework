import { Pressable, StyleSheet, View } from "react-native";

export default function BadgerCard(props) {
    return <Pressable onPress={props.onPress} onLongPress={props.onLongPress}>
        {/* this is a good way to override style */}
        <View style={[styles.card, props.style]}>
            {/* in this place, props.children is all the component embedded in the BadgerCard */}
            {props.children}
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    }
})
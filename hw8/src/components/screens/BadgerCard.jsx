import { Pressable, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import NewsStack from "../navigation/NewsStack";


function BadgerCard(props) {

    const navigation = useNavigation();

    const handlePress = () => {
        console.log("Pressed");
        navigation.navigate('details', {article: props.article});
    }

    return <Pressable style={styles.cardContainer}  onPress={handlePress}>
        <Text style={styles.cardText}>{props.article.title}</Text>
        <Image source={{uri: `https://raw.githubusercontent.com/CS571-F24/hw8-api-static-content/main/${props.article.img}`}} style={{width: 350, height: 300, }} />
    </Pressable>
}

export default BadgerCard;

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        gap: 10, 
        margin: 10,
        backgroundColor:'white',
        borderRadius: 10,
    },

    cardText:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    }
});
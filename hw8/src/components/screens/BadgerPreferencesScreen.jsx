import { useEffect,useState, useContext } from "react";
import { Text, View, StyleSheet} from "react-native";
import PrefContext from "../context/PrefContext";
import ToggleCard from "./ToggleCard";

function BadgerPreferencesScreen(props) {
    const [tags, setTags] = useState([]);
    const {prefs, setPrefs} = useContext(PrefContext);

    const getAllTags = () => {
        fetch("https://cs571.org/rest/f24/hw8/articles", {
            headers: {
                "X-CS571-ID":
                "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
            }
        }).then((response) => {
            console.log("Response status pref:", response.status); 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); 
        })
        .then((data) => {
            // pay attention that we can't use setFunction inside a loop
            // or else it will cause a re-render for each iteration
            const newTags = [...tags];
            const newPrefs = {...prefs};
            console.log(data);
            for(let article of data){
                for(let tag of article.tags){
                    if(!newTags.includes(tag)){
                        newTags.push(tag);
                    }
                    if(!newPrefs[tag]){
                        newPrefs[tag] = true;
                    }
                }
            }
            
            setTags(newTags);
            setPrefs(newPrefs);

        })
    }

    useEffect(() => {
        getAllTags();
    }, []);
    console.log(tags);
    console.log(prefs);
    return <View style={styles.container}>
        { tags.length > 0 ? tags.map((tag) => {
            return <ToggleCard key={tag} tag={tag}></ToggleCard>
        }) : <Text>Loading...</Text> }
    </View>
}

export default BadgerPreferencesScreen;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        padding: 10
    } 
});
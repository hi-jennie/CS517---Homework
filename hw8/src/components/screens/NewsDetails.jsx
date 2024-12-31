import { Text,StyleSheet, Animated, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import React, { use, useState,useEffect } from "react";
import { Image } from "react-native";
function NewsDetails({ route }) {
    const  { article } = route.params;
    const [details, setDetails] = useState();
    const [fadeAnim] = useState(new Animated.Value(0));

    function fetchFullArticle () {
        fetch(`https://cs571.org/rest/f24/hw8/article?id=${article.fullArticleId}`, {
            headers: {
                "X-CS571-ID":
                "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
            }
        }).then((response) => {
            console.log("Response status:", response.status); 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); 
        })
        .then((data) => {
            setDetails(data);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start();
        })
    }

    useEffect(() => {
        fetchFullArticle();
    },[]);
    
    console.log("rendering details");
    

  return (
    <>
    {
        details ? <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image source = {{uri: `https://raw.githubusercontent.com/CS571-F24/hw8-api-static-content/main/${details.img}`}} style={{width: 390, height: 300, }}/>
            <Text style={styles.header}>{details.title}</Text>
            <Text style={styles.author}>By {details.author} on {details.posted}</Text>
            <Text style={{...styles.author, color: "blue"}} onPress={() => Linking.openURL(`${styles.url}`)}>Read full article here</Text>
            { details.body.map((p, index) => {
                return <Text key={index} style={styles.body}>{p}</Text>
            })}
    
        </ScrollView>
        </Animated.View> : 
        <Text style={styles.loading}>The context is loading...</Text>
    }
    </>
  );
}

export default NewsDetails;

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
    },

    scrollContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 10,
    },

    header: {
        fontSize: 25,
        textAlign: 'left',
        fontWeight: '700',
        padding: 15
    },
    author : {
        fontSize: 22,
        textAlign: 'left',
        padding: 15,
        fontWeight: '600'
    },
    body : {
        fontSize: 20,
        textAlign: 'left',
        padding: 15,
        fontWeight: '500'

    }, 

    loading: {
        fontSize: 20,
        textAlign: 'center',
        padding: 15,
        fontWeight: '700'
    }
 });
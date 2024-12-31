import { Text,StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import React, { use, useState,useEffect } from "react";
import { Image } from "react-native";
function NewsDetails({ route }) {
    const  { article } = route.params;
    const [details, setDetails] = useState();

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
        })
    }

    useEffect(() => {
        fetchFullArticle();
    },[]);
    
    console.log("rendering details");
    

  return (
    <>
    {
        details ? <ScrollView contentContainerStyle={styles.container}>
            <Image source = {{uri: `https://raw.githubusercontent.com/CS571-F24/hw8-api-static-content/main/${details.img}`}} style={{width: 390, height: 300, }}/>
            <Text style={styles.header}>{details.title}</Text>
            <Text style={styles.author}>By {details.author} on {details.posted}</Text>
            { details.body.map((p, index) => {
                return <Text key={index} style={styles.body}>{p}</Text>
            })}
    
        </ScrollView> : 
        <Text>Loading...</Text>
    }
    </>
  );
}

export default NewsDetails;

const styles = StyleSheet.create({ 
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        borderRadius: 10
    },

    header: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: '700',
        padding: 5
    },
    author : {
        fontSize: 18,
        textAlign: 'left',
        padding: 5,
        fontWeight: '600'
    },
    body : {
        fontSize: 18,
        textAlign: 'left',
        padding: 5,
        fontWeight: '500'

    }
 });
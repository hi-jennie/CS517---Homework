import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import BadgerCard from "./BadgerCard";

function BadgerNewsScreen(props) {

    const [articles, setArticles] = useState();

    function fetchArticle() {
        fetch("https://cs571.org/rest/f24/hw8/articles", {
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
            console.log(data);
            setArticles(data);
        })
    }

    useEffect(() => {
        fetchArticle();
    },[]);

    console.log(articles);
    

    return <ScrollView>
        { articles ? articles.map((article) => {
            return <BadgerCard key={article.id} article={article} />
        }): <Text>Loading...</Text>} 
        <Text>End of Articles</Text>
    </ScrollView>
}

export default BadgerNewsScreen;
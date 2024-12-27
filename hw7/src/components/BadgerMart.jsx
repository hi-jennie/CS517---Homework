import { ScrollView, Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

import CS571 from '@cs571/mobile-client'
import { useEffect, useState } from "react";

export default function BadgerMart(props) {

    const [items,setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [cart, setCart] = useState([]);

    const handlePrev = (p) => {
        if(p > 1){
            setPage(p - 1);
        }
    }

    const handleNext = (p) => {
        if(p < items.length){
            setPage(p + 1);
        }
    }

    let curItem = items[page - 1];

    function fetchItems () {
        fetch("https://cs571.org/rest/f24/hw7/items", {
            headers: {
                "X-CS571-ID": "bid_6fdf3569a0589bf7a2ad2e4065b73b940a57be11eaf482cbc41b9c16c9fc7e75"
            }
        }).then((response) => response.json())
        .then((data) => {
            setItems(data);
        })
    }

    useEffect(() => {
        fetchItems();
    },[]);
    console.log(items);

    return <View style={{backgroundColor: '#f8f8f8', flexDirection:'column', alignItems: 'center', width: 500, height: 760,padding:30}}>
            <Text style={{fontSize: 25}}>Welcome to Badger Mart!</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin:10 }}>
                    <TouchableOpacity 
                        style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginRight: 10 }}
                        onPress={() => handlePrev(page)}
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>PREVIOUS</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginLeft: 10 }}
                        onPress={() => handleNext(page)}
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>NEXT</Text>
                    </TouchableOpacity>
                </View>                  
            <BadgerSaleItem item={curItem} cart = {cart} setCart={setCart}/>          
    </View>
}

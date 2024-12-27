import { Text, View, Image,TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
export default function BadgerSaleItem(props) {
    const [order, setOrder] = useState(0);

    const [totalItem, setTotalItem] = useState(getTotalItemNum(props.cart));
    const [totalPrice, setTotalPrice] = useState(getTotalPrice(props.cart));

    function addOrder(){
        if(order < props.item.upperLimit){
            setOrder(prev => prev + 1);
        }
    }
   
    function removeOrder(){
        if(order > 0){
            setOrder(prev => prev - 1);
        }
    }
    

    function addToCart() {      
        const cartItems = [...props.cart];
        console.log(cartItems);
        const existingItem = cartItems.find((item) => item.name === props.item.name);
        if(existingItem){
            existingItem.quantity += order;
        }else{
            cartItems.push({ name: props.item.name, quantity: order, price: props.item.price });
        }

        props.setCart(cartItems);

        Alert.alert(
            "Order Confirmed", 
            `Your order contains ${order} items and would have cost $${(order * props.item.price).toFixed(2)}`,
            [
              {
                text: "Ok",
                onPress: () => {
                  // after the user clicks ok, execute the following code
                  setTotalItem(getTotalItemNum(cartItems));
                  setTotalPrice(getTotalPrice(cartItems));
                }
              }
            ]
          );
    }

    
    

    function getTotalPrice(cart) {
        let sum = 0;
        for(let item of cart){
            sum += Number(item.quantity) * Number(item.price);
        }
        return sum.toFixed(2);
    }
    
    function getTotalItemNum(cart){
        let sum = 0;
        for(let item of cart){
            sum += Number(item.quantity);
        }
        return sum;
    }

    useEffect(() => {
        setOrder(0);
    }, [props.item]);

    return <View >
        {
            props.item === undefined ? <Text>Item not found</Text> : 
            <View style={styles.outerContainer}>
                <Image source={{ uri: props.item.imgSrc }} style={{width: 200, height: 400}} resizeMode="contain" />       
                <View style={{flexDirection:'column', alignItems: 'center'}}>
                    <Text style={{fontSize: 30, margin:5}}>{props.item.name}</Text>
                    <Text style={styles.text}>$ {props.item.price.toFixed(2)} each</Text>
                    <Text style={styles.text}>You can order up to {props.item.upperLimit} units</Text>
                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity 
                        style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginRight: 10 }}
                        onPress={removeOrder}
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>-</Text>
                    </TouchableOpacity>
                    
                    <Text style={{ fontSize: 20 }}>{order}</Text>
                    
                    <TouchableOpacity 
                        style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginLeft: 10 }}
                        onPress={addOrder}
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>+</Text>
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.text}>You have {totalItem} items(s) costing ${totalPrice} in your cart</Text>
                <TouchableOpacity 
                        style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginLeft: 10 }}
                        onPress={addToCart}
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>PLACE ORDER</Text>
                    </TouchableOpacity>
            </View>
        }
        
    </View>
}


const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: '#f8f8f8', 
        flexDirection:'column', 
        alignItems: 'center'
    },
    text:{
        fontSize: 15, 
        margin:5
    }
});
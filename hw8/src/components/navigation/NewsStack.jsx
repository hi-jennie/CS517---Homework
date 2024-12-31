import { createStackNavigator } from "@react-navigation/stack";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import NewsDetails from "../screens/NewsDetails";
function NewsStack(props) {
    const Stack = createStackNavigator();
    return <Stack.Navigator>
        <Stack.Screen name="News" component={BadgerNewsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="details" component={NewsDetails} options={{ headerShown: false }}/>
    </Stack.Navigator>
}

export default NewsStack;
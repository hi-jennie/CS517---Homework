import { createStackNavigator } from "@react-navigation/stack";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import NewsDetails from "../screens/NewsDetails";
function NewsStack(props) {
    const Stack = createStackNavigator();
    return <Stack.Navigator>
        <Stack.Screen name="News" component={BadgerNewsScreen} options={{ title: 'News' }}/>
        <Stack.Screen name="details" component={NewsDetails} options={{ title: 'details' }}/>
    </Stack.Navigator>
}

export default NewsStack;
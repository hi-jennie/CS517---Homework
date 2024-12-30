import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import NewsStack from "./NewsStack";


function BadgerTabs(props) {
    const BottomTabs = createBottomTabNavigator();
    return <BottomTabs.Navigator>
        <BottomTabs.Screen name="News" component={NewsStack} options={{ title: 'News' }}/>
        <BottomTabs.Screen name="Preferences" component={BadgerPreferencesScreen} options={{ title: 'Preferences' }}/>       
    </BottomTabs.Navigator>
}

export default BadgerTabs;
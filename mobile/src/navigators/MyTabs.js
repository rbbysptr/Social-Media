import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather } from "@expo/vector-icons";
import Home from "../screen/home";
import CreatePost from "../screen/CreatePost";
import TabUserProfile from "../screen/TabUserProfile";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home";
                    } else if (route.name === "CreatePost") {
                        iconName = focused ? "edit" : "edit";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "user" : "user";
                    }
                    return <Feather name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray"
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="CreatePost"
                component={CreatePost}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Profile"
                component={TabUserProfile}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    )
}
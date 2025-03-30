import {View, Text} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    return (
        <Tabs
        screenOptions={{
            headerShown:false,
            tabBarActiveTintColor:COLORS.primary,
            headerTitleStyle:{
                color:COLORS.textPrimary,
                fontWeight:"600"
            },
            headerShadowVisible:false,
            tabBarStyle:{
                backgroundColor:COLORS.background,
                borderTopWidth:0,
                borderTopColor:COLORS.border,
                paddingTop:5,
                paddingBottom:insets.bottom,
                height:60+insets.bottom,
            }
        }
        }
        >
            <Tabs.Screen name={"index"} options={{
                title:"Home",
                tabBarIcon:({focused,color, size}) => (
                    <Ionicons
                        name={focused?"home":"home-outline"}
                        size={size}
                        color={color}

                    />
                )
            }}/>
            <Tabs.Screen name={"create"} options={{
                title:"Create",
                tabBarIcon:({focused,color, size}) => (
                    <Ionicons
                        name={focused?"add-circle":"add-circle-outline"}
                        size={size}
                        color={color}

                    />
                )

            }}/>
            <Tabs.Screen name={"profile"} options={{
                title:"Profile",
                tabBarIcon:({focused,color, size}) => (
                    <Ionicons
                        name={focused?"person":"person-outline"}
                        size={size}
                        color={color}
                    />
                )
            }}/>
        </Tabs>
    )
}

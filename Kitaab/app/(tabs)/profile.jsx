import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {useAuthStore} from "../../store/authStore";
export default function ProfileTab() {
const {logout} = useAuthStore()
    return (
        <View>
            <Text>Profile Tab</Text>
            <TouchableOpacity onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

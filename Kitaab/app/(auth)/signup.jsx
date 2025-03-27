import {ActivityIndicator, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import styles from "../../assets/styles/signup.styles";
import {Ionicons} from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import {TextInput} from "react-native";
import {useRouter} from "expo-router";
import {useAuthStore} from "../../store/authStore";

export default function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const {user , isLoading ,register} = useAuthStore();

    const router = useRouter();

    const handleSignup = async () => {
        const result = await register(username,email,password);
        if(!result.success){
            Alert.alert("Error",result.error);
        }
    };

    return(
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.OS === "ios" ? "padding":"height"}
        >
        <View style={styles.container}>

            <View style={styles.card}>
                {/*header*/}
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Kitaab📖
                    </Text>
                    <Text style={styles.subtitle}>
                        Share your favourite reads
                    </Text>
                </View>
                <View style={styles.formContainer}>
                    {/*username input*/}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            Username
                        </Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                            name={username ? "person" : "person-outline"}
                            size={20}
                            color={COLORS.primary}
                            style={styles.inputIcon}
                            />
                            <TextInput
                            style={styles.input}
                            placeholder={"johndoe"}
                            placeholderTextColor={COLORS.placeholderText}
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize={"none"}
                            />
                        </View>
                    </View>
                    {/*Email input*/}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            Email
                        </Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name={email ? "mail-unread" : "mail-outline"}
                                size={20}
                                color={COLORS.primary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={"johndoe@gmail.com"}
                                placeholderTextColor={COLORS.placeholderText}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType={"email-address"}
                                autoCapitalize={"none"}
                            />
                        </View>
                    </View>
                    {/*password input*/}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name={password ? "lock-closed" : "lock-open-outline"}
                                size={20}
                                color={COLORS.primary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={"********"}
                                placeholderTextColor={COLORS.placeholderText}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />

                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword) }
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    color={COLORS.primary}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*signup button*/}
                    <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignup}
                    disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff"/>
                        ):(
                            <Text style={styles.buttonText}>Sign Up</Text>
                        )}
                    </TouchableOpacity>
                    {/*Footer*/}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.link}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        </KeyboardAvoidingView>
    )
}
import {ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View} from 'react-native'
import styles from "../../assets/styles/login.styles";
import {useState} from "react";
import {Image} from "expo-image";
import {Ionicons} from "@expo/vector-icons";
import {TextInput} from "react-native";
import COLORS from "../../constants/colors";
import {Link} from "expo-router";
import {useAuthStore} from "../../store/authStore";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[showPassword, setShowPassword] = useState(false);
    const { isLoading,login,isCheckingAuth} = useAuthStore();
    const handleLogin =  async () =>{
        const result = await login(email,password);
        if(!result.success) Alert.alert("Error",result.error);
    };
    if(isCheckingAuth) return null;

    return(
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.OS === "ios" ? "padding":"height"}
        >
        <View style={styles.container}>
           {/*ILLUSTRATION */}
            <View style={styles.topIllustration}>
                <Image
                    source={require("../../assets/images/illustration.png")}
                    style={[styles.illustrationImage ,{resizeMode:"contain"}]}
                />
            </View>
             <View style={styles.card}>
                <View  style={styles.formContainer}>
                    {/*email*/}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                            name={email ? "mail-unread" : "mail-outline"}
                            size={20}
                            color={COLORS.primary}
                            style={styles.inputIcon}
                            />
                            <TextInput
                            style={styles.input}
                            placeholder={"Enter your email"}
                            placeholderTextColor={COLORS.placeholderText}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType={"email-address"}
                            autoCapitalize={"none"}
                            />
                        </View>
                    </View>
                    {/*password*/}
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
                        placeholder={"Enter your password"}
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
                    {/*forgot password*/}
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff"/>
                        ):(
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                        )}
                    </TouchableOpacity>
                    {/*footer*/}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Dont have an account ?</Text>
                        <Link href={"/signup"} asChild>
                            <TouchableOpacity style={styles.link}>
                                <Text style={styles.link}>Sign Up</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    </KeyboardAvoidingView>
    );
}
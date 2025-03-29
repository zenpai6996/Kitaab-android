import {
    Image,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native'
import React, {useState} from 'react'
import {useRouter} from "expo-router";
import styles from "../../assets/styles/create.styles";
import {Ionicons} from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "../../constants/api";
export default function Create() {
    const [title, setTitle] = React.useState("");
    const [caption, setCaption] = useState("");
    const [rating, setRating] = useState(3);
    const [image, setImage] = useState(null);//to display the selected image
    const [imageBase64, setImageBase64] = useState(null);//way to turn images into a text to easily send them over the internet
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const pickImage = async () => {
        try{
            if(Platform.OS !== "web"){
                //request permissioon if needed
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if(status !== "granted"){
                    Alert.alert("Permission Denied","We need camera roll permissions to upload image");
                    return;
                }
            }
            //launch image library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:"images",
                allowsEditing:true,
                aspect:[4,3],
                quality:0.5,//lower quality to reduce upload time
                base64:true,
            })
            if(!result.canceled){
                setImage((result.assets[0].uri));
                //if base64 is provide , use it
                if(result.assets[0].base64){
                    setImageBase64(result.assets[0].base64);
                }else{
                   //otherwise convert the image to base64
                    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri,{
                        encoding:FileSystem.EncodingType.Base64,
                    });
                    setImageBase64(base64);
                }
            }
        }catch(error){
            console.error("Error picking Image",error);
            Alert.alert("Error","There was a problem selection your image");
        }
    };

    const handleSubmit = async () => {
        if(!title || !caption || !imageBase64 || !rating){
            Alert.alert("Error","Please fill in all fields");
            return;
        }
        try{
           setLoading(true);
           const token = await AsyncStorage.getItem("token");
           console.log(token);
           //get file extension from URI or default to jpeg
            const uriParts = image.split(".");
            const fileType = uriParts[uriParts.length -1]
            const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";

            const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

            const response = await fetch(`${API_URL}/books`,{
                method:"POST",
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    title,
                    caption,
                    rating:rating.toString(),
                    image:imageDataUrl,
                }),
            })
            const data = await response.json();
            if(!response.ok) throw new Error(data.message || "Something went Wrong");
            Alert.alert("Success","Your book recommendation has been posted!");
            setTitle("");
            setCaption("");
            setRating(3);
            setImage(null);
            setImageBase64(null);
        }catch(error){
           console.error("Error Creating post:",error );
           Alert.alert("Error",error.message || "Something went Wrong");
        }finally {
            setLoading(false);
        }
    };
    const renderRatingPicker = () => {
        const stars =[];
        for(let i=1 ; i <= 5 ;i++){
            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => setRating(i)}
                    style={styles.starButton}
                >
                   <Ionicons
                   name={i <= rating ? "star" : "star-outline"}
                   size={32}
                   color={i <= rating ? "#f4b400" : COLORS.textSecondary}
                   />
                </TouchableOpacity>
            );
        }
        return(
            <View style={styles.ratingContainer}>{stars}</View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.OS === "ios" ? "padding":"height"}
        >
          <ScrollView
              contentContainerStyle={styles.container}
              style={styles.scrollViewStyle}
          >
            <View style={styles.card}>
               {/*Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Add a Book Recommendation</Text>
                    <Text style={styles.subtitle}>Share your favorite reads with others</Text>
                </View>
                {/*Form */}
                <View style={styles.form}>
                    {/*Book Title*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Book Title </Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                            name={title ? "book": "book-outline"}
                            size={20}
                            color={COLORS.textSecondary}
                            style={styles.inputIcon}
                            />
                            <TextInput
                            style={styles.input}
                            placeholder={"Enter book title（。＾▽＾）"}
                            placeholderTextColor={COLORS.placeholderText}
                            value={title}
                            onChangeText={setTitle}
                            />
                        </View>
                    </View>
                    {/*Rating*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Your Rating</Text>
                        {renderRatingPicker()}
                    </View>
                    {/*Image*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Book Image</Text>
                        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                            {image ? (
                                <Image source={{uri:image}} style={styles.previewImage}/>
                            ) : (
                                <View style={styles.placeholderContainer}>
                                    <Ionicons
                                    name={"image-outline"}
                                    size={40}
                                    color={COLORS.textSecondary}
                                    />
                                    <Text style={styles.placeholderText}>Tap to select Image</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    {/*caption*/}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Caption</Text>
                        <TextInput
                        style={styles.textArea}
                        placeholder={`Write a review or thoughts for this book...`}
                        placeholderTextColor={COLORS.placeholderText}
                        value={caption}
                        onChangeText={setCaption}
                        multiline={true}
                        />
                    </View>
                    {/*Submit*/}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={COLORS.white}/>
                        ) : (
                            <>
                            <Ionicons
                                name={"cloud-upload-outline"}
                                size={20}
                                color={COLORS.white}
                                style={styles.buttonIcon}
                            />
                            <Text style={styles.buttonText}>Share</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    )
}

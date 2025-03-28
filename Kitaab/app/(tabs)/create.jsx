import {View, Text, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import React, {useState} from 'react'
import {useRouter} from "expo-router";
import styles from "../../assets/styles/create.styles";

export default function Create() {
    const [title, setTitle] = React.useState("");
    const [caption, setCaption] = useState("");
    const [rating, setRating] = useState(3);
    const [image, setImage] = useState(null);//to display the selected image
    const [imageBase64, setImageBase64] = useState(null);//way to turn images into a text to easily send them over the internet
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const pickImage = async () => {

    }

    const handleSubmit = async () => {

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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    )
}

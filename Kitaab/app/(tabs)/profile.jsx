import {View, Text, TouchableOpacity, Alert, FlatList, ActivityIndicator, RefreshControl} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useAuthStore} from "../../store/authStore";
import {useRouter} from "expo-router";
import {API_URL} from "../../constants/api";
import styles from "../../assets/styles/profile.styles";
import ProfileHeader from "../../components/ProfileHeader";
import LogoutButton from "../../components/LogoutButton";
import {Ionicons} from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import {Image} from "expo-image";
import Loader from "../../components/Loader";

export default function ProfileTab() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isrefreshing, setIsrefreshing] = useState(false);
    const [deleteBookId, setDeleteBookId] = useState(null);
    const router= useRouter();
    const {token} = useAuthStore()



    const fetchData = async () => {
        try{
            setIsLoading(true);

            const response = await fetch(`${API_URL}/books/user`,{
                headers:{Authorization:`Bearer ${token}`},
            });

            const data = await response.json();
            if(!response.ok) throw  new Error(data.message || "Failed to fetch user books");
            setBooks(data);

        }catch(error){
            console.error("Error fetching Books",error);
            Alert.alert("Error (⊙_⊙)？","Failed to load profile data. Swipe down to refresh");
        }finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteBook = async (bookId) => {
        try{
            setDeleteBookId(bookId)
            const response = await fetch(`${API_URL}/books/${bookId}`,{
                method:"DELETE",
                headers:{Authorization:`Bearer ${token}`}
            })
            const data = await response.json();
            if(!response.ok) throw new Error(data.message || "Failed to delete book");
            setBooks(books.filter((book) => book._id !== bookId));
            Alert.alert("Success","Recommendation deleted Sucessfully (✿◡‿◡)")
        }catch(error){
            Alert.alert("Error",error.message || "Failed to delete recommendation");
        }finally {
            setDeleteBookId(null);
        }

    }

    const confirmDelete = (bookId) => {
        Alert.alert("Delete Recommendation","Are you sure you want to delete this recommendation? ⊙﹏⊙∥",[
            {text:"Cancel",style:"cancel"},
            {text:"Delete",style:"destructive",onPress:() => handleDeleteBook(bookId)},
        ]);
    };

    const renderBookItem = ({item}) => (
      <View style={styles.bookItem}>
          <Image source={item.image}  style={styles.bookImage}/>
          <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
                <Text style={styles.bookCaption} numberOfLines={2}>{item.caption}</Text>
                <Text style={styles.bookDate}>{new Date(item.createdAt).toDateString()}</Text>
          </View>
      <TouchableOpacity onPress={() => confirmDelete(item._id)} style={styles.deleteButton}>
          {deleteBookId === item._id ? (
              <ActivityIndicator size={"small"} color={COLORS.primary}/>
          ):(
              <Ionicons
                  name={"trash-outline"} size={20} color={COLORS.primary}
              />
          )}
      </TouchableOpacity>
      </View>
    );

    const renderRatingStars = (rating) => {
        const stars =[];
        for(let i =0 ;i<=5;i++){
            stars.push(
                <Ionicons
                key={i}
                name={i <= rating ? "star" : "star-outline"}
                size={14}
                color={i <= rating ? "#f4b400" : COLORS.textSecondary}
                style={{marginRight:2}}
                />
            );
        }
        return stars;
    }

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve,ms))

    const handleRefresh = async() => {
        setIsrefreshing(true);
        await sleep(500);
        await fetchData();
        setIsrefreshing(false);
    }

    if(isLoading && !isrefreshing) return <Loader/>


    return (
        <View style={styles.container}>
            <ProfileHeader/>
            <LogoutButton/>
            <View style={styles.booksHeader}>
                <Text style={styles.bookTitle}>Your Recommendations 📚</Text>
                <Text style={styles.booksCount}>{books.length} books</Text>
            </View>
            <FlatList
            data={books}
            renderItem={renderBookItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.booksList}
            refreshControl={
                <RefreshControl
                    refreshing={isrefreshing}
                    onRefresh={handleRefresh}
                colors={[COLORS.primary]}
                tintColor={COLORS.primary}
                />
            }
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Ionicons name={"book-outline"} size={50} color={COLORS.textSecondary}/>
                    <Text style={styles.emptyText}>No Recommendations yet</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
                        <Text style={styles.addButtonText}>Add Your First Book</Text>
                    </TouchableOpacity>
                </View>
            }
            />
        </View>
    )
}

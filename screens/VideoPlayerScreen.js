import React from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    container: {
        height: 200,
    }
})
const VideoPlayerScreen = ({ navigation }) => {
    const [video, setVideo] = React.useState(undefined)
    const movie = navigation.getParam("movie")

    const fetchVideo = async () => {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${movie.title}%20Official%20Trailer&key=AIzaSyDoKDLwMp0IX00ivfR2D3jsAbx2kPB37Jo`)
        const data = await response.json()
        setVideo(data.items[0])
    }

    React.useEffect(() => {
        fetchVideo()
    }, [])
    return (
        <View style={styles.container}>
            {
                video !== undefined ?  <WebView
                                        javaScriptEnabled={true}
                                        domStorageEnabled={true}
                                        allowsFullscreenVideo={true}
                                        source={{uri: `https://www.youtube.com/embed/${video.id.videoId}`}}
                                    /> : null
            }

        </View>
    );
}

VideoPlayerScreen.navigationOptions = ({ navigation }) => {
    return{
        title: "Video Player",
        headerTitleStyle: {
            color: '#fff'
        },
        headerStyle: {
            backgroundColor: 'black'
        },
        headerLeft: () => {
            return (
                // <Button title="Go Back" onPress={() => navigation.goBack()}/>
                <TouchableOpacity onPress={() => navigation.goBack()} onLongPress={() => Alert.alert("Go back to the movie list")}>
                    <Icon 
                        style={{paddingLeft: 12}}
                        name="arrow-back"
                        size={30}
                        color="white"
                    />
                </TouchableOpacity>
            );
        }
    }
};
export default VideoPlayerScreen;
import React from 'react'
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
// import Youtube from 'react-native-youtube'

const styles = StyleSheet.create({
    container: {
        height: 200,
    }
})
const VideoPlayerScreen = ({ navigation }) => {
    const [video, setVideo] = React.useState(undefined)
    const movie = navigation.getParam("movie")

    console.log(video)
    console.log(movie)

    const fetchVideo = async () => {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${movie.title}%20Official%20Trailer&key=AIzaSyDoKDLwMp0IX00ivfR2D3jsAbx2kPB37Jo`)
        const data = await response.json()
        setVideo(data.items[0])
        console.log(data.items[0])
    }

    console.log(movie)
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
            {/* <YouTube
                    apiKey={'AIzaSyDoKDLwMp0IX00ivfR2D3jsAbx2kPB37Jo'}
                    videoId={movie.id}   
                    play         
                    fullscreen   
                    loop={false}            
                    onReady={e => this.setState({ isReady: true })}
                    onChangeState={e => this.setState({ status: e.state })}
                    onChangeQuality={e => this.setState({ quality: e.quality })}
                    onError={e => this.setState({ error: e.error })}
                    style={{ alignSelf: 'stretch', height: 300 }}
                />*/}
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
        }
    }
};
export default VideoPlayerScreen;
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 22,
        backgroundColor: 'darkred'
    },
    detailContainer: {
        backgroundColor: '#660000',
        alignItems: 'center',
        padding: 10

    },  
    posterImage: {
        width: 280,
        height: 420,
        borderRadius: 15,
    },
    movieTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: '500',
        paddingTop: 12,
        textAlign: 'center'
    },
    movieOriginalTitle: {
        color: 'white',
        fontSize: 18,
        paddingTop: 12,
    },
    movieOverview: {
        color: 'white',
        paddingTop: 12,
        textAlign: 'center'
    },
});

export default ({ movie, navigation }) => {
    return (
        <View style={ styles.container }>
            <View style={styles.detailContainer}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('VideoPlayer', {movie: movie})}>
                    <Image style={styles.posterImage} source={{uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`}} />
                </TouchableOpacity>                
                
               
                <Text style={styles.movieTitle}> {movie.title} </Text>
                <Text style={styles.movieOriginalTitle}> {movie.original_title} </Text>
                <Text style={styles.movieOverview}> {movie.overview} </Text>
                <Text></Text>
            </View>
        </View>
    );
};
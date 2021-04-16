import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 22,
        backgroundColor: 'darkred',
    },
    detailContainer: {
        backgroundColor: '#660000',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 15,
    },  
    movieRatingVotes: {
        color: 'white',
        textAlign: 'center'
    },
    movieRatingNumbers: {
        color: '#3ee649',
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
    movieReleaseDate: {
        color: 'white',
        paddingTop: 12,
        textAlign: 'left',
    },
    movieOverview: {
        color: 'white',
        paddingTop: 12,
        textAlign: 'left',
    },
});

export default ({ movie, navigation }) => {
    return (
        <ScrollView>
            <View style={ styles.container }>
                <View style={styles.detailContainer}>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('VideoPlayer', {movie: movie})}>
                            <Image style={styles.posterImage} source={{uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`}} />
                        </TouchableOpacity>                                  
                        <Text style={styles.movieTitle}> {movie.title} </Text>
                        <Text style={styles.movieRatingVotes}> {movie.vote_count} votes - <Text style={styles.movieRatingNumbers}>{movie.vote_average}/10</Text></Text>
                    </View>
                    <Text style={styles.movieReleaseDate}> Release Date: {movie.release_date} </Text>
                    <Text style={styles.movieOverview}> {movie.overview} </Text>
                </View>
            </View>
        </ScrollView>
        
    );
};
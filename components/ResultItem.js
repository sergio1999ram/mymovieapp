import React from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'

const styles = StyleSheet.create({
    resultContainer: {
        flex: 1,
        backgroundColor: '#660000',
        marginBottom: 10,
        borderRadius: 10,
        padding: 12,
        flexDirection: 'row',
    },
    imageMovie: {
        width: 170,
        height: 95,
        borderRadius: 2,
        marginVertical: 'auto'
    },
    descriptionContainer: {
        width: '48%',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3ee649',
        paddingBottom: 5
    },
    original_language: {
        color: 'white',
        textAlign: 'left',
        fontSize: 12,
        paddingBottom: 5
    },
    release_date: {
        fontSize: 12,
        color: '#cbcbcb',
    },
    overview: {
        color: 'white',
        textAlign: 'left',
        paddingBottom: 5,
        fontSize: 14,
        fontWeight: '200'
    },
    noImageText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
//maxTitleLength: 20
const ResultItem = ({ movie, navigation }) => {
    return(
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Detail', {item: movie, navigation: navigation})}>
            <View style={styles.resultContainer}>
            {
                movie.backdrop_path !== "" || movie.backdrop_path !== null ? 
                <Image 
                    resizeMode="contain"
                    style={styles.imageMovie} 
                    source={ {uri: `https://image.tmdb.org/t/p/w200${movie.backdrop_path}`} } 
                /> :
                <Text> No image </Text>
            }
                <View style={styles.descriptionContainer}>
                    <Text 
                        style={styles.title} 
                        numberOfLines={1}
                    > { movie.title  } </Text>
                    <Text style={styles.original_language}> Language: { movie.original_language.toUpperCase()}</Text>
                    <Text 
                        numberOfLines={3} 
                        style={styles.overview}
                    > { movie.overview } </Text>
                    {
                        movie.hasOwnProperty('release_date')  ?
                            movie.release_date !== "" ? 
                            <Text style={styles.release_date}> {`Release date: ${movie.release_date.substring(0, 4)}`} </Text> : 
                            null : 
                            <Text style={styles.release_date}>No date registered</Text>
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default ResultItem
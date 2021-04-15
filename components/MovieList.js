import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    movieContainer: {
        padding: 15,
        textAlign: 'center',
    },
    movieList: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    imageMovie: {
        flex: 1,
        height: 210,
        width: 140,
        marginHorizontal: 'auto'
    }
})

export default ({ movies, genreId, navigation }) => {
    return (
        <View style={styles.movieList}>
            <FlatList
                data={movies}
                horizontal={true}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => item.genre_ids.map((id) => (genreId == id ? <View style={styles.movieList} key={item.id}><TouchableOpacity onPress={() => navigation.navigate('Detail', {item: item, navigation: navigation})}><Text style={styles.movieContainer}>{ item.title }</Text>               
                </TouchableOpacity>
                {item.backdrop_path !== null ?
                <Image style={styles.imageMovie} source={ {uri:`https://image.tmdb.org/t/p/w200${item.poster_path}`}}/> : <Text>No Image</Text> }
                </View> : null))}
            />
        </View>
    );
}
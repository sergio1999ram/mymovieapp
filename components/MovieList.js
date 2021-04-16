import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableWithoutFeedback, Alert } from 'react-native';

const styles = StyleSheet.create({
    movieList: {
        backgroundColor: '#660000',
        paddingHorizontal: 10
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
                style={{paddingVertical: 20}}
                scrollEnabled={true}
                data={movies}
                horizontal={true}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => item.genre_ids.map((id) => (genreId == id ? <View style={styles.movieList} key={item.id}>
                    <TouchableWithoutFeedback 
                        onPress={() => navigation.navigate('Detail', {item: item, navigation: navigation})}
                        onLongPress={() => Alert.alert(`Movie title: ${item.title}`)}
                    >                                     
                        
                {item.backdrop_path !== null ?
                    <Image style={styles.imageMovie} source={ {uri:`https://image.tmdb.org/t/p/w200${item.poster_path}`}}/> : <Text>No Image</Text> }
                </TouchableWithoutFeedback>
                </View> : null))}
            />
        </View>
    );
}
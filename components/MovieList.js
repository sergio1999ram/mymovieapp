import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';

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
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 25
    },
    noImageText: {
        margin: 'auto',
        color: 'white',
        fontSize: 16,
        fontWeight: '700'
    }
})

// export default ({ movies, genreId, navigation }) => {
//     return (
//         <View style={styles.movieList}>
//             <FlatList
//                 style={{paddingVertical: 20}}
//                 scrollEnabled={true}
//                 data={movies}
//                 horizontal={true}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({item}) => item.genre_ids.map((id) => (genreId == id ? <View style={styles.movieList} key={item.id}>
//                     <TouchableWithoutFeedback 
//                         onPress={() => navigation.navigate('Detail', {item: item, navigation: navigation})}
//                         onLongPress={() => Alert.alert(`Movie title: ${item.title}`)}
//                     >                                     
                        
//                 {item.backdrop_path !== null ?
//                     <Image style={styles.imageMovie} source={ {uri:`https://image.tmdb.org/t/p/w200${item.poster_path}`}}/> : <Text>No Image</Text> }
//                 </TouchableWithoutFeedback>
//                 </View> : null))}
//             />
//         </View>
//     );
// }

export default ({ genre, navigation }) => {
    const [movies, setMovies] = React.useState([])
    const [loadingMovies, setLoadingMovies] = React.useState(true)
    
    const  fetchMovies = async () => {
        try {
            if( loadingMovies == true ){
                let index = 1
                let total_pages = 20

                let aux_movies = []
                while( index <= total_pages) {
                    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=a7482cb03637b0ce04c1ef05b0b84d2e&language=en-US&page=${index}&with_genres=${genre.id}`)
                    const data = await response.json()
                    data.results.map((item) => aux_movies.push(item))
                    index++
                }
                setMovies(aux_movies)
                setLoadingMovies(false)
            }
           
        }catch( err ) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        fetchMovies()
    }, [loadingMovies])

    return (
        <View style={styles.movieList}>
        {
            loadingMovies === true ? <ActivityIndicator style={styles.activityIndicator} animating={true} size="small" color="#0000ff"/> :
            <FlatList
                style={{paddingVertical: 20}}
                scrollEnabled={true}
                data={movies}
                horizontal={true}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <View style={styles.movieList} key={item.id}>
                    <TouchableWithoutFeedback 
                        onPress={() => navigation.navigate('Detail', {item: item, navigation: navigation})}
                        onLongPress={() => Alert.alert(`Movie title: ${item.title}`)}
                    >                                     
                        
                {item.backdrop_path !== null ?
                    <Image style={styles.imageMovie} source={ {uri:`https://image.tmdb.org/t/p/w200${item.poster_path}`}}/> : <Text style={styles.noImageText}>No Image</Text> }
                </TouchableWithoutFeedback>
                </View>}
            />
        }
        </View>
    );
}
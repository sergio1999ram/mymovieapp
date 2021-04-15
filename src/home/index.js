import { StyleSheet, View, FlatList, Text, Dimensions } from 'react-native';
import React from 'react';
import { default as MovieList } from '../../components/MovieList.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'darkred'
    },
    genreContainer: {
        flex: 1,
        margin: 5,
        width: Dimensions.get("window").width - 30,
    },
    genreTitle: {
        color: 'black',
        backgroundColor: 'white',
        paddingLeft: 12,
        fontSize: 18,
        paddingTop: 10,
        fontWeight: '700'
    },
    movieItem: {
        paddingHorizontal: 12,
        backgroundColor: 'white'
    }
});

export default ( {navigation} ) => {
    const [movies, setMovies] = React.useState([])
    const [genres, setGenres] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [loadingMovies, setLoadingMovies] = React.useState(true)

    const fetchGenres = async () => {
        try{
            const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=a7482cb03637b0ce04c1ef05b0b84d2e&language=en-US")
            const data = await response.json()
            setGenres(data.genres)
        }catch (err){
            console.log(err)
        }
    }

    const fetchMovies = async () => {
        try {
            if(loadingMovies == true){
                let index = 1
                let total_pages = 30

                let aux_movies = []
                while(index <= total_pages){
                    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=a7482cb03637b0ce04c1ef05b0b84d2e&language=en-US&page=${index}`)
                    const data = await response.json()
                    data.results.map((item) => aux_movies.push(item))
                    index++
                }
                setMovies(aux_movies)
                setLoadingMovies(false)
            }     
        }catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        fetchGenres()
        setLoading(false)
        fetchMovies()

    }, [loadingMovies])

    return(
        <View style={styles.container}>
            {/* <Button title="Go to Detail" onPress={() => navigation.navigate("Detail")}/> */}
        {
            loading === true ? <Text> Loading </Text> : 
            <FlatList
                data={genres}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (<View style={styles.genreContainer}>
                                <Text style={styles.genreTitle}>{ item.name }</Text>
                                {
                                    loadingMovies === true ? <Text style={{color: 'white', paddingHorizonta: 15}}> Loading Movies</Text>: <MovieList movies={movies} genreId={item.id} navigation={navigation}/>
                                }
                            </View>)
                }

            /> 
        }
        </View>
    );
};
import { StyleSheet, View, FlatList, Text, Dimensions, ActivityIndicator, Button } from 'react-native';
import React from 'react';
import { default as MovieList } from '../../components/MovieList.js';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Octicons';

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
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
        color: 'white',
        backgroundColor: '#660000',
        paddingLeft: 12,
        fontSize: 18,
        paddingTop: 10,
        fontWeight: '700'
    },
    movieItem: {
        paddingHorizontal: 12,
        backgroundColor: 'white',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchMovieInput: {
        height: 50,
        paddingLeft: 12,
    },
    searchRightIcon: {
        backgroundColor: 'white'
    },
    inputContainer: {
        backgroundColor: 'white', 
        position: 'absolute',
        top: 5
        // width: Dimensions.get("window").width - 30, 
        // height:55,
    }
});

export default ( {navigation} ) => {
    const [movies, setMovies] = React.useState([])
    const [genres, setGenres] = React.useState([])
    const [loadingMovies, setLoadingMovies] = React.useState(true)
    const [searchText, setSearchText] = React.useState('')
    const searchInput = React.createRef()


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
                let total_pages = 2

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
        fetchMovies()
    }, [loadingMovies])

    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Input
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    ref={searchInput}
                    style={styles.searchMovieInput} 
                    placeholder="Search for a movie"
                        rightIcon={ <Icon name="search" size={20} onPress={() => searchText.length > 0 ? navigation.navigate('ResultsScreen', {query: searchText}) : null } style={styles.searchRightIcon}/>}
                />
            </View>
        
        {
            loadingMovies === true ? <View style={styles.loadingContainer}>
                                        <Text style={styles.loadingText}>Searching for movies...</Text> 
                                        <ActivityIndicator style={styles.activityIndicator} animating={true} size="large" color="#0000ff"/>
                                    </View> : 
                                    <FlatList
                                        style={{marginTop: 70}}
                                        data={genres}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={({item}) => (<View style={styles.genreContainer}>
                                                        <Text style={styles.genreTitle}>{ item.name }</Text>
                                                        {/* <MovieList movies={movies} genreId={item.id} navigation={navigation}/> */}
                                                        <MovieList genre={item} navigation={navigation} />
                                                    </View>)
                                        }

                                    />
        }
        </View>
    );
};
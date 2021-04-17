import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';

import ResultItem from '../../components/ResultItem.js';

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'darkred',
        justifyContent: 'center',
        flex: 1
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultsContainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    loadingContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: 'white',
        fontSize: 16,
        paddingBottom: 30
    }
})

const ResultsList = ({ query, navigation }) => {
    const [data, setData] = React.useState([])
    const [loadingMovies, setLoadingMovies] = React.useState(true)

    const fetchResults = async () => {
        try {
            if(loadingMovies === true){
                console.log("loadingMovies:", loadingMovies)
                let index = 1
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a7482cb03637b0ce04c1ef05b0b84d2e&language=en-US&query=${query}&include_adult=false&page=1`)
                const data = await response.json()
                const total_pages = data.total_pages
                // const total_pages = 1

                let aux_movies = []
                while(index <= total_pages){
                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a7482cb03637b0ce04c1ef05b0b84d2e&language=en-US&query=${query}&include_adult=false&page=${index}`)
                    const data = await response.json()
                    data.results.map((item) => aux_movies.push(item))
                    index++
                }
                setData(aux_movies)
                setLoadingMovies(false)
            }     
        }catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        fetchResults()
    }, [])

    return (
        <View style={styles.modalContent}>
                    {
                        loadingMovies == true ? <View style={styles.loadingContainer}>
                                                    <Text style={styles.loadingText}>Searching for movies...</Text> 
                                                    <ActivityIndicator style={styles.activityIndicator} animating={true} size="large" color="#0000ff"/>
                                                </View> : data.length > 0 ? <View style={styles.resultsContainer}>
                                                                <FlatList
                                                                    data={data}
                                                                    keyExtractor={(item) => `${item.id.toString()}.${item.id.release_date}`}
                                                                    renderItem={({item}) => <ResultItem movie={item} navigation={navigation}/>}
                                                                />
                                                            </View> : <Text> No data </Text>
                    }
                </View>
    )
}

export default ResultsList;
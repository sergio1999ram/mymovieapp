import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'darkred',
        justifyContent: 'center',
        height: Dimensions.get("window").height - 200,
        width: Dimensions.get("window").width - 30,
    },
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,0.7)', 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultsContainer: {
        marginTop: 35,
        paddingLeft: 10,
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

const ResultsList = ( {modalVisible, setModalVisible, searchText} ) => {
    const [data, setData] = React.useState([])
    const [loadingMovies, setLoadingMovies] = React.useState(true)

    const fetchResults = async () => {
        try {
            if(loadingMovies === true){
                console.log("loadingMovies:", loadingMovies)
                let index = 1
                const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=a7482cb03637b0ce04c1ef05b0b84d2e&language=en-US&page=1}')
                const data = await response.json()
                const total_pages = data.total_pages
                // const total_pages = 1

                let aux_movies = []
                while(index <= total_pages){
                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a7482cb03637b0ce04c1ef05b0b84d2e&language=en-US&query=${searchText}&include_adult=false&page=${index}`)
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
        if(modalVisible === true) {
            fetchResults()
        }
    }, [])
    return (
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Icon color="white" size={30} name="close" style={{position: 'absolute', top: 5, right: 5}} onPress={() => setModalVisible(false)}/>
                    {
                        loadingMovies == true ? <View style={styles.loadingContainer}>
                                                    <Text style={styles.loadingText}>Searching for movies...</Text> 
                                                    <ActivityIndicator style={styles.activityIndicator} animating={true} size="large" color="#0000ff"/>
                                                </View> :   <View style={styles.resultsContainer}>
                                                                <FlatList
                                                                    data={data}
                                                                    keyExtractor={(item) => item.id.toString()}
                                                                    renderItem={({item}) => (<View><Text>{item.title} - {item.original_languyae}</Text></View>)}
                                                                />
                                                            </View>
                    }
                </View>
            </View>
  

        </Modal>
     )
}

export default ResultsList;
import React from 'react';
import { default as ResultsList } from '../src/search/index.js';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ResultsScreens = ( {navigation} ) => {
    const query = navigation.getParam("query")
    return(
        <ResultsList query={query} navigation={navigation} />
    );
}

ResultsScreens.navigationOptions = ({ navigation }) => {
    return{
        title: 'Search results',
        headerTitleStyle: {
            color: '#fff'
        },
        headerStyle: {
            backgroundColor: 'black'
        },
        headerLeft: () => {
            return (
                <TouchableWithoutFeedback onPress={() => navigation.goBack()} onLongPress={() => Alert.alert("Go back to the movie list")}>
                    <Icon 
                        style={{paddingLeft: 12}}
                        name="arrow-back"
                        size={30}
                        color="white"
                    />
                </TouchableWithoutFeedback>
            );
        }
    }
};

export default ResultsScreens;
import React from 'react';
import { default as Detail } from '../src/detail/index.js'; 

const DetailScreen = ({ navigation }) => {
    const item = navigation.getParam("item")
    return(
        <Detail movie={item} navigation={navigation}/>
    );
}

DetailScreen.navigationOptions = ({ navigation }) => {
    return{
        title: 'My Movie App',
        headerTitleStyle: {
            color: '#fff'
        },
        headerStyle: {
            backgroundColor: 'black'
        }
    }
};

export default DetailScreen;
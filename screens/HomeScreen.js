import React from 'react';
import { default as Home } from '../src/home/index.js';

const HomeScreen = ( {navigation} ) => {
    return(
        <Home navigation={navigation}/>
    );
}

HomeScreen.navigationOptions = () => {
    return{
        title: 'My Movie App',
        headerTitleStyle: {
            textAlign: 'center',
            color: '#fff'
        },
        headerStyle: {
            backgroundColor: 'black'
        }
    }
};

export default HomeScreen;
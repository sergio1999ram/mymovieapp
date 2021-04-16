import React from 'react';
import { default as Detail } from '../src/detail/index.js'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { Alert, TouchableOpacity } from 'react-native';

const DetailScreen = ({ navigation }) => {
    const item = navigation.getParam("item")
    return(
        <Detail movie={item} navigation={navigation}/>
    );
}

DetailScreen.navigationOptions = ({ navigation }) => {
    const item = navigation.getParam("item")
    return{
        title: `${item.original_title}`,
        headerTitleStyle: {
            color: '#fff',
        },
        headerStyle: {
            backgroundColor: 'black'
        },
        headerLeft: () => {
            return (
                <TouchableOpacity onPress={() => navigation.goBack()} onLongPress={() => Alert.alert("Go back to the movie list")}>
                    <Icon 
                        style={{paddingLeft: 12}}
                        name="arrow-back"
                        size={30}
                        color="white"
                    />
                </TouchableOpacity>
            );
        }
    }
};

export default DetailScreen;
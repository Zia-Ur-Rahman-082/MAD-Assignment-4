import React from "react";
import {View,Text, StyleSheet} from 'react-native';
import Background from "./src/Background";

const Home = () =>{
    return(
        <Background>
            <View style={{marginHorizontal: 40, marginVertical: 100}}>
            <Text style={{color: 'white',textAlign: 'center' ,fontSize: 50}}>App's Home</Text>
            <Text style={{color: 'white' ,fontSize: 50, textAlign:'center', marginBottom: 40}}>Screen</Text>
            </View>
        </Background>     
    );
}
const styles = StyleSheet.create({
})
export default Home;
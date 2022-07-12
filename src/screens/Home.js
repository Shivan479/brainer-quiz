import { Button } from 'native-base';
import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, ViewComponent } from 'react-native';
export default class Home extends Component {
    constructor({ navigation }) {
        super();
        this.navigation = navigation;
        this.navigation.setOptions({ headerShown: false });
        // this.gotoListQuiz = this.gotoListQuiz.bind(this);
    }

    gotoListQuiz() {
        console.log('pressed');
        // this.navigation.setOptions({ title: 'ttttttt!' });
        this.navigation.navigate('QuizList');
    }

    render() {
        return (
            <ImageBackground
                source={require('../bgimage/images.jpg')}
                style={styles.imgBg}>
                <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                    <Button
                        transparent
                        style={{
                            alignSelf:'center',
                            flex:1,
                        }}>
                        <Text style={{fontSize:50, fontStyle:"italic", color:'#F59F5B'}}> BRAINER QUIZ </Text>
                    </Button>
                    <Button
                        onPress={this.gotoListQuiz.bind(this)}
                        style={{
                            alignSelf:'center',
                            padding: 70,
                            borderRadius: 30,
                            marginBottom:160,
                            backgroundColor: '#9e5def',
                            
                        }}>
                        <Text style={{fontSize:35,fontStyle:'italic', color:'#fff'}}>PLAY</Text>
                    </Button>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imgBg: {
        justifyContent: 'center',
        resizeMode: 'cover',
        flex: 1,
    },

});

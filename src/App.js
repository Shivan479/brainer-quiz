import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Button } from 'native-base';
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';

import Home from './screens/Home';
import QuizList from './screens/QuizList';
import QuizPlayer from './screens/QuizPlayer';
import QuizResult from './screens/QuizResult';

import { store } from './store';

const MainStack = createStackNavigator();
const cardDefautOpt = {
    cardStyle: {
        backgroundColor: 'transparent',
    },
    headerStyle: {
        backgroundColor: '#4da6ff',
      },
      headerTintColor: '#003300',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize:23,
      },
};

const style = StyleSheet.create({
    head1: {
        fontSize: 35
    }
});

export default class App extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (<Provider store={store}>
            <NavigationContainer>
                <MainStack.Navigator>
                        <MainStack.Screen name="Home" component={Home} options={cardDefautOpt} />
                        <MainStack.Screen name="QuizList" component={QuizList} options={cardDefautOpt} />
                        <MainStack.Screen name="QuizPlayer" component={QuizPlayer} options={cardDefautOpt} />
                        <MainStack.Screen name="QuizResult" component={QuizResult} options={cardDefautOpt} />
                    </MainStack.Navigator>
            </NavigationContainer>
        </Provider>)
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f3f2f2',
        marginTop: 30
    },
    item: {
        fontSize: 20,
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },

});

import { Button, Container, Content, Form, Header, Left, List, ListItem, Right } from 'native-base';
import React, { Component } from 'react'
import { Dimensions, Text, ToastAndroid, View } from 'react-native';
import quizes from '../data/quizlist.json';

const screen = Dimensions.get('screen');

export default class QuizList extends Component {
    constructor({ route, navigation }) {
        super();
        this.navigation = navigation;
        this.startQuiz = this.startQuiz.bind(this);
    }

    startQuiz(questions, name) {
        console.log(questions);
        this.navigation.navigate('QuizPlayer', {
            data: questions,
            name: name,
        });
        // console.log(quizes);
        // ToastAndroid.show("Hellodfas df", ToastAndroid.SHORT);
    }

    render() {
        return (
            <Container>
                <Content>
                    <List style={{flex:1, justifyContent:'space-between',minHeight: screen.height - 120}}>
                        {quizes.map((quiz, index) => {
                            return (<ListItem
                                button={true}
                                key={index}
                                style={{ backgroundColor: quiz.bgColor, minHeight:75, marginLeft:0, paddingLeft:5}}
                                onPress={() => { this.startQuiz(quiz.questions, quiz.name) }}>
                                <Left>
                                    <Text style={{fontSize:22, color:'#1B2202'}}> {quiz.name}</Text>
                                </Left>
                                <Right>

                                    <Text>-></Text>

                                </Right>
                            </ListItem>)
                        })}
                    </List>
                </Content>
            </Container>
        )
    }
}

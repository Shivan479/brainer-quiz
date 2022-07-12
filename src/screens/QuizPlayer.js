import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  List,
  ListItem,
} from 'native-base';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Sound from 'react-native-sound';

const screen = Dimensions.get('screen');

const NextTimeout = 3;

export default class QuizPlayer extends Component {
  constructor({ route, navigation }) {
    super();
    this.navigation = navigation;
    this.route = route;
    this.navigation.setOptions({ title: route.params.name });

    this.state = {
      pageName: route.params.name,
      ques: route.params.data,
      totalQues: route.params.data.length,
      currentQues: 0,
      marks: 0,
      showNow: false,
      showResult: false,
      selectedOptIndex: null,
    };
    console.log(route.params);
  }

  sndFail() {
    var failedSnd = new Sound('failed.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      failedSnd.play();
    });
  }
  sndSuccess() {
    var successSnd = new Sound('success.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      successSnd.play();
    });
  }

  quesquiz(option, index) {
    // console.log(index);
    if (this.state.showNow == true || this.state.showResult == true) {
      console.log(11111);
      return;
    }
    this.setState({
      selectedOptIndex: index,
      showNow: true,
    });
    
    console.log(22222);

    // if last question
    if ((this.state.currentQues + 1) == this.state.ques.length) {
      // console.log(this.state.currentQues);
      // console.log(this.state.ques.length);

      // play sound
      if (option.correct == true) {
        this.sndSuccess();
      } else {
        this.sndFail();
      }
      let marks = this.state.marks;
      if (option.correct) {
        marks = this.state.marks + 2;
      }
      this.setState({
        showNow: true,
      });
      setTimeout(() => {
        // console.log(1211121);
        if (option.correct == true) {
          this.setState({
            marks: this.state.marks + 2,
            // showNow: false,
            showResult: true,
          });
        } else {
          this.setState({
            // showNow: false,
            showResult: true,
          });
        }
      }, 1000 * NextTimeout);
      return;
    }
    
    // play sound
    if (option.correct == true) {
      this.sndSuccess();
    } else {
      this.sndFail();
    }

    // normal events timer when current question is not the last one
    setTimeout(() => {
      // console.log(1211121);
      if (option.correct == true) {
        this.setState({
          currentQues: this.state.currentQues + 1,
          marks: this.state.marks + 2,
          showNow: false,
        });
      } else {
        this.setState({
          currentQues: this.state.currentQues + 1,
          showNow: false,
        });
      }
    }, 1000 * NextTimeout);
  }

  showResultScreen() {
    this.navigation.push('QuizResult', {
      marks: this.state.marks,
      totalQues: this.state.totalQues,
      pageName: this.state.pageName,
      ques: this.state.ques,
    });
  }

  optionStyle(option, index) {
    // console.log(index);
    let result = {
      li: {
        padding: 20,
        borderRadius: 15,
        margin: 2,
      },
      text: {
        color: '#000',
        fontSize: 24,
        width: '100%',
      },
    };
    if (this.state.showNow == true) {
      // If selected option
      if (this.state.selectedOptIndex == index) {
        result.li.backgroundColor = '#CCC'
        result.text.color = option.correct == true ? '#99FF00' : '#FF0000';
      } else {
        // other options

        // result.backgroundColor = option.correct == true ? '#99FF00' : '#FF0000';
        result.text.color = '#CF986C'
      }
      // playSound
    }
    return result;
  }

  render() {
    if (this.state.ques.length == 0) {
      return (
        <View style={styles.noContent}>
          <Text>No Questions Available</Text>
        </View>
      );
    }
    let ques = this.state.ques[this.state.currentQues];
    let progress = this.state.currentQues / this.state.ques.length;
    // console.log(progress);
    // console.log(this.state.showResult);

    return (
      <Container>
        <Header transparent style={{height:60}}>
          <Text style={{fontSize:20}}>
            Marks: {this.state.marks} / {this.state.ques.length * 2}
          </Text>
        </Header>
        <Content>
          <View style={{marginBottom:10}}>
            <Progress.Bar color={'#ff531a'} progress={progress} width={screen.width} />
          </View>
          <Card>
            <CardItem>
              <Body>
                <Text style={styles.ques}>
                  {' '}
                  Q.{this.state.currentQues + 1}- {ques.question}{' '}
                </Text>
                <List>
                  {ques.options.map((option, index) => {
                    return (
                      <ListItem
                        style={this.optionStyle(option, index).li}
                        key={index}
                        onPress={(e) => {
                          this.quesquiz(option, index);
                        }}>
                        <Text style={this.optionStyle(option, index).text}>
                          {option.optionText}
                        </Text>
                      </ListItem>
                    );
                  })}
                </List>
              </Body>
            </CardItem>
          </Card>
          <View>
            {this.state.showResult && (
              <Button style={styles.endResultBtn} onPress={() => { this.showResultScreen() }}>
                <Text style={{ color: '#fff', fontSize: 32 }}>Veiw Result</Text>
              </Button>
            )}
          </View>
        </Content>
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  noContent: {
    // backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: screen.height - 50,
  },
  ques: {
    fontSize: 24,
    marginTop:10,
    marginBottom:20,

  },
  options: {
    fontSize: 24,
    width: '100%',

  },
  correct: {
    backgroundColor: '#A2CF6C',
  },
  incorrect: {
    backgroundColor: '#FF0000',
  },
  endResultBtn: {
    width: '70%',
    marginTop: 50,
    marginLeft: 50,
    //  position:"absolute",
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor:'#006666'
    
  },
});

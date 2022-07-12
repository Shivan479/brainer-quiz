import { Button, Container, Content } from 'native-base';
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  Dimensions,
  Modal,
  StyleSheet,
  Pressable,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import * as Progress from 'react-native-progress';
const screen = Dimensions.get('screen');

const MarksPerQue = 2;
export default class QuizResult extends Component {
  constructor({ route, navigation }) {
    super();
    this.route = route;
    this.navigation = navigation;

    const percentInDec = this.route.params.marks / (this.route.params.totalQues * MarksPerQue);
    console.log(percentInDec);
    this.state = {
      pageName: this.route.params.pageName,
      ques: this.route.params.ques,

      totalQues: this.route.params.totalQues,
      attemptedQues: this.route.params.marks / 2,
      leftQues: this.route.params.totalQues - this.route.params.marks / 2,
      marks: this.route.params.marks,
      totalMarks: this.route.params.totalQues * MarksPerQue,
      percentObtained: percentInDec,
      modalVisible: false,
      badge: '',
    };
    console.log(this.state);
    // console.log(this.route.params);


  }

  componentDidMount() {
    // ToastAndroid.show(`PercentIn decimal:`);
    // return;

    if (this.state.percentObtained > 0.4) {
      this.setState({
        modalVisible: true,
        badge: 'data:image/jpeg;base64,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',
      });
    }

    if (this.state.percentObtained > 0.6) {
      this.setState({
        modalVisible: true,
        badge: 'https://i.pinimg.com/originals/25/24/6e/25246ec71e45c02609a2a66272239434.png',
      });
    }

  }

  gotoQuizPlayer() {
    console.log('pressed');
    // this.navigation.go
    this.navigation.push('QuizPlayer', {
      data: this.state.ques,
      name: this.state.pageName,
    });
  }

  render() {
    return (
      <View>
        <View
          style={{
            marginTop: 10,
            flex: 1,
            alignItems: 'center',
            minHeight: screen.width - 100,
          }}>
          <Progress.Circle
            size={screen.width - 120}
            showsText={true}
            // color={'#DAEF2A'}
            percent={0.4}
            thickness={20}
            progress={this.state.percentObtained}
            formatText={() => { return this.state.percentObtained * 100 + '%'; }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            padding: 20,
          }}>
          <View style={{ flex: 0.5 }}>
            <Text style={{ fontSize: 15, color: '#00e600' }}>
              Correct Answer: {this.state.attemptedQues} /{' '}
              {this.state.totalQues}{' '}
            </Text>
          </View>
          <View style={{ flex: 0.5 }}>
            <Text style={{ fontSize: 15, color: '#00e600' }}>
              Incorrect Answer: {this.state.totalQues - this.state.marks / 2} /{' '}
              {this.state.totalQues}{' '}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 20, color: '#ff8c1a', alignSelf: 'center' }}>
            TOTAL MARKS: {this.state.marks} / {this.state.totalMarks}{' '}
          </Text>
        </View>
        <View>
          <Button
            onPress={this.gotoQuizPlayer.bind(this)}
            style={{
              alignSelf: 'center',
              padding: 70,
              borderRadius: 30,
              marginBottom: 160,
              marginTop:70,
              backgroundColor: '#b37700',
            }}>
            <Text style={{ fontSize:25, color: '#fff' }}>RETAKE QUIZ</Text>
          </Button>
        </View>

        <Modal
          animationType="slide"
          statusBarTranslucent={true}
          hardwareAccelerated={true}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setState({ modalVisible: !this.state.modalVisible });
          }}>
          <View style={{ height: screen.height, width: screen.width, backgroundColor: 'rgba(52, 52, 52, 0.8)', justifyContent: 'center', padding: 20, }}>
            <View style={{ height: 300, backgroundColor: 'white', borderRadius: 20 }}>
              <Image source={{ uri: this.state.badge }} style={{ resizeMode: 'contain', flex: 1, justifyContent: 'center' }} />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                this.setState({ modalVisible: !this.state.modalVisible })
              }>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: screen.height - 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

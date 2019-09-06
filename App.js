import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      minutesCounter: '00',
      secondsCounter: '00',
      startDisable: false,
    };
  }

  componentDidMount() {
    clearInterval(this.state.timer);
  }

  onButtonStart = () => {
    let timer = setInterval(() => {
      let num = (Number(this.state.secondsCounter) + 1).toString(),
        count = this.state.minutesCounter;
      if (Number(this.state.secondsCounter) == 59) {
        count = (Number(this.state.minutesCounter) + 1).toString();
        num = '00';
      }

      this.setState({
        minutesCounter: count.length == 1 ? '0' + count : count,
        secondsCounter: num.length == 1 ? '0' + num : num,
      });
    }, 1000);

    this.setState({timer, startDisable: true});
  };

  onButtonStop = () => {
    clearInterval(this.state.timer);
    this.setState({startDisable: false});
  };

  onButtonClear = () => {
    this.setState({
      timer: null,
      minutesCounter: '00',
      secondsCounter: '00',
    });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.counterText}>
          {this.state.minutesCounter} : {this.state.secondsCounter}
        </Text>

        <TouchableOpacity
          onPress={this.onButtonStart}
          activeOpacity={0.6}
          style={[
            styles.button,
            {backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00'},
          ]}
          disabled={this.state.startDisable}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onButtonStop}
          activeOpacity={0.6}
          style={[styles.button, {backgroundColor: '#FF6F00'}]}>
          <Text style={styles.buttonText}>STOP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onButtonClear}
          activeOpacity={0.6}
          style={[
            styles.button,
            {backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00'},
          ]}
          disabled={this.state.startDisable}>
          <Text style={styles.buttonText}> CLEAR </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: '80%',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 7,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  counterText: {
    fontSize: 28,
    color: '#000',
  },
});

export default App;

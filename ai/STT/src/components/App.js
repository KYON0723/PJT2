import React, { Component } from "react";
import Word from "./Word";
import ListenerButton from "./ListenerButton";

// import voice from "@/voice.png";
// import voice1 from "@/voice (1).png";

import "../css/App.css";

class App extends Component {
  state = {
    show: false,
    listening: false,
    text: "Sorry, can't hear",
  };

  componentDidMount() {
    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
      alert(
        "Speech Recognition API is not supported in this browser, try chrome"
      );
      return;
    }

    this.recognition = new Recognition();
    this.recognition.lang = process.env.REACT_APP_LANGUAGE || "en-US";
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
    this.word = "apple";

    // 음성인식 결과 리턴 해주는 파트 onresult
    this.recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      if (text.toLowerCase() === this.word) {
        this.setState({ text: "Correct!" });
      } else {
        this.setState({ text: "Wrong!" });
      }
      console.log("transcript", text);
      // this.setState({ text });
    };

    //component상 숨겨져 있던 <word> 부분 보여주는
    this.recognition.onspeechend = () => {
      console.log("stopped");

      this.setState({ show: true });
    };

    // 최종적으로 음성인식 이벤트중 아무런 입력을 받지 않았을때 이벤트
    this.recognition.onnomatch = (event) => {
      console.log("no match");
      this.setState({ text: "Sorry, can't hear" });
    };

    // 음성인식 시작시
    this.recognition.onstart = () => {
      this.setState({
        listening: true,
      });
    };

    //
    this.recognition.onend = () => {
      console.log("end");

      this.setState({
        listening: false,
      });

      this.end();
    };

    // 음성인식x 면 error 뱉는 이벤트
    this.recognition.onerror = (event) => {
      console.log("error", event);

      this.setState({
        show: true,
        text: event.error,
      });
    };
  }

  start = () => {
    this.recognition.start();
  };

  end = () => {
    this.recognition.stop();
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <main className="demo-1">
        {this.state.show ? (
          <Word text={this.state.text} onClose={this.handleClose} />
        ) : (
          // <Word text={this.isCollect} onClose={this.handleClose} />
          <ListenerButton
            onStart={this.start}
            onEnd={this.end}
            disabled={this.state.listening}
            buttonText={
              this.state.listening ? "Listening..." : "Click me to listen"
              // this.state.listening ? (
              //   <img src={voice}></img>
              // ) : (
              //   "Click me to listen"
              // )
            }
          />
        )}
      </main>
    );
  }
}

export default App;

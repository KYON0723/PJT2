import React from "react";

class ListenerButton extends React.Component {
  state = {
    show: false,
  };

  handleMove = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;

    e.target.style.setProperty("--x", `${x}px`);
    e.target.style.setProperty("--y", `${y}px`);
  };

  handleStart = (event) => {
    event.preventDefault();

    this.props.onStart();
  };

  render() {
    return (
      <button
        {...this.props}
        className="button"
        onClick={this.handleStart}
        onMouseMove={this.handleMove}
      >
        <span>{this.props.buttonText}</span>
        {/* <img src={this.props.buttonImg} alt="없어용"></img> */}
      </button>
    );
  }
}

ListenerButton.defaultProps = {
  buttonText: "Click me to listen",
  buttonImg: "@/voice.png",
};

export default ListenerButton;

import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Members from "./components/Members";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";

const usernames = [
  "StarGazer87",
  "CrimsonEcho",
  "LunaWisp",
  "QuantumQuirk",
  "ElectricDreamer",
  "MidnightScribe",
  "NebulaWhisper",
  "MysticMunchkin",
  "EnigmaSeeker",
  "PixelPirate",
  "SereneJester",
  "WanderlustWizard",
  "EchoHarmony",
  "VelvetVortex",
  "SolarFlareFrenzy",
  "EphemeralRiddle",
  "AstralAmigo",
  "ZephyrChatter",
  "CobaltNomad",
  "SparklingOracle",
];

const randomUsername = () => {
  const randomIndex = Math.floor(Math.random() * usernames.length);
  return usernames[randomIndex];
};

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    members: [],
    me: {
      username: randomUsername(),
      color: randomColor(),
    },
  };

  componentDidMount() {
    this.drone = new window.Scaledrone("LgFaSHlhvG2BizoN", {
      data: this.state.me,
    });

    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const me = { ...this.state.me };
      me.id = this.drone.clientId;
      this.setState({ me });
    });

    const room = this.drone.subscribe("observable-room");

    room.on("message", (message) => {
      const messages = [...this.state.messages];
      messages.push(message);
      this.setState({ messages });
    });

    room.on("members", (members) => {
      this.setState({ members });
    });

    room.on("member_join", (member) => {
      const { members } = this.state;
      this.setState({ members: [...members, member] });
    });

    room.on("member_leave", ({ id }) => {
      const members = [...this.state.members];
      const index = members.findIndex((m) => m.id === id);
      if (index !== -1) {
        members.splice(index, 1);
        this.setState({ members });
      }
    });
  }

  onSendMessage = (message) => {
    if (message.trim() !== "") {
      this.drone.publish({
        room: "observable-room",
        message,
      });
    }
  };

  render() {
    const { members, messages, me } = this.state;
    return (
      <div className="App">
        <div className="Header">
          <Header />
        </div>
        <div className="Content">
          <div className="Content-container">
            <div className="Members">
              <Members members={members} me={me} />
            </div>
            <div className="Messages">
              <Messages messages={messages} me={me} />
            </div>
          </div>
        </div>
        <div className="MessageInput">
          <MessageInput onSendMessage={this.onSendMessage} />
        </div>
      </div>
    );
  }
}

export default App;

// import {useState} from 'react';
// import axios from 'axios';
// import CGLogo from './chatGPT.png';
// import AppLogo from './app-logo.png';
// import './App.css';

// function App() {
//   const [prompt, setPrompt] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // communicate with API
//     // post input value 'prompt' to API end point
//     axios
//       .post("http://localhost:5555/chat", { prompt })
//       .then((res) => {
//         setResponse(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//       });

//   };

//   return (
//     <div className="wrapper">
//       <img src={AppLogo} alt="" className="app-logo" />
//       <form onSubmit={handleSubmit}>
//         <img src={CGLogo} alt="" className={loading ? 'cg-logo loading' : 'cg-logo'} />
//         <input
//           type="text"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Ask anything... :)"
//         />
//         <button type="submit">Ask</button>
//       </form>
//       <p className="response-area">
//         {loading ? 'loading...' : response}
//       </p>
//       <div className="footer">~ webstylepress ~</div>
// </div>
//   );
// }

// export default App;

// // import React, { useEffect, useRef, useState } from "react";
// // import { Typography } from "@material-ui/core";
// // import wordsToNumbers from "words-to-numbers";
// // import alanBtn from "@alan-ai/alan-sdk-web";

// // import logo from "./images/logo.png";
// // import { NewsCards, Modal } from "./components";
// // import useStyles from "./styles";

// // // news api dc8c605a2fdd4a9bb7645d3ad0a922e1

// // const App = () => {
// //   const [activeArticle, setActiveArticle] = useState(0);
// //   const [newsArticles, setNewsArticles] = useState([]);
// //   const [isOpen, setIsOpen] = useState(false);

// //   const classes = useStyles();

// //   const alanBtnContainer = useRef();
// //   const logoEl = useRef();

// //   useEffect(() => {
// //     alanBtn({
// //       key: "9a30ae214fa9f495afe1ed9afa0614e62e956eca572e1d8b807a3e2338fdd0dc/stage",
// //       onCommand: ({ command, articles, number }) => {
// //         console.log("User input: XX", command);
// //         if (command === "newHeadlines") {
// //           // console.log("User input:", command);
// //           // console.log(articles);
// //           // setNewsArticles(articles);
// //           // setActiveArticle(-1);
// //         }
// //       },
// //     });
// //   }, [alanBtn]);

// //   return (
// //     <div>
// //       <div>
// //         <div className={classes.logoContainer}>
// //           {newsArticles.length ? (
// //             <div className={classes.infoContainer}>
// //               <div className={classes.card}>
// //                 <Typography variant="h5" component="h2">
// //                   Try saying: <br />
// //                   <br />
// //                   Open article number [4]
// //                 </Typography>
// //               </div>
// //               <div className={classes.card}>
// //                 <Typography variant="h5" component="h2">
// //                   Try saying: <br />
// //                   <br />
// //                   Go back
// //                 </Typography>
// //               </div>
// //             </div>
// //           ) : null}
// //         </div>
// //         <NewsCards articles={newsArticles} activeArticle={activeArticle} />
// //         {/* <Modal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
// //         {!newsArticles.length ? (
// //           <div className={classes.footer}>
// //             <Typography variant="body1" component="h2">
// //               Created by
// //               <a
// //                 className={classes.link}
// //                 href="https://www.linkedin.com/in/imran-khan-9bb7b5147/"
// //               >
// //                 {" "}
// //                 Imran Khan
// //               </a>{" "}
// //             </Typography>
// //           </div>
// //         ) : null}
// //       </div>

// //       <div ref={alanBtnContainer}></div>
// //     </div>
// //   );
// // };

// // export default App;

import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect } from "react";
import VPlayer from "./Components/VideoPlayer";
function App() {
  const _apiCall = async (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Basic ZW1haWxvZmltcmFuMTk5MkBnbWFpbC5jb20:PmP8hhSOg70k9ItyqKojq"
    );

    var raw = JSON.stringify({
      script: {
        type: "text",
        input: data,
      },
      source_url: "https://cdn.oneesports.gg/cdn-data/2021/06/MLBB_Sun.jpg",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("https://api.d-id.com/talks", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    console.info("onEvent", data);
  };

  useEffect(() => {
    alanBtn({
      key: "9a30ae214fa9f495afe1ed9afa0614e62e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        console.log("imran", commandData);
      },
      onEvent: function (e) {
        if (e.type === "response") {
          _apiCall(e.text);
        }
      },
    });
  }, []);
  return (
    <div>
      <VPlayer />
    </div>
  );
}

export default App;

// // import React, { useState, useEffect } from "react";
// // import alanBtn from "@alan-ai/alan-sdk-web";

// // const alanKey =
// //   "9a30ae214fa9f495afe1ed9afa0614e62e956eca572e1d8b807a3e2338fdd0dc/stage";

// // function Chatbot() {
// //   const [alanInstance, setAlanInstance] = useState(null);
// //   const [message, setMessage] = useState("");

// //   useEffect(() => {
// //     if (!alanInstance) {
// //       setAlanInstance(
// //         alanBtn({
// //           key: alanKey,
// //           onCommand: (commandData) => {
// //             if (commandData.command === "greetUser") {
// //               setMessage("Hello, how can I help you?");
// //             } else if (commandData.command === "respondToUser") {
// //               setMessage(commandData.message);
// //             }
// //           },
// //         })
// //       );
// //     }
// //   }, [alanInstance]);

// //   const handleFormSubmit = (e) => {
// //     e.preventDefault();
// //     alanInstance.callProjectApi("respondToUser", { message });
// //     setMessage("");
// //   };

// //   return (
// //     <div>
// //       <h1>Chatbot</h1>
// //       <button onClick={() => alanInstance.callProjectApi("greetUser")}>
// //         Start Chatting
// //       </button>
// //       <form onSubmit={handleFormSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Type a message"
// //           value={message}
// //           onChange={(e) => setMessage(e.target.value)}
// //         />
// //         <button type="submit">Send</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Chatbot;

// // import React, { useEffect } from "react";
// // import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

// // const App = () => {
// //   useEffect(() => {
// //     Kommunicate.init("1e669abbfce2119f3889dae27026da878");
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Welcome to my React 18 app</h1>
// //       <button onClick={() => Kommunicate.showChat()}>Open Chat</button>
// //     </div>
// //   );
// // };

// // export default App;

// // import React, { useEffect } from "react";
// // import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

// // Kommunicate.init("1e669abbfce2119f3889dae27026da878");

// // const MyComponent = () => {
// //   useEffect(() => {
// //     onMessageReceived(function (message) {
// //       console.log("Received message:", message);
// //     });
// //   }, []);

// //   console.log("Kommunicate", Kommunicate);

// //   return (
// //     <div>
// //       <h1>Hello, World!</h1>
// //     </div>
// //   );
// // };

// // export default MyComponent;

// import React, { useEffect } from "react";
// import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

// Kommunicate.init("1e669abbfce2119f3889dae27026da878", {
//   popupWidget: true,
//   automaticChatOpenOnNavigation: true,
// });

// const MyComponent = () => {
//   // useEffect(() => {
//   //   (function (d, m) {
//   //     var kommunicateSettings = {
//   //       appId: "1e669abbfce2119f3889dae27026da878",
//   //       popupWidget: true,
//   //       automaticChatOpenOnNavigation: true,
//   //       // voiceOutput: true,
//   //       // voiceName: "Google Deutsch", // Replace Google Deutsch with the voiceName or an array of voiceNames from the below mentioned table list
//   //       // voiceRate: 1,
//   //     };
//   //     window.kommunicate = m;
//   //     m._globals = kommunicateSettings;

//   //     // attach a listener to the onMessage event
//   //     // window.Kommunicate &&
//   //     //   window.Kommunicate.subscribeToEvents((data) => {
//   //     //     if (data.message && !data.isTyping) {
//   //     //       console.log(data.message);
//   //     //     }
//   //     //   });

//   //     if (window) {
//   //       console.log(window.kommunicate);
//   //     }
//   //   })(document, window.kommunicate || {});
//   // }, []);

//   return (
//     <div>
//       <h1>Hello, World!</h1>
//     </div>
//   );
// };

// export default MyComponent;

// import React from "react";
// import { Launcher } from "react-chat-window";
// class ChatBotRobot extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messageList: [],
//     };
//   }
//   async _onMessageWasSent(message) {
//     await this.setState({
//       messageList: [...this.state.messageList, message],
//     });
//   }
//   _sendMessage(text) {
//     if (text.length > 0) {
//       this.setState({
//         messageList: [
//           ...this.state.messageList,
//           {
//             author: "them",
//             type: "text",
//             data: { text },
//           },
//         ],
//       });
//     }
//   }
//   render() {
//     return (
//       <div id="chatbox" className="chatbox">
//         <Launcher
//           agentProfile={{
//             teamName: "Chatbot",
//             imageUrl:
//               "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
//           }}
//           onMessageWasSent={this._onMessageWasSent.bind(this)}
//           messageList={this.state.messageList}
//           showEmoji
//         />
//       </div>
//     );
//   }
// }

// import socketIO from "socket.io-client";
// const socket = socketIO.connect("http://localhost:4000");

// function App() {
//   return (
//     <div>
//       <p>Hello World!</p>
//     </div>
//   );
// }
// export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import ChatPage from "./components/ChatPage";
// import socketIO from "socket.io-client";

// const socket = socketIO.connect("http://localhost:4000");
// function App() {
//   return (
//     <BrowserRouter>
//       <div>
//         <Routes>
//           <Route path="/" element={<Home socket={socket} />}></Route>
//           <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { useState } from "react";
// import axios from "axios";
// import CGLogo from "./chatGPT.png";
// import AppLogo from "./app-logo.png";
// import "./App.css";

// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // communicate with API
//     // post input value 'prompt' to API end point
//     axios
//       .post("http://localhost:5555/chat", { prompt })
//       .then((res) => {
//         setResponse(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   return (
//     <div className="wrapper">
//       <img src={AppLogo} alt="" className="app-logo" />
//       <form onSubmit={handleSubmit}>
//         <img
//           src={CGLogo}
//           alt=""
//           className={loading ? "cg-logo loading" : "cg-logo"}
//         />
//         <input
//           type="text"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Ask anything... :)"
//         />
//         <button type="submit">Ask</button>
//       </form>
//       <p className="response-area">{loading ? "loading..." : response}</p>
//       <div className="footer">~ webstylepress ~</div>
//     </div>
//   );
// }

// export default App;

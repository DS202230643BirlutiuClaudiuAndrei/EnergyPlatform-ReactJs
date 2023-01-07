import React, { useState, useEffect } from "react";
import "./css/chat.css";
import JsonRpcClient from "react-jsonrpc-client";
import { HOST } from "../../commons/hosts";
import SockJsClient from "react-stomp";

function ChatMessageClient(props) {
  const [sock, setSock] = useState(null);
  const [messageToSend, setMessageToSend] = useState("");
  const [messages, setMessages] = useState([]);
  const [sockTyping, setSockTyping] = useState(null);
  const [typing, setTyping] = useState("");

  //////////////////////////////////////////////////////////////////USE EFECT
  useEffect(() => {
    var api = new JsonRpcClient({
      endpoint: "http://localhost:8080/api/chat",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    api.request("getMessages", props.user.id).then(
      function(messagesFromServer) {
        setMessages(messagesFromServer);
      }.bind(this)
    );
    var objDiv = document.getElementById("to_scroll");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, []);

  ////////////////////////////////////////////////////////////////
  function onConnected() {}
  const sendMessage = () => {
    if (sock) {
      // send a message to the server
      const request = {
        jsonrpc: "2.0",
        method: "sendClientMessage",
        params: [props.user.id, messageToSend],
        id: 1,
      };
      sock.sendMessage(
        "/app/user/" + props.user.id + "/message",
        JSON.stringify(request)
      );
    }
  };

  const handleChange = (e) => {
    setMessageToSend(e.target.value);
    sendTypingMessage();
  };
  const handleSubmit = () => {
    sendMessage();
    setMessageToSend("");
  };

  const handleReceiveMessage = (msg) => {
    setMessages(messages.concat(msg.result));
    var objDiv = document.getElementById("to_scroll");
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  ////////////////////////////////////////////////////////typing
  const handleTypingMessage = (msg) => {
    if (msg.result.userId !== props.user.id) {
      setTyping("Typing...");
      const timer = setTimeout(() => {
        setTyping("");
      }, 1000);
    }
  };
  const sendTypingMessage = (msg) => {
    if (sockTyping) {
      // send a message to the server
      const request = {
        jsonrpc: "2.0",
        method: "sendTypingMessage",
        params: [props.user.id],
        id: 1,
      };
      sockTyping.sendMessage(
        "/app/user/" + props.user.id + "/typing",
        JSON.stringify(request)
      );
    }
  };
  ////////////////////////////////////////////////////
  return (
    <div className="content">
      <div class="container p-0">
        <div class="card">
          <div class="row g-0">
            <div class="col-12 col-lg-5 col-xl-3 border-right" />
            <div class="col-12 col-lg-7 col-xl-9">
              <div class="py-2 px-4 border-bottom d-none d-lg-block">
                <div class="d-flex align-items-center py-1">
                  <div class="position-relative">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      class="rounded-circle mr-1"
                      alt="Sharon Lessman"
                      width="40"
                      height="40"
                    />
                  </div>
                  <div class="flex-grow-1 pl-3">
                    <strong>Admin</strong>
                    <div class="text-muted small">
                      <em>{typing}</em>
                    </div>
                  </div>
                </div>
              </div>

              <div class="position-relative">
                <div class="chat-messages p-4" id="to_scroll">
                  {messages.map((message, index) => {
                    if (message.transmitter.userId === props.user.id)
                      return (
                        <div class="chat-message-right pb-4">
                          <div>
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              class="rounded-circle mr-1"
                              alt="Chris Wood"
                              width="40"
                              height="40"
                            />
                          </div>
                          <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                            <div class="font-weight-bold mb-1">You</div>
                            {message.content}
                            <div class="text-muted small text-nowrap mt-2">
                              {message.time}{" "}
                              <p>{message.state ? "read" : "unread"}</p>
                            </div>
                          </div>
                        </div>
                      );
                    else
                      return (
                        <div class="chat-message-left pb-4">
                          <div>
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar3.png"
                              class="rounded-circle mr-1"
                              alt="Sharon Lessman"
                              width="40"
                              height="40"
                            />
                          </div>
                          <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                            <div class="font-weight-bold mb-1">Admin</div>
                            {message.content}
                            <div class="text-muted small text-nowrap mt-2">
                              {message.time}
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </div>

              <div class="flex-grow-0 py-3 px-4 border-top">
                <div className="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type your message"
                    onChange={handleChange}
                    value={messageToSend}
                  />
                  <button class="btn btn-primary" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SockJsClient
          url={HOST.webSocketApi}
          topics={["/topic/" + props.user.id]}
          onConnect={onConnected}
          onMessage={(msg) => handleReceiveMessage(msg)}
          debug={false}
          ref={(client) => {
            setSock(client);
          }}
        />
      </div>

      <div>
        <SockJsClient
          url={HOST.webSocketApi}
          topics={["/topic/" + props.user.id + "/typing"]}
          onConnect={onConnected}
          onMessage={(msg) => handleTypingMessage(msg)}
          debug={false}
          ref={(client) => {
            setSockTyping(client);
          }}
        />
      </div>
    </div>
  );
}

export default ChatMessageClient;

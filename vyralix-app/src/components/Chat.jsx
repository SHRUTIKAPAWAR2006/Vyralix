import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../config";
import "./Chat.css";

// ============================================================================
// EXPERIMENT 8: Real-Time Chat Component using WebSockets (Socket.IO)
// ----------------------------------------------------------------------------
// 1. Manages real-time bidirectional communication between clients and the server
// 2. Uses useRef to persist the single socket connection across re-renders
// 3. Listens for "chatMessage" events and broadcasts to all connected tabs
// ============================================================================

export default function Chat() {
  // State variables for managing chat state
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  // useRef keeps a reference to the active socket instance without causing re-renders
  const socketRef = useRef(null);

  useEffect(() => {
    // 1. Connect to the Socket.IO server (same backend as the REST API)
    const socket = io(API_URL);
    socketRef.current = socket;

    // 2. Handle connection established
    socket.on("connect", () => {
      console.log("Connected to WebSocket server with ID:", socket.id);
      setConnected(true);
    });

    // 3. Handle disconnection
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      setConnected(false);
    });

    // 4. Listen for incoming chat messages broadcast from the server
    socket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // 5. Cleanup function: disconnect the socket when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // Event handler for sending messages
  const sendMessage = (event) => {
    event.preventDefault();

    // Validate: skip if username or message is empty (after trim)
    if (!username.trim() || !message.trim()) {
      return;
    }

    // Emit the "chatMessage" event with payload to the server
    if (socketRef.current) {
      socketRef.current.emit("chatMessage", {
        username: username.trim(),
        message: message.trim(),
      });
    }

    // Clear the message input field after sending
    setMessage("");
  };

  return (
    <div className="chat-container">
      <h2>Vyralix Live Community Chat</h2>

      {/* Connection Status Indicator */}
      <p className="status">
        Status:{" "}
        {connected ? (
          <span className="status-connected">● Connected</span>
        ) : (
          <span className="status-connecting">○ Connecting...</span>
        )}
      </p>

      {/* Scrollable Messages Box */}
      <div className="messages-box">
        {messages.length === 0 ? (
          <p className="no-messages">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="message-item">
              <strong className="message-user">{msg.username}:</strong>{" "}
              <span className="message-text">{msg.message}</span>
            </div>
          ))
        )}
      </div>

      {/* Message Submission Form */}
      <form onSubmit={sendMessage} className="chat-form">
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="chat-input username-input"
        />

        <div className="message-input-row">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-input message-input"
          />
          <button type="submit" className="chat-send-btn">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

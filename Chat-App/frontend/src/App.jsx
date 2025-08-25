import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]); // { text, sender: 'me' | 'other' }
  const [input, setInput] = useState("");
  const [clientId] = useState(() => (
    Math.random().toString(36).slice(2) + Date.now().toString(36)
  ));

  useEffect(() => {

    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("Connected to   server ");
    };

    socket.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        const text = parsed.text || String(event.data);
        const isMe = parsed.senderId === clientId;
        setMessages((prev) => [
          ...prev,
          { text, sender: isMe ? 'me' : 'other' }
        ]);
      } catch (e) {
        // Fallback for plain text messages
        setMessages((prev) => [
          ...prev,
          { text: String(event.data), sender: 'other' }
        ]);
      }
    };

    socket.onclose = () => {
      console.log("Disconnected ");
    };

    setWs(socket);


    return () => {
      socket.close();
    };
  }, [clientId]);


  const sendMessage = () => {
    if (ws && input.trim() !== "") {
      const text = input.trim();
      const payload = JSON.stringify({ senderId: clientId, text });
      ws.send(payload);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "16px", maxWidth: "740px", margin: "0 auto" }}>
      <h2 style={{ margin: 0, marginBottom: "10px" }}>WebSocket Chat</h2>

      <div
        style={{
          border: "1px solid #e5e7eb",
          padding: "12px",
          height: "60vh",
          overflowY: "auto",
          marginBottom: "10px",
          background: "#fafafa",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >
        {messages.map((msg, index) => {
          const isMe = msg.sender === 'me';
          return (
            <div
              key={index}
              style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}
            >
              <div
                style={{
                  maxWidth: '75%',
                  padding: '8px 12px',
                  borderRadius: 12,
                  background: isMe ? '#DCF8C6' : '#ffffff',
                  border: '1px solid #e5e7eb',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  color: isMe ? 'black' : 'black'
                }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
        placeholder="Type a message..."
        style={{ padding: "10px", width: "70%", border: '1px solid #e5e7eb', borderRadius: 8 }}
      />
      <button onClick={sendMessage} style={{ padding: "10px 14px", marginLeft: "6px", borderRadius: 8 }}>
        Send
      </button>
    </div>
  );
}

export default App

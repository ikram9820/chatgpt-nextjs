import ChatLog from "@/components/chatlog";
import Models from "@/components/models";
import { useEffect, useState } from "react";

export default function Home(props) {
  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("ada");
  const [chatLog, setChatLog] = useState([
    { user: "gpt", message: "how can I help you " },
  ]);

  function handleClearLog() {
    setChatLog([]);
    setCurrentModel("ada");
  }

  useEffect(() => {
    fetch("/api/chatgpt")
      .then((res) => res.json())
      .then((data) => {
        setModels(data.data);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let newChatLog = [...chatLog, { user: "me", message: `${input}` }];
    setChatLog(newChatLog);
    setInput(" ");

    const messages = newChatLog.map((msg) => msg.message).join("\n");
    fetch(`/api/chatgpt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        model: currentModel,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const gptChatLog = [
          ...newChatLog,
          { user: "gpt", message: `${data.message}` },
        ];
        setChatLog(gptChatLog);
      });
  }

  return (
    <div className="App">
      <aside className="asidemenu">
        <div onClick={handleClearLog} className="sidemenubutton">
          <span>+</span>
          New Chat
        </div>
        <Models
          models={models}
          currentModel={currentModel}
          onModelChange={(e) => setCurrentModel(e.target.value)}
        />
      </aside>
      <section className="chatbox">
        <ChatLog chatLog={chatLog} />

        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input"
            />
          </form>
        </div>
      </section>
    </div>
  );
}


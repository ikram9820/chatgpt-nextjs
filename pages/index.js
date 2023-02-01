export default function Home(props) {
  return (
    <div className="App">
      <aside className="asidemenu">
        <div className="sidemenubutton">
          <span>+</span>New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          <div className="chat-message">
            <div className="chat-message-center">
              <div className="avatar"></div>
              <div className="message">hello</div>
            </div>
          </div>
          <div className="chat-message chatgpt">
            <div className="chat-message-center">
              <div className="avatar chatgpt">
                <img src="chatgpt.png" />
              </div>
              <div className="message">hello from ai</div>
            </div>
          </div>
        </div>

        <div className="chat-input-holder">
          <textarea className="chat-input-textarea" rows="1"></textarea>
        </div>
      </section>
    </div>
  );
}


import { useState, useRef, useEffect } from "react";
import axios from "axios";

function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  const basePrompt = ` and your name is gini a bot assigned the duty to assist with questions that users will have on the platform. about the platform, you are in a platform called Lest go developed by the team ogs (athul Adarsh nourin noushi) as their final year project . what the project does is that it serves as a platform to show places that are unexplored and not popular the users who know such places can add it in this using the add feature about ,the add page has few questions like place name , place type and other general questions 
  the user is suppose to fill them correctly and hit the submit button the thing to keep in mind is that in the question called link the user is suppose to add the location link of the place from the google maps if you know you can provide a tutorial of how to take that 
  and like that the user can add a place to the list . Apart from this feature there is also another called campaign in this user can host the campaign or join an existing one to clean and restore a place one can join using the join button on the campaign list and one can 
  host one by clicking the host button on the campaign page and filling in the required data. base on the information's provided now answer the questions politely friendly and in a fun way keeping the conversation as short as possible and exciting keep in mind introduce yourself only if someone ask about you  if you dont understand just say sorry i didnt get it    `

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    const currentQuestion = question;
    setQuestion("");
    setGeneratingAnswer(true);

    setChatHistory((prev) => [...prev, { type: "user", content: currentQuestion }]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDC2MSSj_5U4c52GK4v6eVwCj28CG0ygj4`,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `${basePrompt}\nQuestion: ${currentQuestion}\nResponse:`,
                },
              ],
            },
          ],
        },
      });

      const aiResponse =
        response.data.candidates[0]?.content?.parts[0]?.text ||
        "Sorry, I couldn't process that.";

      setChatHistory((prev) => [...prev, { type: "bot", content: aiResponse }]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", content: "Error: Unable to process the request." },
      ]);
    }

    setGeneratingAnswer(false);
  }

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <>
      <div className="chatbot-icon" onClick={toggleChat}>
        <img src="src/assets/sloth.png" alt="Chat Icon" className="chat-icon-img" />
      </div>

      {isChatOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <span>Gini</span>
            <button className="close-btn" onClick={toggleChat}>
              ✖
            </button>
          </div>
          <div ref={chatContainerRef} className="chat-content">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`chat-message ${chat.type === "user" ? "user" : "bot"}`}
              >
                {chat.content}
              </div>
            ))}
            {generatingAnswer && <div className="chat-message bot">Typing...</div>}
          </div>

          <form onSubmit={generateAnswer} className="chat-form">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
              required
            />
            <button
              type="submit"
              className="send-button"
              disabled={generatingAnswer}
            >
              <img src="/send-icon.png" alt="Send" className="send-icon" />
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        /* Chatbot icon styling */
        .chatbot-icon {
          position: fixed;
          bottom: 309px;
          right: 1px;
          border-radius: 50%;
          padding: 12px;
          cursor: pointer;
          z-index: 1000;
          background-color: #4caf50;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
        }

        .chat-icon-img {
          width: 40px;
          height: 40px;
        }

        /* Chat popup */
        .chat-popup {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 100%;
          max-width: 375px;
          height: 80%;
          max-height: 600px;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          z-index: 9999;
        }

        .chat-header {
          background-color: #4caf50;
          color: white;
          padding: 12px;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 16px 16px 0 0;
        }

        .chat-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background-color: #f9fafb;
        }

        .chat-message {
          padding: 10px;
          border-radius: 16px;
          max-width: 75%;
          word-wrap: break-word;
        }

        .chat-message.user {
          background-color: #4caf50;
          color: white;
          align-self: flex-end;
        }

        .chat-message.bot {
          background-color: #e0e0e0;
          color: black;
          align-self: flex-start;
        }

        .chat-form {
          display: flex;
          padding: 10px;
          background-color: #f9fafb;
          gap: 8px;
        }

        .chat-input {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          resize: none;
        }

        .send-button {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .send-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .send-icon {
          width: 20px;
          height: 20px;
        }

        .close-btn {
          background: none;
          color: white;
          border: none;
          font-size: 18px;
          cursor: pointer;
        }

        /* Responsiveness */
        @media (max-width: 768px) {
          .chat-popup {
            bottom: 10px;
            right: 10px;
            width: 90%;
            height: 75%;
          }
        }

        @media (max-width: 480px) {
          .chat-popup {
            height: 65%;
          }

          .chat-header {
            font-size: 14px;
          }

          .chat-message {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}

export default Chat;

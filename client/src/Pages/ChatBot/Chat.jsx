import React, { useState, useEffect } from "react";
import Authenticate from "./Authenticate";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthUser, chatResponse } from "../../actions/DarkMode";
import { IoMdSend } from "react-icons/io";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import runChat from "../../Gemini";

function TypingEffect({ text }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let interval;
    if (text.length <= 50) {
      interval = setInterval(() => {
        setDisplayText((prevText) => {
          if (prevText.length === text.length) {
            clearInterval(interval);
            return prevText;
          }
          return text.substring(0, prevText.length + 1);
        });
      }, 50);
    } else {
      interval = setInterval(() => {
        setDisplayText((prevText) => {
          if (prevText.length === text.length) {
            clearInterval(interval);
            return prevText;
          }
          return text.substring(0, prevText.length + 1);
        });
      }, 50);
      setTimeout(() => {
        clearInterval(interval);
        setDisplayText(text);
      }, 3000); // Set a timeout to display the entire text after 3 seconds
    }

    return () => clearInterval(interval);
  }, [text]);

  return <div dangerouslySetInnerHTML={{ __html: displayText }} />;
}

function Chat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useRecoilState(chatResponse);
  const [asked, setAsked] = useState(false);
  const userId = useRecoilValue(AuthUser);

  const askQuestion = async () => {
    if (userId && question !== "") {
      try {
        setAsked(true);
        setResponse([
          ...response,
          { question: question, answer: "Loading Answer ...." },
        ]);
        setQuestion("");
        const data = await runChat(question);
        let resArray = data.split("**");
        let newResponse = "";
        for (let i = 0; i < resArray.length; i++) {
          if (i === 0 || i % 2 != 1) {
            newResponse += resArray[i];
          } else {
            newResponse += "<b>" + resArray[i] + "</b>";
          }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        setResponse((prevResponses) => {
          const updatedResponses = prevResponses.map((item, index) => {
            if (index === prevResponses.length - 1) {
              return { ...item, answer: newResponse2 }; // Update the last item's answer
            }
            return item;
          });
          return updatedResponses;
        });

        setAsked(false);
      } catch (err) {
        alert(err);
        setResponse((prevResponses) => {
          const updatedResponses = [...prevResponses];
          updatedResponses.pop();
          return updatedResponses;
        });
        setAsked(false);
      }
    }
  };

  const clearChat = () => {
    setResponse([]);
  };

  return (
    <>
      {userId ? (
        <div className="lg:h-[93vh] w-full md:w-[50%] p-2 lg:w-[50%] md:h-[90vh] h-[81vh] " style={{marginTop:'3rem',overflow:"hidden"}}>
          <div className="flex items-center justify-between h-5">
            <h1 className="text-1xl lg:text-2xl md:text-2xl font-semibold text-center">
              AI Powered Chat Bot
            </h1>
            <button
              className={`
               mt-2
              ${
                response.length === 0
                  ? "bg-gray-300"
                  : "bg-blue-500 hover:bg-blue-600"
              } p-2 rounded-xl text-black font-semibold`}
              onClick={response.length === 0 ? undefined : clearChat}
            >
              Clear Chat
            </button>
          </div>
          <div className="h-screen">
            <div
              className="h-[62vh] lg:h-[78vh] md:h-[78vh] overflow-y-auto p-2 mb-2 rounded-lg mt-5"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "transparent transparent",
              }}
            >
              {response &&
                response.map((e, index) => {
                  const trimmedAnswer = e.answer.trim();
                  const containsCode = trimmedAnswer.includes("```");

                  return (
                    <div
                      className="bg-opacity-30 bg-gray-400 border-2 p-2"
                      key={index}
                    >
                      <p className="font-bold">Question</p>
                      <p>{e.question}</p>
                      <br />
                      <p className="font-bold">Answer</p>
                      {index === response.length - 1 ? (
                        containsCode ? (
                          <SyntaxHighlighter
                            language="javascript"
                            style={docco}
                          >
                            {trimmedAnswer.replace(/```/g, "")}{" "}
                          </SyntaxHighlighter>
                        ) : (
                          <TypingEffect text={e.answer} />
                        )
                      ) : containsCode ? (
                        <SyntaxHighlighter language="javascript" style={docco}>
                          {trimmedAnswer.replace(/```/g, "")}{" "}
                        </SyntaxHighlighter>
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: e.answer }} />
                      )}
                      <br />
                    </div>
                  );
                })}
            </div>
            <div className="flex items-center justify-center">
              <textarea
                className="h-12 w-full p-2 rounded-lg text-black border-2 outline-none"
                placeholder="Ask Your Questions..."
                type="text"
                value={question}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.shiftKey) setQuestion(question);
                  else if (e.key === "Enter" && !asked) askQuestion();
                }}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <IoMdSend
                className={`text-3xl ${
                  !asked && "hover:text-gray-300"
                } cursor-pointer ml-5 ${asked && "text-gray-900"}`}
                onClick={!asked && askQuestion}
              />
            </div>
          </div>
        </div>
      ) : (
        <Authenticate />
      )}
    </>
  );
}

export default Chat;

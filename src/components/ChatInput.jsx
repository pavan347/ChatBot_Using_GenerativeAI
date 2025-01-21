import React, { useRef } from "react";
import { FiSend } from "react-icons/fi";

const ChatInput = ({ chatHistory, setchatHistory, generateResponse }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) {
      return;
    }
    inputRef.current.value = "";
    setchatHistory((prev) => [...prev, { role: "user", text: userMessage }]);
    setTimeout(() => {
      setchatHistory((prev) => [
        ...prev,
        { role: "model", text: "Thinking..." },
      ]);

      generateResponse([
        ...chatHistory,
        {
          role: "user",
          text: userMessage,
        },
      ]);
    }, 600);
  };

  return (
    <form
      action="#"
      onSubmit={handleSubmit}
      className="flex items-center justify-between"
    >
      <input
        type="text"
        ref={inputRef}
        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-blue-600"
        placeholder="Type a text..."
        required
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-md ml-2"
      >
        <FiSend />
      </button>
    </form>
  );
};

export default ChatInput;

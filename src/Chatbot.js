import React, { useEffect, useState } from 'react';

const Chatbot = () => {
  const [isChatbotLoaded, setIsChatbotLoaded] = useState(false);

  useEffect(() => {
    if (!isChatbotLoaded) {
      const script = document.createElement('script');
      script.src = "https://www.chatbob.co/embed.js";
      script.id = "lI3pccWnSTGYwnMU1SS0JQ";
      script.defer = true;
      script.onload = () => {
        setIsChatbotLoaded(true);
      };
      document.body.appendChild(script);
    }
  }, [isChatbotLoaded]);

  if (!isChatbotLoaded) {
    return <button onClick={() => setIsChatbotLoaded(true)}>Activate Chatbot</button>;
  }

  return null;
};

export default Chatbot;

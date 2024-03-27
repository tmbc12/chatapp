import ChatSidebar  from "components/ChatSidebar/ChatSidebar";
import Head from "next/head";
import { streamReader } from "openai-edge-stream";
import { useState } from "react";

export default function ChatPage() {

  const [messageText, setMessageText] = useState("");

  const handelSumbit = async (e) => {
    e.preventDefault();
    console.log("MESSAGE TEXT", messageText);
    const response = await fetch(`/api/chat/sendMessage`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ message: messageText }),
    });
    const data = response.data;
    if(!data){
      return;
    }

    const reader = data.getReader();
    await streamReader(reader, (message) =>{
      console.log("MESSAGE: ", message)
    });
  };


  return (
    <div>
      <Head>
        <title>New Chat</title>
      </Head>
      <div className=" grid h-screen grid-cols-[260px_1fr]">
        <ChatSidebar />
        <div className=" bg-gray-700 text-white flex flex-col">
          <div className=" flex-1">Chat Window</div>
          <footer className=" bg-gray-800 p-10">
            <form onSubmit={handelSumbit}>
              <fieldset className=" flex gap-2">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className=" w-full resize-none rounded-md bg-gray-700 p-2 text-white focus:border-emerald-500 focus:bg-slate-600 focus:outline focus:outline-emerald-500" placeholder="Send a message..." />
                <button type="submit"
                  className=" btn"
                >
                  Send
                </button>
              </fieldset>
            </form>
          </footer>
        </div>
      </div>
    </div>
  );
}

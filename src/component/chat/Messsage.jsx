import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { api } from "../../APIRoutes/routes";

const socket = io("https://ethio-capital-back-end-2.onrender.com");

const Message = ({ conversationId, userId, ideaId, otherUserId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [investors, setInvestors] = useState([]);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const messagesStartRef = useRef(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Fetch investors from the database
  useEffect(() => {
    setLoading(true);

    axios
      .get("/user/conversations") // No need to send userId
      .then((res) => {
        const investors = res.data || [];
        console.log(investors);
        setInvestors(investors);
      })
      .catch((err) => {
        console.error("Error fetching investors:", err);
        setError("Failed to fetch investors.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // mock investors
  // const investorss = [
  //   {
  //     _id: "1",
  //     fullName: "John Smith",
  //     role: "Chairman (Entrepreneur)",
  //     profileImage: "https://example.com/john.jpg",
  //   },
  //   {
  //     _id: "2",
  //     fullName: "Sarah Johnson",
  //     role: "Lead Investor",
  //     profileImage: "https://example.com/sarah.jpg",
  //   },
  //   // Add more investors...
  // ];

  // Fetch messages for the selected conversation
  useEffect(() => {
    if (conversationId) {
      socket.emit("joinRoom", conversationId);

      axios
        .get(`/fetch-messages/${conversationId}/${ideaId}`)
        .then((res) => {
          setInvestors([res.data]);
        })
        .catch((err) => console.log(err));

      socket.on("message", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [conversationId]);

  useEffect(() => {
    setMessages([]); // Clear previous messages to avoid showing the old chat
    if (selectedInvestor) {
      fetchMessages(selectedInvestor._id);
    }
  }, [selectedInvestor]);

  const fetchMessages = async (investorId) => {
    try {
      const response = await axios.get(
        `/fetch-messages-for-user/${investorId}`
      );
      setMessages(response.data); // Update messages
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  // Scroll to the bottom of the chat
  useEffect(() => {
    if (messagesStartRef.current) {
      messagesStartRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  // Send a new message
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const messageData = {
        conversationId,
        sender: userId,
        text: input,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, messageData]);
      socket.emit("sendMessage", messageData);
      setInput("");
    }
  };

  // Sort messages by timestamp
  const sortedMessages = [...messages].sort((a, b) => {
    const aTime = new Date(a.timestamp).getTime();
    const bTime = new Date(b.timestamp).getTime();
    return aTime - bTime;
  });

  return (
    <div className="flex h-[500px] bg-white rounded-lg shadow-lg">
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 bg-blue-600 text-white rounded-t-lg">
          <h2 className="text-lg font-semibold">Investors</h2>
        </div>
        <div className="overflow-y-auto custom-scrollbar">
          {loading ? ( // Show loading indicator while fetching data
            <p>Loading...</p>
          ) : error ? ( // Show error message if there's an error
            <p>{error}</p>
          ) : investors === null ? ( // Show nothing if data is not yet fetched
            <p>Fetching data...</p>
          ) : investors.length === 0 ? ( // Show "No investors available" if data is empty
            <p>No investors available.</p>
          ) : (
            investors.map((investor) => (
              <div
                key={investor._id}
                className="p-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelectedInvestor(investor)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={investor.profileImage}
                    alt={investor.fullName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{investor.fullName}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-2/3 flex flex-col">
        {/* Display Investor Details */}
        {selectedInvestor && (
          <div className="p-4 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <img
                src={selectedInvestor.profileImage}
                alt={selectedInvestor.fullName}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">
                Chat with {selectedInvestor.fullName}
              </span>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {sortedMessages.map((message, index) => (
            <div
              key={message._id || index} // Fallback to index if _id is missing
              className={`mb-2 flex ${
                message.sender === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.sender === userId ? "bg-blue-200" : "bg-gray-200"
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          <div ref={messagesStartRef} />
        </div>

        {/* Message Input and Video Chat Button */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
            <button
              type="button"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={() => alert("Start Video Chat")}
            >
              Video Chat
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;

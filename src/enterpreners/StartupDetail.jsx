<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  clearBussinessIdea,
  setBussinessIdea,
  setSelectedBusinessIdea,
  fetchBusinessIdeaById,
} from "../redux/BussinessIdeaSlice";
import Message from "../component/chat/Messsage";
import setupAxios from "../middleware/MiddleWare";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/UserSlice";
import { use } from "react";
import { set } from "react-hook-form";
=======
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearBussinessIdea, setBussinessIdea, setSelectedBusinessIdea, fetchBusinessIdeaById } from '../redux/BussinessIdeaSlice';
import Message from '../component/chat/Messsage';
import setupAxios from '../middleware/MiddleWare';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../redux/UserSlice';
>>>>>>> a944d251ce913091641e22fdbef490862c228348

const StartupDetail = () => {
  const navigate = useNavigate();
  const [isInterested, setIsInterested] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [interestCount, setInterestCount] = useState(847);
  const [ideaDetails, setIdeaDetails] = useState({});
  const [conversationId, setConversationId] = useState("");

  const { id } = useParams();
  useEffect(() => {
    setupAxios();
  }, []);

  const dispatch = useDispatch();
<<<<<<< HEAD
  // Change default to an empty object (if it's an object) or null (if it's possibly null)
  const selectedBusinessIdea = useSelector(
    (state) => state.businessIdea.selectedBusinessIdea
  );
  const bussinessIdea = useSelector(
    (state) => state.businessIdea.BussinessIdea
  );
=======
  const selectedBusinessIdea = useSelector((state) => state.businessIdea.selectedBusinessIdea);
  const bussinessIdea = useSelector((state) => state.businessIdea.BussinessIdea);
>>>>>>> a944d251ce913091641e22fdbef490862c228348
  const bussinessIdeaArray = Array.isArray(bussinessIdea)
    ? bussinessIdea
    : Object.values(bussinessIdea || {});

  const userData = useSelector((state) => state.userData);

  useEffect(() => {
<<<<<<< HEAD
    dispatch(fetchUserData()); // Ensure this function is being called
  }, [dispatch]);
=======
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleInvestNow = () => {
    navigate('/PaymentForm');
  };
>>>>>>> a944d251ce913091641e22fdbef490862c228348

  const handleInterestSubmit = () => {
    setIsInterested(true);
    setInterestCount((prev) => prev + 1);
  };

  const handleSaveIdea = () => {
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    const selectedIdea = bussinessIdeaArray.find((idea) => idea._id === id);
<<<<<<< HEAD
    // console.log("selectedIdea:", selectedIdea);
    // If there is no selected idea or if the list has just been fetched, filter based on ID
    if (!selectedBusinessIdea || bussinessIdeaArray?.length > 0) {
      // console.log(" selectedBusinessIdea is null or empty");

      const selectedIdea = bussinessIdeaArray.find((idea) => idea._id === id);
      // console.log("selectedIdea:", selectedIdea);

      if (selectedIdea) {
        // console.log("selectedIdea is not null");

        dispatch(setSelectedBusinessIdea(selectedIdea)); // Dispatch action to set selected business idea
        setIdeaDetails(selectedIdea); // Update state with the selected business idea
        // console.log("BussinessIdea Data inside useEffect:", selectedIdea);
      }
    }
  }, [dispatch, id, bussinessIdea, selectedBusinessIdea]);

  // Assuming you have access to the current user's ID and a navigate function:
  const startConversation = async (e, otherUserId, currentUserId, ideaId) => {
    e.preventDefault();
    try {
      // console.log("otherUserId", otherUserId);
      // console.log("currentUserId", currentUserId);
      const response = await axios.post("/conversation-fetch", {
        participants: [currentUserId, otherUserId],
        ideaId,
      });

      // Assuming your backend returns the conversation document
      const conversationId = response.data._id;
      setConversationId(conversationId);

      // console.log(" user data for conversation", conversationId);
      // Navigate to the chat page using the conversation ID
      setShowChat(!showChat);
    } catch (error) {
      console.error("Error starting conversation:", error);
=======
    if (selectedIdea) {
      dispatch(setSelectedBusinessIdea(selectedIdea));
      setIdeaDetails(selectedIdea);
    }
  }, [dispatch, id, bussinessIdea, selectedBusinessIdea]);

  const startConversation = async (e, otherUserId, currentUserId, ideaId) => {
    e.preventDefault();
    try {
      const response = await axios.post('/conversation-fetch', {
        participants: [currentUserId, otherUserId],
        ideaId
      });
      const conversationId = response.data._id;
      setConversationId(conversationId);
      setShowChat(!showChat);
    } catch (error) {
      console.error('Error starting conversation:', error);
>>>>>>> a944d251ce913091641e22fdbef490862c228348
    }
  };

  const calculateProgress = (raised, target) => {
    return (raised / target) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 bg-white p-2 rounded-full shadow-lg z-10"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Entrepreneur Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white rounded-lg shadow-lg w-auto">
          {" "}
          {/* Increased width to w-96 */}
          {/* Chat Header */}
          <div
            className="p-4 bg-blue-600 text-white rounded-t-lg cursor-pointer flex justify-between items-center hover:bg-blue-700 transition-colors duration-200"
            onClick={(e) =>
              startConversation(
                e,
                ideaDetails.user._id,
                userData.userData._id,
                ideaDetails._id
              )
            }
          >
            <div className="flex items-center gap-3">
              {" "}
              {/* Increased gap to gap-3 */}
              <img
                src={ideaDetails?.entrepreneurImage}
                alt={ideaDetails?.entrepreneurName}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">
                Chat with {ideaDetails?.user?.fullName}
              </span>{" "}
              {/* Added font-medium */}
            </div>
            <span className="text-xl font-semibold">
              {showChat ? "−" : "+"}
            </span>{" "}
            {/* Improved toggle button */}
          </div>
          {/* Chat Body */}
          {showChat && (
<<<<<<< HEAD
            <Message
              conversationId={conversationId}
              userId={userData.userData._id}
              ideaId={ideaDetails._id}
              otherUserId={ideaDetails.user._id} // Pass the investor's ID here
            />
=======
            <Message conversationId={conversationId} userId={userData.userData._id} ideaId={ideaDetails._id} />
>>>>>>> a944d251ce913091641e22fdbef490862c228348
          )}
        </div>
      </div>
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={ideaDetails?.entrepreneurImage}
              alt={bussinessIdea?.entrepreneurName}
              className="w-32 h-32 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {ideaDetails.title}
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                by {ideaDetails?.user?.fullName}
              </p>
              <p className="text-gray-500 mt-1">
                {ideaDetails.entrepreneurLocation}
              </p>
              <div className="flex gap-4 mt-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {ideaDetails.currentStage}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Seeking {ideaDetails.fundingNeeded}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Main Information */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-600">{ideaDetails.overview}</p>
            </section>

            {/* Entrepreneur Background */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">
                Entrepreneur Background
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700">Education</h3>
                  <p className="text-gray-600">
                    {ideaDetails.entrepreneurEducation}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Experience</h3>
                  <p className="text-gray-600">
                    {ideaDetails.entrepreneurBackground}
                  </p>
                </div>
              </div>
            </section>

            {/* Problem & Solution */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Problem Statement</h2>
              <p className="text-gray-600 mb-6">
                {ideaDetails.problemStatement}
              </p>
              <h2 className="text-2xl font-bold mb-4">Solution</h2>
              <p className="text-gray-600">{ideaDetails.solution}</p>
            </section>

            {/* Funding Progress Visualization */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-6">Funding Progress</h2>
              <div className="flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${calculateProgress(
<<<<<<< HEAD
                        ideaDetails?.fundingRaised
                          ? ideaDetails.fundingRaised.replace(/\D/g, "")
                          : "0",
                        ideaDetails?.fundingNeeded
                          ? ideaDetails.fundingNeeded.replace(/\D/g, "")
                          : "1"
=======
                        ideaDetails?.fundingRaised ? ideaDetails.fundingRaised.replace(/\D/g, '') : '0',
                        ideaDetails?.fundingNeeded ? ideaDetails.fundingNeeded.replace(/\D/g, '') : '1'
>>>>>>> a944d251ce913091641e22fdbef490862c228348
                      )} 283`}
                      transform="rotate(-90 50 50)"
                    />
                    <text
                      x="50"
                      y="45"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#374151"
                    >
                      {ideaDetails.fundingRaised}
                    </text>
                    <text
                      x="50"
                      y="65"
                      textAnchor="middle"
                      fontSize="8"
                      fill="#6b7280"
                    >
                      of {ideaDetails.fundingNeeded}
                    </text>
                  </svg>
                </div>
                <div className="ml-8">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Valuation</p>
                    <p className="text-lg font-bold">
                      {ideaDetails?.financials?.valuation || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Break Even</p>
                    <p className="text-lg font-bold">
                      {ideaDetails?.financials?.breakEvenPoint || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Traction */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Traction</h2>
              <ul className="list-disc list-inside space-y-2">
                {ideaDetails?.traction?.length > 0 ? (
                  ideaDetails.traction.map((item, index) => (
                    <li key={index} className="text-gray-600">
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No traction data available</li>
                )}
              </ul>
            </section>

            {/* Financial Projections */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Financial Projections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700">Revenue 2023</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {ideaDetails?.financials?.revenue2023}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">
                    Projected Revenue 2024
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {ideaDetails?.financials?.projectedRevenue2024}
                  </p>
                </div>
              </div>
            </section>

            {/* Team */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ideaDetails?.team?.length > 0 ? (
                  ideaDetails.team.map((member, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-bold">{member.name}</h3>
                      <p className="text-gray-600">{member.role}</p>
                      <p className="text-sm text-gray-500">
                        {member.expertise}
                      </p>
                    </div>
                  ))
                ) : (
                  <li className="text-gray-400">No Team Member available</li>
                )}
              </div>
            </section>

            {/* Documents Section */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Documents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<<<<<<< HEAD
                {ideaDetails?.documents &&
                Object.keys(ideaDetails.documents).length > 0 ? (
                  Object.entries(ideaDetails.documents).map(
                    ([docName, docValue], index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          {/* Icon (Modify based on file type if available) */}
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          {/* Document Name */}
                          <div>
                            <h3 className="font-semibold">
                              {docName.replace(/([A-Z])/g, " $1").trim()}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {docValue ? "Available" : "Not Uploaded"}
                            </p>
                          </div>
=======
                {ideaDetails?.documents && Object.keys(ideaDetails.documents).length > 0 ? (
                  Object.entries(ideaDetails.documents).map(([docName, docValue], index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <div>
                          <h3 className="font-semibold">{docName.replace(/([A-Z])/g, ' $1').trim()}</h3>
                          <p className="text-sm text-gray-500">{docValue ? "Available" : "Not Uploaded"}</p>
>>>>>>> a944d251ce913091641e22fdbef490862c228348
                        </div>
                        {/* View Link (Only show if document exists) */}
                        {docValue && (
                          <a
                            href={`/documents/${docValue}`}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        )}
                      </div>
<<<<<<< HEAD
                    )
                  )
=======
                      {docValue && (
                        <a
                          href={`/documents/${docValue}`}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      )}
                    </div>
                  ))
>>>>>>> a944d251ce913091641e22fdbef490862c228348
                ) : (
                  <p className="text-gray-400">No documents available</p>
                )}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Invest Now Button */}
            <div className="bg-white p-6 rounded-lg shadow relative overflow-hidden group">
              <button
                onClick={handleInvestNow}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg
                         transform transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-blue-700
                         active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  INVEST NOW
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
            </div>

            {/* Save Idea */}
            <div className="bg-white p-6 rounded-lg shadow">
              <button
                onClick={handleSaveIdea}
                className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg font-semibold transition-colors ${
                  isSaved
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    isSaved ? "text-white" : "text-gray-500"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                {isSaved ? "Saved" : "Save Idea"}
              </button>
            </div>

            {/* Market Size */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Market Size</h2>
              <p className="text-gray-600">{ideaDetails.marketSize}</p>
            </div>

            {/* Use of Funds */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Use of Funds</h2>
              <ul className="list-disc list-inside space-y-2">
                {ideaDetails?.useOfFunds?.length > 0 ? (
                  ideaDetails.useOfFunds.map((item, index) => (
                    <li key={index} className="text-gray-600">
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No use of funds available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
<<<<<<< HEAD
export default StartupDetail;
=======

export default StartupDetail;
>>>>>>> a944d251ce913091641e22fdbef490862c228348

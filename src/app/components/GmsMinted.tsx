"use client";
import { useState, useEffect } from "react";

export default function RecentGMs() {
  const [recentGMs, setRecentGMs] = useState([]);
  const [currentBlock, setCurrentBlock] = useState("");

  useEffect(() => {
    const fetchRecentGMs = async () => {
      try {
        // Placeholder data for testing
        const data = [
          {
            timestamp: "2024-05-23T12:00:00Z",
            blockId: "0xabc1234",
            walletAddress: "0x1234abcd",
            avatarUrl: "https://via.placeholder.com/50",
            gmsMinted: 5,
            txUrl: "https://basescan.io/tx/0xabc1234",
          },
          {
            timestamp: "2024-05-23T12:10:00Z",
            blockId: "0xdef5678",
            walletAddress: "0x2345bcde",
            avatarUrl: "https://via.placeholder.com/50",
            gmsMinted: 10,
            txUrl: "https://basescan.io/tx/0xdef5678",
          },
          {
            timestamp: "2024-05-23T12:15:00Z",
            blockId: "0xghi9101",
            walletAddress: "0x3456cdef",
            avatarUrl: "https://via.placeholder.com/50",
            gmsMinted: 11,
            txUrl: "https://basescan.io/tx/0xghi9101",
          },
          {
            timestamp: "2024-05-23T12:20:00Z",
            blockId: "0xjkl1121",
            walletAddress: "0x4567def0",
            avatarUrl: "https://via.placeholder.com/50",
            gmsMinted: 2,
            txUrl: "https://basescan.io/tx/0xjkl1121",
          },
          
        ];
        setRecentGMs(data);

        // Placeholder current block ID
        setCurrentBlock("0x9876abcd");
      } catch (error) {
        console.error("Error fetching recent GMs data:", error);
      }
    };

    fetchRecentGMs();
  }, []);

  const truncate = (str, startLength, endLength) => {
    return str.length > startLength + endLength
      ? `${str.substring(0, startLength)}...${str.substring(str.length - endLength)}`
      : str;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <section className="recent-gms-section">
      <h1> LIVE </h1>

      <div className="recent-gms-container">
        {recentGMs.length === 0 ? (
          <p>No data available.</p>
        ) : (
          recentGMs.map((gm, index) => (
            <a
              key={index}
              href={gm.txUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="recent-gm-card"
            >
              <div className="gm-card-avatar">
                <img src={gm.avatarUrl} alt={`${gm.walletAddress}'s avatar`} />
              </div>
              <p>Date: {formatDate(gm.timestamp)}</p>
              <p>Time: {formatTime(gm.timestamp)}</p>
              <p>Wallet: {truncate(gm.walletAddress, 6, 4)}</p>
              <p>GMs Claimed:</p>
              <h2 className="gm-mints">{gm.gmsMinted}</h2>
            </a>
          ))
        )}
      </div>
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";

export default function GmsLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const totalMinted = 420; // Placeholder for total minted, this should be dynamic when integrated with the API

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Placeholder data for testing
        const data = [
          { id: '1', walletAddress: '0x1234abcd', avatarUrl: 'https://via.placeholder.com/50', mints: 170 },
          { id: '2', walletAddress: '0x2345bcde', avatarUrl: 'https://via.placeholder.com/50', mints: 90 },
          { id: '3', walletAddress: '0x3456cdef', avatarUrl: 'https://via.placeholder.com/50', mints: 80 },
          { id: '4', walletAddress: '0x4567def0', avatarUrl: 'https://via.placeholder.com/50', mints: 70 },
          { id: '5', walletAddress: '0x5678ef01', avatarUrl: 'https://via.placeholder.com/50', mints: 10 },
        ];
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  const getProgressBarColor = (percentage) => {
    if (percentage <= 25) {
      return '#c4ff72'; // Light green
    } else if (percentage <= 50) {
      return '#ffc014'; // Yellow
    } else if (percentage <= 75) {
      return '#ff8514'; // Orange
    } else {
      return '#ff0000'; // Red
    }
  };

  return (
    <section className="gm-leaderboard-section">
      <h1>BOARD</h1>
      <h3 id="totalMinted">Total Minted: {totalMinted}</h3>

      <div className="leaderboard-container">
        {leaderboard.length === 0 ? (
          <p>No data available.</p>
        ) : (
          leaderboard.slice(0, 4).map((user, index) => { // Limit to first 4 items
            const percentage = (user.mints / totalMinted) * 100;
            const progressBarColor = getProgressBarColor(percentage);
            const truncatedAddress = `${user.walletAddress.substring(0, 2)}...${user.walletAddress.slice(-4)}`;
            return (
              <div key={user.id} className={`leaderboard-card ${index < 3 ? 'top-three' : ''}`}>
                <a 
                  href={`https://etherscan.io/address/${user.walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leaderboard-link"
                >
                  <div className="leaderboard-header">
                    <div className="leaderboard-rank">{index + 1}</div>
                    <div className="leaderboard-avatar">
                      <img src={user.avatarUrl} alt={`${user.walletAddress}'s avatar`} />
                    </div>
                    <h4 className="leaderboard-wallet">{truncatedAddress}</h4>
                  </div>
                  <div className="leaderboard-mints">
                    <span className="progress-bar-text">{user.mints} GMs ({percentage.toFixed(2)}%)</span>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: progressBarColor
                        }}
                      ></div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })
        )}
      </div>
      <div className="send-button-container">
        <button id="seeMoreButton1" className="action-button">See More</button>
      </div>
      <div id="gmGallery"></div>
    </section>
  );
}

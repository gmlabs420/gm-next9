"use client";
import { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { walletConnect, inAppWallet, createWallet } from "thirdweb/wallets";
import { ThirdwebClient } from "thirdweb";
import DropdownMenu from "./DropdownMenu";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: [
        "email",
        "google",
        "apple",
        "facebook",
        "phone",
      ],
    },
  }),
  createWallet("me.rainbow"),
];

export default function Header({ client }: { client: ThirdwebClient }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="top-nav">
      <div className="left">
        <h1 className="londrina-solid-black">GM!</h1>

        
        <nav className={`dropdown ${isOpen ? 'open' : ''}`}>
          <button id="dropdown-button" className="dropdown-button" aria-haspopup="true" aria-expanded={isOpen} onClick={toggleMenu}>
            <span className="hamburger-icon">&#9776;</span>
          </button>
          <DropdownMenu isOpen={isOpen} />
        </nav>

      </div>

      <div className="center">
        <div className="toggle-container">
          <h2>GM</h2>
          <input type="checkbox" id="pageToggle" hidden checked />
          <label htmlFor="pageToggle" className="toggle-label"></label>
          <h2>GN</h2>
        </div>
      </div>

      <div className="right">
        <div>
          <ConnectButton
            client={client}
            wallets={wallets}
            theme={"dark"}
            connectModal={{ size: "wide" }}
          />
        </div>
      </div>
    </header>
  );
}

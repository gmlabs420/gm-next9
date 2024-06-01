"use client"
import { useState, useEffect } from "react"

export default function QuantityPriceModule() {
    const [gmQuantity, setGMQuantity] = useState(1)
    const [gmTotal, setGMTotal] = useState(0)
    const [ethPriceInUSD, setEthPriceInUSD] = useState(0)

    const gmPrice = 0.000420
    const apiURL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD';

    async function fetchEthPrice() {
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            setEthPriceInUSD(data.ethereum.usd);
        } catch (error) {
            console.error('Failed to fetch ETH price:', error);
        }
    }

    const incQty = async () => {
        setGMQuantity(gmQuantity + 1)
    }

    const decQty = () => {
        if (gmQuantity > 1)
            setGMQuantity(gmQuantity - 1)
    }

    useEffect(() => {
        fetchEthPrice()
    }, [])

    useEffect(() => {
        const totalPriceEth = gmQuantity * gmPrice;
        setGMTotal((totalPriceEth * ethPriceInUSD));
    }, [ethPriceInUSD, gmQuantity, gmPrice])

    const createBurst = (x, y) => {
        for (let i = 0; i < 50; i++) {
            const burstCircle = document.createElement('div');
            burstCircle.className = 'gm-circle-burst';
            burstCircle.textContent = 'GM';
    
            const angle = Math.random() * 2 * Math.PI; // Full circle
            const distance = Math.random() * 300 + 200; // Random distance for burst spread
    
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
    
            burstCircle.style.left = `${x}px`;
            burstCircle.style.top = `${y}px`;
            burstCircle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    
            document.body.appendChild(burstCircle);
    
            setTimeout(() => {
                burstCircle.remove();
            }, 3000); // Adjust to match animation duration
        }
    }

    const createGMCircle = () => {
        const gmCircle = document.createElement('div');
        gmCircle.className = 'gm-circle';
        gmCircle.textContent = 'GM';

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        gmCircle.style.left = `${startX}px`;
        gmCircle.style.top = `${startY}px`;

        document.body.appendChild(gmCircle);

        setTimeout(() => {
            createBurst(startX, startY);
            gmCircle.remove();
        }, 400); // Remove the circle after animation and create burst
    }

    const handleGMButtonClick = () => {
        for (let i = 0; i < 50; i++) {
            createGMCircle();
        }
    }

    return (
        <div className="quantity-price-module">
            <h1>CLAIM</h1>
            <h2>Your Good Morning!</h2>
            <button id="mintGmButton" onClick={handleGMButtonClick}>GM</button>
            <div className="mint-options">
                <button onClick={decQty} id="decreaseQuantity" className="quantity-adjust">-</button>
                <input type="number" id="nftQuantity" className="nft-quantity-input" value={gmQuantity} onChange={() => setGMQuantity} min="1" />
                <button onClick={incQty} id="increaseQuantity" className="quantity-adjust">+</button>
            </div>
            <div className="quantity-container">
            <div className="recessed-field">
                <h3>Total Price: <span id="totalPriceEth">{gmPrice} ETH</span></h3>
            </div>
            <div className="recessed-field">
                <h3>USD: <span id="totalPriceUsd">${gmTotal.toFixed(2)} USD</span></h3>
            </div>
            </div>
            
        </div>
    )
}

import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import './App.css';

const counterAddress = "0xCF79A6a817F49cE37e7AE73F49A1A5a90FC28c84"
const abi = `[{"inputs":[],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchCount = async () => {
      const data = await readCounterValue();
      return data;
    };

    fetchCount().catch(console.error);
  }, []);

  async function requestAccount() {
    await window.ethereum?.request?.({ method: "eth_requestAccounts" });
  }

  async function updateCounter() {
    if (typeof window.ethereum === "undefined") return;
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(counterAddress, abi, signer);
    const transaction = await contract.increment();
    setIsLoading(true);
    await transaction.wait();
    setIsLoading(false);
    readCounterValue();
  }

  async function readCounterValue() {
    if (typeof window.ethereum === "undefined") return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      counterAddress,
      abi,
      provider
    );

    try {
      const data = await contract.retrieve();
      setCount(parseInt(data.toString()));
    } catch (err) {
      alert(
        "Switch your MetaMask network to BitEigen Testnet and refresh this page!"
      );
    }
  }
  const incrementCounter = async () => {
    await updateCounter();
  };

  return (
    <div className="container">
      <button
        onClick={incrementCounter}
        disabled={isLoading}
        className="button"
      >
        {isLoading ? "loading..." : `counter: ${count}`}
      </button>
    </div>
  );
}

export default App;

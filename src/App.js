import {useEffect, useState } from 'react';
import './App.css';
import NFTContainer from './NFTContainer'

function App() {

  const [walletAddress, setwalletAddress] = useState(null)
  const [nfts, setNfts] = useState([])

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      setwalletAddress(accounts[0])
    
    }
  }

  const getNFTData = async () => {

    if(!walletAddress) return;

    const response = await fetch(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${walletAddress}`)
    
    const data = await response.json()

    setNfts(data.items)
  }

  useEffect(() => {
    getNFTData()
  }, [walletAddress])


  return (
    <div className="App">
      <div className='account'>
        Account: {walletAddress}
      </div>
      <button className='connect-button' onClick={connectWallet}>
        Connect Wallet
      </button>
      <NFTContainer nfts={nfts}/>
    </div>
  );
}

export default App;

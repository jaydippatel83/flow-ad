import './App.css';
import * as fcl from "@onflow/fcl";
import React, { useEffect, useState } from 'react';
import { mintNFT } from './flow/transactions/mint_nft';

fcl
  .config()
  .put("app.detail.title", "MyNFT")
  .put(
    "app.detail.icon",
    "https://assets-global.website-files.com/5f734f4dbd95382f4fdfa0ea/6395e6749db8fe00a41cc279_flow-flow-logo.svg"
  )
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")
  .put("0xDeployer", process.env.REACT_APP_MyNFT)
  .put("0xStandard", "0x631e88ae7f1d7c20");


function App() {
  const [user, setUser] = useState();
  const [name, setName] = useState('');
  const [file, setFile] = useState();

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, [])

  const login = () => {
    fcl.authenticate();
  }

  const handleMint = () => {

  }

  return (
    <div className="App" style={{ margin: '20px', padding: '50px', border: '1px solid #eee' }}>
      <h1>FLOW NFT MArketplace demo</h1>
      <h3>User Address: {user && user?.addr && user?.addr}</h3>
      {
        user?.addr ? <button onClick={() => fcl.unauthenticate()}>Logout</button> : <button onClick={() => login()}>Login</button>
      }
      <div style={{ margin: '20px' }}>
        <input type='text' onChange={(e) => setName(e.target.value)} />
      </div>
      <div style={{ margin: '20px' }}>
        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <button onClick={handleMint}>MintNFT</button>
    </div>
  );
}

export default App;

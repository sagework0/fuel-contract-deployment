iimport React, { useEffect, useState } from "react"; import "@fuel-wallet/sdk"; import "./App.css";
// Import the contract factory -- you can find the name in index.ts. You can also do command + space and the 
// compiler will suggest the correct name.
import { CounterContractAbi__factory } from "./contracts";

// The address of the contract deployed the Fuel testnet
const CONTRACT_ID = "0x3261fb202bd3782c0f2f9989e769906508cf2a668e66c1d7bd67ea8c0c9f212d";

function App() { const [connected, setConnected] = useState<boolean>(false); const [account, setAccount] = 
  useState<string>(""); const [counter, setCounter] = useState<number>(0); const [loaded, setLoaded] = 
  useState(false);
  
  useEffect(() => { setTimeout(() => { checkConnection(); setLoaded(true);
    }, 200)
    if (connected) getCount();
  }, [connected])

  async function connect() { if (window.fuel) { try { await window.fuel.connect(); const [account] = await 
       window.fuel.accounts(); setAccount(account); setConnected(true);
     } catch(err) {
       console.log("error connecting: ", err);
     }
    }
   }

  async function checkConnection() { if (window.fuel) { const isConnected = await window.fuel.isConnected(); if 
      (isConnected) {
        const [account] = await window.fuel.accounts(); setAccount(account); setConnected(true);
      }
    }
  }

  async function getCount() { if (window.fuel) { const wallet = await window.fuel.getWallet(account); const 
      contract = CounterContractAbi__factory.connect(CONTRACT_ID, wallet); const { value } = await 
      contract.functions.count().get(); setCounter(value.toNumber());
    }
  }

  async function increment() { if (window.fuel) { const wallet = await window.fuel.getWallet(account); const 
      contract = CounterContractAbi__factory.connect(CONTRACT_ID, wallet);
      // Creates a transactions to call the increment function because it creates a TX and updates the contract 
      // state this requires the wallet to have enough coins to cover the costs and also to sign the Transaction
      try { await contract.functions.increment().txParams({ gasPrice: 1 }).call(); getCount();
      } catch(err) {
        console.log("error sending transaction...", err);
      }
    }
  }

  if (!loaded) return null
  
  return ( <> <div className="App"> { connected ? ( <> <h3>Counter: {counter?.toFixed(0)}</h3> <button 
              style={buttonStyle} onClick={increment}>
                Increment </button> </> ) : ( <button style={buttonStyle} onClick={connect}>Connect</button> )
        }
      </div> </> );
}

,export default App; const buttonStyle = { borderRadius: "48px", marginTop: "10px", backgroundColor: "#03ffc8", 
  fontSize: "20px", fontWeight: "600", color: "rgba(0, 0, 0, .88)", border: "none", outline: "none", height: 
  "60px", width: "400px", cursor: "pointer"
}

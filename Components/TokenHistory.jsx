import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const TokenHistory = ( { shortenAddress,setOpenTokenHistory }) => {
  const notifySucess = (msg) => toast.success(msg, {duration: 1000});
  const notifyError = (msg) => toast.error(msg, {duration: 1000});

  const copyAddress = (text) => {
    navigator.clipboard.writeText(text);
    notifySucess("Copied Successfully");
  };

  const [history, setHistory] = useState(null);

  useEffect(()=> {
  const storedData = localStorage.getItem("TOKEN_HISTORY");

  if(storedData){
    setHistory(JSON.parse(storedData));
    console.log(JSON.parse(storedData));
  }
  },[])
  return(
    <div className="modal">
      <div className="modal-content">
        <span onClick={() => setOpenTokenHistory(false)} className="close">
          &times;
        </span>
        <h2>Token History</h2>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <td>Logo</td>
                <td>Name</td>
                <td>Symbol</td>
                <td>Supply</td>
                <td>Address</td>
                <td>Hash</td>
              </tr>
            </thead>
            <tbody>
              {history?.map((token, index)=> (
                  <tr key={index + 1}>
                    <td
                     onClick={() => navigator.clipboard.writeText(token?.logo)}
                      >
                      <img
                       src={token?.logo || "theblockchaincoders.jpg"} 
                      alt="" 
                      style={{
                        width: "30px",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                      />
                    </td>
                    <td>{token?.name}</td>
                    <td>{token?.symbol}</td>
                    <td>{token?.supply}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TokenHistory;


import React, { useEffect, useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';

const BalanceUpdater = () => {
  const w3m = useWeb3Modal();
  const [balance, setBalance] = useState(null);

  const fetchBalance = async () => {
    if (w3m.active) {
      const accounts = await w3m.web3.eth.getAccounts();
      const address = accounts[0];
      const newBalance = await w3m.web3.eth.getBalance(address);
      setBalance(newBalance);
    }
  };
  useEffect(() => {
    fetchBalance();

    const intervalId = setInterval(fetchBalance, 10000);

    return () => clearInterval(intervalId);
  }, [w3m.active]);

  return <div>{balance !== null && <p>Your Balance: {w3m.web3.utils.fromWei(balance)} ETH</p>}</div>;
};

export default BalanceUpdater;

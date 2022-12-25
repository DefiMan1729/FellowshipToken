const Web3 = require("web3");
require("dotenv").config();
const abi = require('./newABI.json');
address=process.env.MY_ADDRESS;


async function main(){

    const web3 = new Web3(`https://goerli.infura.io/v3/${process.env.INFURA_API}`);
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
        abi,
        process.env.NEW_CONTRACT_ADDRESS
      );
      web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
      const tx = myContract.methods.safeMint("0xFE1ce446FC1e34033e714a45B0e2D3613A0cDB95",`${process.env.SETURI}`);
      const gas = await tx.estimateGas({from: address});
      const gasPrice = await web3.eth.getGasPrice();
      const data = tx.encodeABI();
      const nonce = await web3.eth.getTransactionCount(address);

      const txData = {
        from: address,
        to: process.env.NEW_CONTRACT_ADDRESS,
        data: data,
        gas,
        gasPrice,
        nonce
        // chain: 'goerli'
      };
      const receipt = await web3.eth.sendTransaction(txData);
      console.log(`Transaction hash: ${receipt.transactionHash}`);

}

main();
# Token Interaction using a Docker image
## Step by Step (Copy Paste) guide to Dockerizing (if there is such a word) a simple Node app that mints an NFT on the Goerli network. 
I have used Infura (but works for Alchemy also). Here is the simple Web3 code to post a mint transaction (refer file NewTransaction.js)
```shell
const Web3 = require("web3");
require("dotenv").config();
const abi = require('./newABI.json'); 
// I have just used a local ABI, you can extract the ABI from Etherscan if your //contract is verified. 
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

```

Now you need to create a Dockerfile named Dockerfile using
```shell
touch Dockerfile
```
<img width="204" alt="image" src="https://user-images.githubusercontent.com/115624087/209686698-6018b38a-751a-4a8b-9485-518c97b9870c.png">

```shell
FROM node:16
# Create app directory
WORKDIR /usr/src/app
# WORKDIR /Users/arkaroychowdhury/Desktop/PORTFOLIO/FELLOWSHIPTOKEN
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "node", "NewTransaction.js" ]

```
Then build your image
```shell
docker build . -t <tag user name>/<tag app name>
```

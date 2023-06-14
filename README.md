# BSC <> Polygon zkEVM

## Must do Setup
There is a .env file (to the root project directory). Add private key addresses to ```PRIVATE_KEY_BSC``` and ```PRIVATE_KEY_POLYGON-ZK-EVM-TESTNET``` for sending out transactions on respective networks.

## Deploying and setting up from scratch

```
npx hardhat --network bsc-testnet deploy --tags MessengerV1
npx hardhat --network polygon-zk-evm-testnet deploy --tags MessengerV1
````

2. Set the remote addresses, so each contract can receive messages
```angular2html
npx hardhat --network bsc-testnet setTrustedRemote --target-network polygon-zk-evm-testnet --contract MessengerV1
npx hardhat --network polygon-zk-evm-testnet setTrustedRemote --target-network bsc-testnet --contract MessengerV1
```
3. Send a cross chain message from `bsc-testnet` to `polygon-zk-evm-testnet`, send whatever message you want with ```--message``` flag.
```angular2html
npx hardhat --network bsc-testnet sendMessage --target-network polygon-zk-evm-testnet --message share_this_message
```
4. Use this command in a separate terminal to wait for the message to be received in real-time on ```polygon-zk-evm-testnet```.
```
npx hardhat --network polygon-zk-evm-testnet messengerPoll
```

NOTE:  You can swap the network and target-network above to go from `polygon-zk-evm-testnet` to `bsc-testnet`

## Using pre deployed contracts
1. Ready to use script for `bsc-testnet` to `polygon-zk-evm-testnet`
```
message="scipt_message" npx hardhat --network bsc-testnet run scripts/sendBSC2PZKEVM.js
```
2. Ready to use script for waiting to receive message on `polygon-zk-evm-testnet`
```
npx hardhat --network polygon-zk-evm-testnet run scripts/receiveZkEvm.js
```
const { ethers } = require("hardhat");
const CHAIN_ID = require("../constants/chainIds.json")

require("dotenv").config();
async function runner_bsc_2_zkevm() {
    let message = process.env.message;
    if(!message){
        console.log("Please provide the message to transfer between BSC to PolygonZKEvm");
        return;
    }
    const bsc_contract_address = process.env["BSC_CONTRACT_ADDRESS"];
    const pzkevm_contract_address = process.env["POLYGON-ZK-EVM_CONTRACT_ADDRESS"];
    const MessengerV1BSC = await(await ethers.getContractFactory("MessengerV1")).attach(bsc_contract_address);
    let remoteChainId = CHAIN_ID["polygon-zk-evm-testnet"];
    console.log(`Sending ${message} from BSC ${bsc_contract_address} to ${remoteChainId}:${pzkevm_contract_address}`)
    let tx = await (
        await MessengerV1BSC.sendMessage(
            remoteChainId,
            message,
            { value: ethers.utils.parseEther("0.01") }
        )
    ).wait()

    console.log(`BSC Msg Transfer txn hash ${tx.transactionHash}`)
}

runner_bsc_2_zkevm().then(()=>{console.log("Done")})
const { ethers } = require("hardhat");


function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis))
}

require("dotenv").config();
async function receive_zkevm() {
    const pzkevm_contract_address = process.env["POLYGON-ZK-EVM_CONTRACT_ADDRESS"];
    const MessengerV1PZKEVM = await(await ethers.getContractFactory("MessengerV1")).attach(pzkevm_contract_address);
    let last_message = "";
    while(true) {
        let current_message = await MessengerV1PZKEVM.lastMessage()
        if(last_message == current_message){
            await sleep(1000)
            continue;
        }
        console.log(`[${hre.network.name}] ${new Date().toISOString().split("T")[1].split(".")[0]} new message...    ${current_message}`)
        last_message = current_message;
        await sleep(1000)
    }
}

receive_zkevm().then(()=>{console.log("Done")})
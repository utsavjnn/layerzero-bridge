const CHAIN_ID = require("../constants/chainIds.json")
const ENDPOINTS = require("../constants/layerzeroEndpoints.json");

module.exports = async function (taskArgs, hre) {
    const remoteChainId = CHAIN_ID[taskArgs.targetNetwork]
    const message = taskArgs.message;
    const MessengerV1 = await ethers.getContract("MessengerV1")

    // quote fee with default adapterParams
    
    let tx = await (
        await MessengerV1.sendMessage(
            remoteChainId,
            message,
            { value: ethers.utils.parseEther("0.01") }
        )
    ).wait()
    console.log(`✅ Message Sent [${hre.network.name}] on destination MessenerV1 @ [${remoteChainId}]`)
    console.log(`tx: ${tx.transactionHash}`)

    console.log(``)
    console.log(`Note: to poll/wait for the message to arrive on the destination use the command:`)
    console.log(`       (it may take a minute to arrive, be patient!)`)
}
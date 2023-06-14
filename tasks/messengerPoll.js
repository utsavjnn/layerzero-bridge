const MessengerV1 = require("../deploy/MessengerV1")

function sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis))
}

module.exports = async function (taskArgs, hre) {
    console.log(`owner:`, (await ethers.getSigners())[0].address)
    const MessengerV1 = await ethers.getContract("MessengerV1")
    console.log(`messenger: ${MessengerV1.address}`)
    let last_message = ""
    while (true) {
        let current_message = await MessengerV1.lastMessage()
        if(last_message == current_message){
            await sleep(1000);
            continue;
        }
        console.log(`[${hre.network.name}] ${new Date().toISOString().split("T")[1].split(".")[0]} new message...    ${current_message}`)
        last_message = current_message;
        await sleep(1000);
    }
}

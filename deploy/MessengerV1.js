const LZ_ENDPOIINTS = require("../constants/layerzeroEndpoints.json");

module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    console.log(`>>> your address: ${deployer}`)

    // get the endpoint address
    const endpointAddr = LZ_ENDPOIINTS[hre.network.name]
    console.log(`[${hre.network.name}] Endpoint Address: ${endpointAddr}`)

    await deploy("MessengerV1", {
        from: deployer,
        args: [endpointAddr],
        log: true,
        waitConfirmations: 1,
    })
}

module.exports.tags = ["MessengerV1"]
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MessengerV1", function () {
    beforeEach(async function () {
        // lets define a mock chain Id 
        this.chainId = 123;

        // create a LayerZero Endpoint mock for testing
        const LayerZeroEndpointMock = await ethers.getContractFactory("LZEndpointMock")
        this.lzEndpointMock = await LayerZeroEndpointMock.deploy(this.chainId)

        // create two messenger instances
        const messenger = await ethers.getContractFactory("MessengerV1")
        this.messengerA = await messenger.deploy(this.lzEndpointMock.address)
        this.messengerB = await messenger.deploy(this.lzEndpointMock.address)
        this.lzEndpointMock.setDestLzEndpoint(this.messengerA.address, this.lzEndpointMock.address)
        this.lzEndpointMock.setDestLzEndpoint(this.messengerB.address, this.lzEndpointMock.address)

        // set trusted remote addresses for both
        await this.messengerA.setTrustedRemote(
            this.chainId,
            ethers.utils.solidityPack(["address", "address"], [this.messengerB.address, this.messengerA.address])
        )
        await this.messengerB.setTrustedRemote(
            this.chainId,
            ethers.utils.solidityPack(["address", "address"], [this.messengerA.address, this.messengerB.address])
        )
        this.signer = await (await hre.ethers.getSigners())[0].getAddress()
    })

    it("send messages to and fro", async function () {
        let message_a2b = "message_from_a_to_b";
        await this.messengerA.sendMessage(this.chainId, message_a2b, { value: ethers.utils.parseEther("0.5") })
        expect(await this.messengerB.lastMessage()).to.be.equal(message_a2b);

        let message_b2a = "message_from_b_to_a";
        await this.messengerB.sendMessage(this.chainId, message_b2a, { value: ethers.utils.parseEther("0.5") })
        expect(await this.messengerA.lastMessage()).to.be.equal(message_b2a);
    })
})
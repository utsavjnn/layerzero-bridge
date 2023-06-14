pragma solidity ^0.8.0;
pragma abicoder v2;

import "../lzApp/NonblockingLzApp.sol";
import "hardhat/console.sol";

contract MessengerV1 is NonblockingLzApp {
    string public lastMessage;

    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {}

    function _nonblockingLzReceive(uint16, bytes memory _srcAddress, uint64, bytes memory _payload) internal override {
        require(_srcAddress.length == 40, "Invalid data length"); // Ensure the data has the correct length for an address

        address addr;
        assembly {
            addr := mload(add(_srcAddress, 20)) // Load the 20 bytes of data as an address
        }
        string memory data = abi.decode(_payload, (string));
        lastMessage = data;
    }

    function sendMessage(uint16 _dstChainId, string memory _message) public payable {
        bytes memory payload = abi.encode(_message);
        _lzSend(_dstChainId, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);
    }

    function estimateFee(uint16 _dstChainId, string memory _message, bool _useZro, bytes calldata _adapterParams) public view returns (uint nativeFee, uint zroFee) {
        bytes memory payload = abi.encode(_message);
        return lzEndpoint.estimateFees(_dstChainId, address(this), payload, _useZro, _adapterParams);
    }
}



    // function toString(address account) public pure returns(string memory) {
    //     return toString(abi.encodePacked(account));
    // }

    // function toString(uint256 value) public pure returns(string memory) {
    //     return toString(abi.encodePacked(value));
    // }

    // function toString(bytes32 value) public pure returns(string memory) {
    //     return toString(abi.encodePacked(value));
    // }

    // function toString(bytes memory data) public pure returns(string memory) {
    //     bytes memory alphabet = "0123456789abcdef";

    //     bytes memory str = new bytes(2 + data.length * 2);
    //     str[0] = "0";
    //     str[1] = "x";
    //     for (uint i = 0; i < data.length; i++) {
    //         str[2+i*2] = alphabet[uint(uint8(data[i] >> 4))];
    //         str[3+i*2] = alphabet[uint(uint8(data[i] & 0x0f))];
    //     }
    //     return string(str);
    // }
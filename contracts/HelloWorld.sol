// SPDX-License-Identifier: MIT
pragma solidity =0.8.7;

contract HelloWorld {
    string public hello;

    event test(uint256 timestamp);

    constructor(string memory _hello) {
        hello = _hello;

        emit test(block.timestamp);
    }
}

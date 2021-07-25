// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public hello;

    constructor(string memory _hello) {
        hello = _hello;
    }
}

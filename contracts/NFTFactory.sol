// SPDX-License-Identifier: MIT
pragma solidity =0.8.7;

import "./NFT.sol";

contract NFTFactory {
    address[] public nfts;

    event NFTDeployed(address);
    
    function deploy(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        uint256 _maxSupply,
        uint256 _mintPrice
    ) external {
        NFT nft = new NFT(  
            _name,
            _symbol,
            _uri,
            _maxSupply,
            _mintPrice,
            msg.sender
        );

        nfts.push(address(nft));

        emit NFTDeployed(address(nft));
    }

    function nftsCount() external view returns(uint256) {
        return nfts.length;
    }
}
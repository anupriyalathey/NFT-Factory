// SPDX-License-Identifier: MIT
pragma solidity =0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
  uint256 public nextId = 1;

  string public uri;

  uint256 public maxSupply;
  uint256 public mintPrice;

  address public owner;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _uri,
    uint256 _maxSupply,
    uint256 _mintPrice,
    address _owner
  ) ERC721(_name, _symbol) {
    uri = _uri;

    maxSupply = _maxSupply;
    mintPrice = _mintPrice;

    owner = _owner;
  }

  function mint() external payable {
    require(msg.value == mintPrice, "!mintPrice");
    require(nextId <= maxSupply, "Max Supply Reached");

    _mint(msg.sender, nextId++);
  }

  function _baseURI() internal view override returns (string memory) {
    return uri;
  }

  function withdraw() external {
    require(msg.sender == owner, "Only owner can withdraw");

    (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
    require(success);
  }
}

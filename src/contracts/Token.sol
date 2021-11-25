// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";

contract IotexViewToken is ERC20Pausable {
  constructor(string memory _name, string memory _symbol) 
    ERC20(_name, _symbol)
  {
    _mint(msg.sender, 200000000 * 10 ** 18);
  }
}
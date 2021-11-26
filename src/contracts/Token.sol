// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract IotexViewToken is ERC20PresetMinterPauser {
  constructor(string memory _name, string memory _symbol) ERC20PresetMinterPauser(_name, _symbol)
  {
  }
}
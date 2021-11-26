// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Crowdsale.sol";
import "./MintedCrowdsale.sol";

contract IotexViewTokenCrowdsale is MintedCrowdsale {
    
    constructor(uint256 _rate, address payable _wallet, IERC20 _token, address payable _admin)
      Crowdsale(_rate, _wallet, _token, _admin) {}
}

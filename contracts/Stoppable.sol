pragma solidity ^0.4.13;

import "./Owned.sol";

contract Stoppable is Owned {
    
    bool public running;
    
    event LogRunSwitch(address sender, bool switchSetting);
        
    modifier onlyIfRunning { 
        if(!running) revert(); 
        _;
    }
        
    function Stoppable() {
        running = true;
    }
        
    function runSwitch(bool onOff)
        onlyOwner
        returns(bool success)
    {
        running = onOff;
        LogRunSwitch(msg.sender, onOff);
        return true;
    }
        
}
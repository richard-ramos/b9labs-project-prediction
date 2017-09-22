pragma solidity ^0.4.13;

import "./Stoppable.sol";

contract Question is Stoppable {
    
    address administrator;
    
    mapping(address => bool) trustedSources;
    
    mapping(address => bool) gamblerExists;
    
    struct Bet {
        uint256 betAmountYes;
        uint256 betAmountNo;
    }
    
    mapping(address => Bet) gamblerBets;
    
    uint32 totalBetsYes;
    uint32 totalBetsNo;
    uint256 totalAmountYes;
    uint256 totalAmountNo;
    

    string questionText;
    
    bool openBets;
    
    bool questionHasResponse;
    
    bool questionResult;
    
    function Question(string _questionText, address _administrator)
        public
    {
        administrator = _administrator;
        questionText = _questionText;
        totalBetsYes = 0;
        totalBetsNo = 0;
        totalAmountYes;
        totalAmountNo;
        questionResult = false;
        openBets = true;
    }
    
    // MODIFIERS
    
    modifier onlyAdministrator { if(msg.sender != administrator) revert(); _; }
    
    modifier onlyIfBetsAreOpen { if(openBets == false) revert(); _; }

    modifier onlyIfBetsAreClosed { if(openBets == true) revert(); _;} 

    modifier onlyIfQuestionHasResponse { if(questionHasResponse == true) revert(); _; }

    modifier onlyIfQuestionHasNoResponse { if(questionHasResponse == true) revert(); _; }

    // METHODS
    
    function closeBets()
        public
        onlyAdministrator
        onlyIfQuestionHasNoResponse
        returns (bool success)
    {
        openBets = false;
        return true;
    }

    function addTrustedSource(address _trustedSource)
        public
        onlyAdministrator
        returns (bool success)
    {
        trustedSources[_trustedSource] = true;
        return true;
    }
    
    function removeTrustedSource(address _trustedSource)
        public
        onlyAdministrator
        returns (bool success)
    {
        trustedSources[_trustedSource] = false;
        return true;
    }
    
    function answerQuestion(bool response)
        public
        onlyIfBetsAreClosed
        onlyIfQuestionHasNoResponse
        returns (bool success){
        
        if(trustedSources[msg.sender] == false) revert();
        
        questionHasResponse = true;
        
        questionResult = response;
        
        return true;
    }
    
    function bet(bool response)
        public
        onlyIfBetsAreOpen
        payable
        returns (bool success)
    {

        if(response){
            totalAmountYes += msg.value;
            totalBetsYes++;
            gamblerBets[msg.sender].betAmountYes += msg.value;
        } else {
            totalAmountNo += msg.value;
            totalBetsNo++;
            gamblerBets[msg.sender].betAmountNo += msg.value;
        }

        return true;
    }
    
    function withdrawWinnings()
        public
        onlyIfQuestionHasResponse
        returns (bool success)
    {
        if(!gamblerExists[msg.sender]) revert();
        
        uint256 winningAmount = 0;
        
        if(questionResult){
            // Result: Yes
            winningAmount = gamblerBets[msg.sender].betAmountYes * (totalAmountYes + totalAmountNo) / totalAmountYes;
        } else {
            // Result: No
            winningAmount = gamblerBets[msg.sender].betAmountNo * (totalAmountYes + totalAmountNo) / totalAmountNo;
        }
        
		msg.sender.send(winningAmount);
		
        return true;
    }

}
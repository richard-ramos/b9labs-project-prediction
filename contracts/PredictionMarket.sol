pragma solidity ^0.4.13;

import "./Stoppable.sol";
import "./Question.sol";

contract PredictionMarket is Stoppable {
    
    address[] public questions;
    mapping(address => bool) questionExists;
    
    modifier onlyIfQuestion(address question) {
        if(questionExists[question] != true) revert();
        _;
    }

    event LogQuestionCreated(address question, address administrator);
    event LogNewAdministrator(address question, address administrator);
  
    
    function createQuestion(string _questionText, address _administrator) 
        public
        returns(address questionContract)
    {
        Question q = new Question(_questionText, _administrator);
        questions.push(q);
        questionExists[q] = true;

        LogQuestionCreated(q, _administrator);

        return q;
        
    }
    
    function getQuestionCount() 
        public
        constant
        returns(uint questionCount)
    {
        return questions.length;
    }
    
    
    function changeQuestionAdministrator(address question, address newAdministrator) 
        onlyOwner
        onlyIfQuestion(question)
        returns(bool success)
    {
        Question q = Question(question);

        LogNewAdministrator(question, newAdministrator);
        
        return(q.changeOwner (newAdministrator)); 
    }
}
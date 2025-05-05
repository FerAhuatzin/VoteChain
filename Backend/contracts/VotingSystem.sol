// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

contract VotingSystem is Ownable, EIP712 {
    using ECDSA for bytes32;

    struct Candidate {
        bytes32 id;
        string name;
        uint voteCount;
    }

    struct Voter {
        bool hasVoted;
    }

    mapping(bytes32 => Candidate) public candidates;
    mapping(address => Voter) public voters;
    uint public candidatesCount;

    address public relayer;
    bytes32 private constant VOTE_TYPEHASH = keccak256("Vote(uint256 candidateId,address voter)");

    event Voted(uint indexed candidateId, address indexed voter);
    
    modifier onlyRelayer() {
        require(msg.sender == relayer, "Only relayer can execute this");
        _;
    }
    
    constructor(address _relayer) 
        EIP712("VotingSystem", "1")
        Ownable(msg.sender)
    {
        relayer = _relayer;
    }


    function addCandidate(bytes32 candidateId, string memory _name) external onlyOwner {
    require(candidates[candidateId].id == bytes32(0), "Candidate already exists");
    candidates[candidateId] = Candidate(candidateId, _name, 0);
    }

    function vote(bytes32 candidateId, address voter, bytes memory signature) external onlyRelayer {
    require(!voters[voter].hasVoted, "Voter has already voted");
    require(candidates[candidateId].id != bytes32(0), "Invalid candidate");

    voters[voter].hasVoted = true;
    candidates[candidateId].voteCount++;

    emit Voted(candidateId, voter);
    }
}

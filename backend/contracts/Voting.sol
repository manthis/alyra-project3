// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Voting Contract
 * @dev This contract allows for a simple voting process. It enables registered voters to submit proposals and vote on them.
 * The contract follows a specific workflow, from registering voters to tallying votes and announcing a winning proposal.
 * @author BenBK
 * Inherits from OpenZeppelin's Ownable contract for access control.
 */
contract Voting is Ownable {

    /**
     * @dev Variable containing the ID of the Winning Proposal. It is updated on each vote.
     */
    uint public winningProposalID;
    
    /**
     * @dev Struct representing a voter.
     * @param isRegistered Boolean indicating if the voter is registered.
     * @param hasVoted Boolean indicating if the voter has already voted.
     * @param votedProposalId The ID of the proposal the voter has voted for.
     */
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    /**
     * @dev Struct representing a proposal.
     * @param description A string description of the proposal.
     * @param voteCount The number of votes this proposal has received.
     */
    struct Proposal {
        string description;
        uint voteCount;
    }

    /**
     * @dev Enum representing the different stages of the voting workflow.
     */
    enum  WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }
    
    /**
     * @dev Current status of the voting workflow.
     */
    WorkflowStatus public workflowStatus;

    /**
     * @dev Array of proposals.
     */
    Proposal[] proposalsArray;

    /**
     * @dev Mapping from voter address to voter details.
     */
    mapping (address => Voter) voters;

    /**
     * @dev Event emitted when a voter is registered.
     * @param voterAddress Address of the registered voter.
     */
    event VoterRegistered(address voterAddress);

    /**
     * @dev Event emitted when the workflow status changes.
     * @param previousStatus Previous workflow status.
     * @param newStatus New workflow status.
     */    
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);

    /**
     * @dev Event emitted when a proposal is registered.
     * @param proposalId ID of the newly registered proposal.
     */ 
    event ProposalRegistered(uint proposalId);

    /**
     * @dev Event emitted when a vote is cast.
     * @param voter Address of the voter.
     * @param proposalId ID of the proposal voted for.
     */
    event Voted(address voter, uint proposalId);

    /**
     * @dev Constructor to initialize the contract.
     * Inherits initialization from Ownable contract.
     */
    constructor() Ownable(msg.sender) {    }
    
    /**
     * @dev Modifier to check if the caller is a registered voter.
     * Reverts if the caller is not registered.
     */
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }
    
    // on peut faire un modifier pour les états

    // ::::::::::::: GETTERS ::::::::::::: //

    /**
     * @dev Function to get details of a registered voter.
     * Can be called by anyone to retrieve the voter details.
     * @param _addr Address of the voter whose details are to be retrieved.
     * @return Voter struct containing voter details including registration status, voting status, and voted proposal ID.
     */
    function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }
    
    /**
     * @notice Retrieves a single proposal from the list of proposals.
     * @dev This function can only be called by voters. It returns the proposal details for the specified ID.
     * @param _id The unique identifier of the proposal to be retrieved.
     * @return Proposal The proposal data corresponding to the given ID.
     */
    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposalsArray[_id];
    }

 
    // ::::::::::::: REGISTRATION ::::::::::::: // 
   /**
     * @notice Adds a new voter to the voting system.
     * @dev This function can only be called by the contract owner. It checks if the voter registration phase is active and if the address is not already registered.
     *      On successful registration, the 'VoterRegistered' event is emitted.
     * @param _addr The address of the voter to be added.
     * @notice VoterRegistered Indicates that a new voter has been successfully registered, providing the address of the registered voter.
     */
    function addVoter(address _addr) external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Voters registration is not open yet');
        require(voters[_addr].isRegistered != true, 'Already registered');
    
        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }
 

    // ::::::::::::: PROPOSAL ::::::::::::: // 
    /**
     * @notice Adds a new proposal to the system and emits the 'ProposalRegistered' event upon successful registration, indicating the index of the newly added proposal.
     * @dev This function can only be called by registered voters. It checks if the proposal registration phase is active and if the proposal description is not empty.
     *      A new proposal with the given description is created and added to the proposals array.
     * @param _desc The description of the proposal to be added.
     */
    function addProposal(string calldata _desc) external onlyVoters {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposals are not allowed yet');
        require(keccak256(abi.encode(_desc)) != keccak256(abi.encode("")), 'Vous ne pouvez pas ne rien proposer'); // facultatif
        // voir que desc est different des autres

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        // proposalsArray.push(Proposal(_desc,0));
        emit ProposalRegistered(proposalsArray.length-1);
    }

    // ::::::::::::: VOTE ::::::::::::: //
    /**
     * @notice Casts a vote for a specific proposal by a voter and emits the 'Voted' event. Updates the winning proposal if necessary.
     * @dev This function can only be called by registered voters during the voting session. It checks if the voter has not already voted, and if the proposal ID is valid.
     *      The function records the vote, updates the vote count for the proposal, and potentially updates the winning proposal.
     *      The 'Voted' event is emitted with the voter's address and the ID of the proposal voted for.
     * @param _id The ID of the proposal to vote for.
     */
    function setVote( uint _id) external onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        require(voters[msg.sender].hasVoted != true, 'You have already voted');
        require(_id < proposalsArray.length, 'Proposal not found'); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        // We check if this newly voted proposition has more vote than the present
        // winner and if that's the case we replace the winningProposalID
        if (proposalsArray[_id].voteCount >= proposalsArray[winningProposalID].voteCount) {
            winningProposalID = _id;
        }

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //
    /**
     * @notice Starts the proposal registration phase, adds a genesis proposal, and emits a 'WorkflowStatusChange' event.
     * @dev This function can only be called by the contract owner. It checks if the current workflow status is 'RegisteringVoters' and then changes it to 'ProposalsRegistrationStarted'.
     *      A genesis proposal with a predefined description is added to the proposals array.
     *      The 'WorkflowStatusChange' event is emitted to indicate the transition from 'RegisteringVoters' to 'ProposalsRegistrationStarted'.
     */
    function startProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Registering proposals cant be started now');
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
        
        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);
        
        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    /**
     * @notice Ends the proposal registration phase and emits a 'WorkflowStatusChange' event.
     * @dev This function can only be called by the contract owner. It checks if the current workflow status is 'ProposalsRegistrationStarted' and then changes it to 'ProposalsRegistrationEnded'.
     *      The 'WorkflowStatusChange' event is emitted to indicate the transition from 'ProposalsRegistrationStarted' to 'ProposalsRegistrationEnded'.
     */
    function endProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Registering proposals havent started yet');
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    /**
     * @notice Starts the voting session and emits a 'WorkflowStatusChange' event.
     * @dev This function can only be called by the contract owner. It checks if the current workflow status is 'ProposalsRegistrationEnded' and then changes it to 'VotingSessionStarted'.
     *      The 'WorkflowStatusChange' event is emitted to indicate the transition from 'ProposalsRegistrationEnded' to 'VotingSessionStarted'.
     */
    function startVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, 'Registering proposals phase is not finished');
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    /**
     * @notice Ends the voting session and emits a 'WorkflowStatusChange' event.
     * @dev This function can only be called by the contract owner. It checks if the current workflow status is 'VotingSessionStarted' and then changes it to 'VotingSessionEnded'.
     *      The 'WorkflowStatusChange' event is emitted to indicate the transition from 'VotingSessionStarted' to 'VotingSessionEnded'.
     */    
    function endVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }

    /**
     * @notice Tally the votes and transition to the 'VotesTallied' workflow status, emitting a 'WorkflowStatusChange' event.
     * @dev This function can only be called by the contract owner. It checks if the current workflow status is 'VotingSessionEnded' and then changes it to 'VotesTallied'.
     *      The 'WorkflowStatusChange' event is emitted to indicate the transition from 'VotingSessionEnded' to 'VotesTallied'.
     */
    function tallyVotes() external onlyOwner {
       require(workflowStatus == WorkflowStatus.VotingSessionEnded, "Current status is not voting session ended");       
       workflowStatus = WorkflowStatus.VotesTallied;
       emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }
}

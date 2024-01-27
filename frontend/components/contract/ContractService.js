import { getPublicClient, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
import { parseAbiItem } from 'viem';
import isValidEthereumAddress from '../utils/ethereum';
import votingABI from './VotingAbi';

/** Call to write functions of the smart contract */

const writeToContract = async (_functionName, _args, _account) => {
    const { request } = await prepareWriteContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: votingABI,
        functionName: _functionName,
        args: _args,
        account: _account,
    });
    const { hash } = await writeContract(request);
    await waitForTransaction({
        hash: hash,
    });
};

export const addVoter = async (_voterAddr, _accountAddr) => {
    if (!isValidEthereumAddress(_voterAddr)) {
        throw new Error(`Invalid voter address: "${_voterAddr}"! Address doesn't match a valid ethereum address form!`);
    }

    await writeToContract('addVoter', [_voterAddr], _accountAddr);
    console.log(`Voter added: ${_voterAddr}`);
};

export const addProposal = async (_proposal, _accountAddr) => {
    if (_proposal?.length === 0) {
        throw new Error('You cannot register an empty proposal!');
    }
    await writeToContract('addProposal', [_proposal], _accountAddr);
    console.log(`Proposal added: ${_proposal}`);
};

export const getOneProposal = async (_id) => {
    const client = getPublicClient();
    const proposal = await client.readContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: votingABI,
        functionName: 'getOneProposal',
        args: [_id],
    });
    return proposal?.description;
};

export const setVote = async (_id) => {
    if (!_id) {
        throw new Error('You must vote for a proposition!');
    }

    await writeToContract('setVote', [_id]);
    console.log(`Voted for: ${_id}`);
};

/** Workflow Steps */

export const startProposalsRegistering = async (_accountAddr) => {
    await writeToContract('startProposalsRegistering', [], _accountAddr);
    console.log('Proposals registration started');
};

export const startVotingSession = async (_accountAddr) => {
    await writeToContract('endProposalsRegistering', [], _accountAddr);
    await writeToContract('startVotingSession', [], _accountAddr);
    console.log('Voting session started');
};

export const endVotingSessionAndTallyVotes = async (_accountAddr) => {
    await writeToContract('endVotingSession', [], _accountAddr);
    await writeToContract('tallyVotes', [], _accountAddr);
    console.log('Voting session ended');
};

/** LOGS ============================== */

export const getVoterRegistrationLogs = async () => {
    const client = getPublicClient();

    const logs = await client.getLogs({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        event: parseAbiItem('event VoterRegistered(address voterAddress)'),
        fromBlock: 0n,
        toBlock: 'latest',
    });

    return logs;
};

export const getProposalRegistrationLogs = async () => {
    const client = getPublicClient();

    const logs = await client.getLogs({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        event: parseAbiItem('event ProposalRegistered(uint proposalId)'),
        fromBlock: 0n,
        toBlock: 'latest',
    });

    return logs;
};

export const getVoteLogs = async () => {
    const client = getPublicClient();

    const votesEvents = await client.getLogs({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        event: parseAbiItem('event Voted(address voter, uint proposalId)'),
        fromBlock: 0n,
        toBlock: 'latest',
    });

    return votesEvents;
};

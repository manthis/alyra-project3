import { getPublicClient, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
import { parseAbiItem } from 'viem';
import isValidEthereumAddress from '../utils/ethereum';
import votingABI from './VotingAbi';

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
        throw Error(`Invalid voter address: "${_voterAddr}"! Address doesn't match a valid ethereum address form!`);
    }

    await writeToContract('addVoter', [_voterAddr], _accountAddr);
    console.log(`Voter added: ${_voterAddr}`);
};

export const startProposalsRegistering = async (_accountAddr) => {
    await writeToContract('startProposalsRegistering', [], _accountAddr);
    console.log('Proposals registration started');
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

    const logs = await client.getLogs();

    return logs;
};

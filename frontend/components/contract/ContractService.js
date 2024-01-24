import { getPublicClient, prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
import { parseAbiItem } from 'viem';
import votingABI from './VotingAbi';

const writeToContract = async (_functionName, _args, _account) => {
    try {
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
    } catch (error) {
        console.log(error.message);
    }
};

export const addVoter = async (_voterAddr, _accountAddr) => {
    // TODO check _voterAddr is a valid address before calling contract
    await writeToContract('addVoter', [_voterAddr], _accountAddr);
    console.log(`Voter added: ${_voterAddr}`);
};

export const getVoterRegistrationLogs = async () => {
    const client = getPublicClient();

    const logs = await client.getLogs({
        event: parseAbiItem('event VoterRegistered(address voterAddress)'),
        fromBlock: 0n,
        toBlock: 'latest',
    });

    return logs;
};

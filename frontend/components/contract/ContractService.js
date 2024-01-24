/* TODO: build a service using Wagmi Core to call the contract functions */

import { getPublicClient, prepareWriteContract, waitForTransaction } from '@wagmi/core';
import { votingAbi } from './VotingAbi';

const client = getPublicClient();

const writeToContract = async (_functionName, _args, _account) => {
    try {
        const { request } = await prepareWriteContract({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            abi: votingAbi,
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

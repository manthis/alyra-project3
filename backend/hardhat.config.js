require('@nomicfoundation/hardhat-toolbox');

const PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || '';
const ALCHEMY_PRIVATE_KEY = process.env.ALCHEMY_PRIVATE_KEY || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.20',
    networks: {
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/JVFHW5c5MXnRUxytlY26K8jE8CYtzMUb`,
            accounts: [`0x07df9d114b79521bc10ba50e9d026a62b2fec4913ecb28c0cf74cc69f0e87b90`],
            chainId: 11155111,
            blockConfirmations: 6,
        },
    },
    etherscan: {
        apiKey: {
            sepolia: '2NBVE5FYYTPI9WNQRW4ZX9GQAUE9F86EK3',
        },
    },
};

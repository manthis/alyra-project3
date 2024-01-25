const isValidEthereumAddress = (address) => {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    return regex.test(address);
};

export default isValidEthereumAddress;

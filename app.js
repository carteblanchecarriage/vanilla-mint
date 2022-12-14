// user ethers to connect to the network

const connect = async () => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log(accounts[0]);
        document.querySelector('#account').innerHTML = `Welcome user: ${accounts[0]}`;
        document.getElementById('mint-btn').disabled = false;
    } catch (e) {
        const errorMessage = document.getElementById('error-message')
        errorMessage.innerHTML = `There was an error when trying to connect a wallet, make sure you have a wallet ready. \n${e}`;
        errorMessage.classList.toggle('invisible')
    }

}

const mint = async () => {
    console.log("Minting...");
    const wallet = await window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log("WALLET FROM SELECTED ADDRESS", wallet[0]);

    if (wallet) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = await new ethers.Contract('0x2E84eDbA89E6803C7229E5C4be40b1470f8557e2', abi, signer);
        console.log("CONTRACT", contract);

        // call mint
        const tx = await contract.mint();
        console.log("TX", tx);
        await tx.wait();
        console.log("Minted NFT")
    } else {
        console.log('No wallet connected');
    }
}


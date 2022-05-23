import { useWeb3Context } from '../hooks/useWeb3Context'
import { WelcomeButton } from './Buttons/WelcomeButton'

const abi = []

export const MetaMask = () => {
  const { setContract, setProvider, setAccount, ethers } = useWeb3Context()

  const handleEnableEth = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const [account] = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        let contractAddress

        // Hardhat Local
        if (chainId === '0x7a69') {
          contractAddress = ''

          // Rinkeby
        } else if (chainId === '0x4') {
          contractAddress = ''

          // Polygon Mainnet
        } else if (chainId === '0x89') {
          contractAddress = ''

          // Polygon Testnet
        } else if (chainId === '0x13881') {
          contractAddress = ''

          // Mainnet
        } else if (chainId === '0x1') {
          contractAddress = ''

          // Ropsten
        } else if (chainId === '0x3') {
          contractAddress = ''
        }

        const signer = provider.getSigner(account)
        const contract = new ethers.Contract(contractAddress, abi, signer)

        setProvider(provider)
        setContract(contract)
        // eslint-disable-next-line no-underscore-dangle
        setAccount(contract.signer._address)
      } else if (window.web3) {
        console.log('Update MetaMask')
      } else {
        console.log('Enable MetaMask')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return <WelcomeButton onClick={handleEnableEth} />
}

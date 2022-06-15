import {ethers} from 'ethers';

import type { NextPage } from 'next'

import UserContract from '../contracts/UserStorage.json';
import Feed from '../components/Feed'
import Header from '../components/Header'
import {useState} from 'react';

const Home: NextPage = () => {
    const [currentAccount, setCurrentAccount] = useState('');

    const connectWallet = async () => {
        try {
            // @ts-ignore
            const { ethereum } = window

            if (!ethereum) {
                console.log('Metamask not detected')
                return
            }
            let chainId = await ethereum.request({ method: 'eth_chainId'})
            console.log('Connected to chain:' + chainId)

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const userContract = new ethers.Contract(
                '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
                UserContract.abi,
                signer
            )

            if (!userContract.isUserExist()) {
                const addUserTransaction = await userContract.addUser();

                console.log('add user transaction', addUserTransaction);
            }

            console.log('Found account', accounts[0])
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log('Error connecting to metamask', error)
        }
    }

    return (
      <div>
          {
              currentAccount == ''
                ? (
                    <div className='flex w-screen h-screen justify-center content-center items-center'>
                        <button
                            className='bg-[#15202b] text-2xl text-white py-3 px-12 rounded-lg hover:scale-105 transition duration-500 ease-in-out'
                            onClick={connectWallet}>
                            Log in
                        </button>
                    </div>
                  )
                : (
                    <div>
                        <Header username={currentAccount}/>
                        <Feed />
                    </div>
                  )
          }
      </div>
  )
}

export default Home

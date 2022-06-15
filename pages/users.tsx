import type {NextPage} from 'next';
import {useEffect, useState} from 'react';

import Header from '../components/Header';
import {ethers} from 'ethers';
import PostContract from '../contracts/PostStorage.json';

type User = {
    username: string
}

const Users: NextPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [username, setUsername] = useState('');

    const getUsername = async () => {
        try {
            // @ts-ignore
            const { ethereum } = window;

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

            setUsername(accounts[0]);
        } catch (error) {
            console.log('Error connecting to metamask', error)
        }
    }

    const getUsers = async () => {
        try {
            // @ts-ignore
            const { ethereum } = window;

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
                PostContract.abi,
                signer
            )

            const allUsers = await contract.getUsers();
            let newUsers: User[] = [];
            for (const newUser of allUsers) {
                newUsers = [...newUsers, {username: newUser}];
            }

            console.log(allUsers);

            setUsers(newUsers);
        } catch (error) {
            console.log('Error connecting to metamask', error)
        }
    }

    useEffect(() => {
        getUsername();
    }, []);

    useEffect(() => {
        getUsers();
    }, [username]);

    return (
        <div>
            <Header username={username}/>
            {
                users.filter(u => u.username.toLowerCase() != username.toLowerCase()).map(user =>
                    (<div className='flex
                                    p-3
                                    border-b
                                    border-[#38444d]
                                    flex-1 px-4'
                         key={user.username}>
                        {
                            user.username
                        }
                    </div>)
                )
            }
        </div>
    )
}

export default Users;

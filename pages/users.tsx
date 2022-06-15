import type {NextPage} from 'next';
import {useCallback, useEffect, useState} from 'react';

import Header from '../components/Header';
import {ethers} from 'ethers';
import PostContract from '../contracts/PostStorage.json';

type User = {
    username: string,
    isSubscribed: boolean,
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

    const getUsers = useCallback(async () => {
        try {
            // @ts-ignore
            const { ethereum } = window;

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
                PostContract.abi,
                signer
            )

            const allUsers = await contract.getUsers();
            let newUsers: User[] = [];
            for (const newUser of allUsers) {
                const isSubscribed = await contract.isSubscribed(newUser);

                newUsers = [...newUsers, {username: newUser, isSubscribed}];
            }

            setUsers(newUsers);

            console.log('getUsers called');
        } catch (error) {
            console.log('Error connecting to metamask', error)
        }
    }, [])

    const subscribe = async (username: string) => {
        try {
            // @ts-ignore
            const { ethereum } = window;

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
                PostContract.abi,
                signer
            )

            await contract.subscribe(username);
        } catch (error) {
            console.log('Error connecting to metamask', error)
        }
    }

    const unsubscribe = async (username: string) => {
        try {
            // @ts-ignore
            const { ethereum } = window;

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
                PostContract.abi,
                signer
            )

            await contract.unsubscribe(username);
        } catch (error) {
            console.log('Error connecting to metamask', error)
        }
    }

    useEffect(() => {
        getUsername();
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            return getUsers();
        }, 5000);

        getUsers();

        return () => clearInterval(id);
    }, [username, getUsers]);

    return (
        <div>
            <Header username={username}/>
            {
                users.filter(u => u.username.toLowerCase() != username.toLowerCase())
                    .map(user =>
                        <div className="flex
                                        p-3
                                        border-b
                                        border-[#38444d]
                                        flex-1
                                        px-4
                                        gap-3
                                        items-center"
                             key={user.username}>
                            <span className="font-bold text-xl">{user.username}</span>
                            {
                                user.isSubscribed
                                    ? <button className="bg-gray-500
                                                         py-2
                                                         px-4
                                                         rounded-2xl
                                                         text-white"
                                              onClick={_ => unsubscribe(user.username)}>
                                        Unsubscribe
                                      </button>
                                    : <button className="bg-red-500
                                                         py-2
                                                         px-4
                                                         rounded-2xl
                                                         text-white"
                                              onClick={_ => subscribe(user.username)}>
                                        Subscribe
                                      </button>
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default Users;

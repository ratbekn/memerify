//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract UserStorage {
    struct User {
        address username;
        bool exist;
    }

    mapping(address => User) users;
    address[] usernames;

    function addUser() external{
        if (users[msg.sender].exist != true) {
            users[msg.sender] = User(msg.sender, true);
            usernames.push(msg.sender);
        }
    }

    function isUserExist() external view returns(bool) {
        return users[msg.sender].exist;
    }

    function getUsers() external view returns(address[] memory) {
        return usernames;
    }
}

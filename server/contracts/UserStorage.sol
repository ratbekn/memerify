//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract UserStorage {
    struct User {
        address username;
        bool exist;
    }

    mapping(address => User) users;

    function addUser() external{
        if (users[msg.sender].exist != true) {
            users[msg.sender] = User(msg.sender, true);
        }
    }

    function isUserExist() external view returns(bool) {
        return users[msg.sender].exist;
    }
}

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract PostStorage {
    struct Post {
        uint id;
        address username;
        string content;
        bool isDeleted;
    }

    Post[] private posts;
    mapping(uint256 => address) postOwner;

    function addPost(string memory content, bool isDeleted) external {
        uint postId = posts.length;
        posts.push(Post(postId, msg.sender, content, isDeleted));
        postOwner[postId] = msg.sender;
    }

    function getPosts() external view returns (Post[] memory) {
        Post[] memory temporary = new Post[](posts.length);
        uint counter = 0;
        for (uint i = 0; i < posts.length; i++) {
            if (posts[i].isDeleted == false && subscriptions[msg.sender][posts[i].username]) {
                temporary[counter] = posts[i];
                counter++;
            }
        }

        Post[] memory result = new Post[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

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
            subscriptions[msg.sender][msg.sender] = true;
        }
    }

    function isUserExist() external view returns(bool) {
        return users[msg.sender].exist;
    }

    function getUsers() external view returns(address[] memory) {
        return usernames;
    }

    mapping(address => mapping(address => bool)) subscriptions;

    function subscribe(address username) external {
        subscriptions[msg.sender][username] = true;
    }

    function unsubscribe(address username) external {
        subscriptions[msg.sender][username] = false;
    }

    function isSubscribed(address username) external view returns(bool) {
        return subscriptions[msg.sender][username];
    }
}

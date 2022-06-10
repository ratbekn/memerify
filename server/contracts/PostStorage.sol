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
            if (posts[i].isDeleted == false) {
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
}
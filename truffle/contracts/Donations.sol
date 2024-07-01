// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donations {
    uint public donationCount = 0;

    struct Donation {
        uint id;
        string donator;
        uint amount;
        uint256 timestamp; //block.timestamp
    }

    mapping(uint => Donation) public donationList;

    event DonationCreated(
        uint id,
        string donator,
        uint amount,
        uint256 timestamp
    );

    constructor() {
    }

    function createDonation(string memory _donator,  uint _amount) public payable{
        uint _id = donationCount;
        uint256 _timestamp = block.timestamp;
        donationList[_id] = Donation(_id, _donator, _amount, _timestamp);
        donationCount++;
        emit DonationCreated(_id, _donator, _amount, _timestamp);
    }

    function getDonations(uint _id) public view returns (Donation memory) {
        
        Donation memory res = donationList[_id];
        return res;
    }

    function getDonations() public view returns (Donation[] memory) {
        Donation[] memory res = new Donation[](donationCount);
        for (uint i=0; i < donationCount; i++) {
            res[i] = donationList[i];
        }
        return res;
    }
}

pragma solidity >0.4.23 <0.7.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Fundraiser is Ownable {
    string public name;
    string public url;
    string public imageURL;
    string public description;
    address public custodian;
    address payable public beneficiary;
    struct Donation {
        uint256 value;
        uint256 date;
    }
    mapping(address => Donation[]) private _donations;

    constructor(
        string memory _name,
        string memory _url,
        string memory _imageURL,
        string memory _description,
        address _custodian,
        address payable _beneficiary
    ) public {
        name = _name;
        url = _url;
        imageURL = _imageURL;
        description = _description;
        beneficiary = _beneficiary;
        // custodian = _custodian;
        transferOwnership(_custodian);
    }

    function setBeneficiary(address payable _addr) public onlyOwner {
        beneficiary = _addr;
    }

    function myDonationsCount() public view returns (uint256) {
        return _donations[msg.sender].length;
    }
}

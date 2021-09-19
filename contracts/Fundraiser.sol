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

    function donate() public payable {
        Donation memory donation = Donation({
            value: msg.value,
            date: block.timestamp
        });
        _donations[msg.sender].push(donation);
    }

    function myDonations()
        public
        view
        returns (uint256[] memory values, uint256[] memory dates)
    {
        uint256 count = myDonationsCount();
        values = new uint256[](count);
        dates = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            Donation storage donation = _donations[msg.sender][i]; // memoryでやる必要はなく、storageが有れば、そのまま参照したほうがいい
            values[i] = donation.value;
            dates[i] = donation.date;
        }
        return (values, dates);
    }
}

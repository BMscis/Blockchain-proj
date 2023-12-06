// EscrowContract.sol
pragma solidity ^0.8.0;

contract EscrowContract {
    address public buyer;
    address public seller;
    address public arbiter;
    uint public amount;

    enum State { Created, Locked, Released, InDispute, DisputeResolved }
    State public state;

    constructor(address _seller, address _arbiter) payable {
        buyer = msg.sender;
        seller = _seller;
        arbiter = _arbiter;
        amount = msg.value;
        state = State.Created;
    }

    modifier onlyBuyer() {
        require(msg.sender == buyer);
        _;
    }

    modifier inState(State _state) {
        require(state == _state);
        _;
    }

    function deposit() public onlyBuyer payable {
        require(state == State.Created);
        state = State.Locked;
    }

    function release() public onlyBuyer inState(State.Locked) {
        state = State.Released;
        payable(seller).transfer(amount);
    }

    function dispute() public onlyBuyer inState(State.Locked) {
        state = State.InDispute;
    }

    function resolveDispute() public {
        require(msg.sender == arbiter);
        state = State.DisputeResolved;
        payable(buyer).transfer(amount);
    }
}

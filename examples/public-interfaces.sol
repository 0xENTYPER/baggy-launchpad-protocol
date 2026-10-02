// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Public-safe interface sketch. This is not deployable Baggy production code.

struct LaunchRequest {
    string name;
    string symbol;
    string metadataURI;
    uint256 minCreatorTokensOut;
}

interface ILaunchFactory {
    event TokenLaunched(
        address indexed creator,
        address indexed token,
        address indexed market,
        string metadataURI
    );

    function launch(LaunchRequest calldata request)
        external
        payable
        returns (address token, address market);
}

interface ICurveMarket {
    function quoteBuy(uint256 valueIn) external view returns (uint256 tokensOut);

    function quoteSell(uint256 tokensIn) external view returns (uint256 valueOut);

    function buy(uint256 minTokensOut)
        external
        payable
        returns (uint256 tokensOut);

    function sell(uint256 tokensIn, uint256 minValueOut)
        external
        returns (uint256 valueOut);

    function claimCreatorFees() external;
}

interface IGraduationCoordinator {
    event Graduated(
        address indexed token,
        address indexed market,
        uint256 positionId
    );

    function graduate(address market, uint160 boundedInitialPrice)
        external
        returns (uint256 positionId);
}

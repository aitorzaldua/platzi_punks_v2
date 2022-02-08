// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; //v. actual de openzeppelin

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PlatziPunks is ERC721, ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _idCounter;

    uint256 public maxSupply;

    constructor(uint256 _maxSupply) ERC721("PlatziPunks", "PLPKS") {
        maxSupply = _maxSupply;
    }

    function mint() public {
        uint256 current = _idCounter.current();
        _idCounter.increment();
        require(current < maxSupply, "No PlatziPunks left, sorry! :(");
        _safeMint(msg.sender, current);
    }

    //Implementar tokenURI para la creacion del ADN
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
        {
            require(
                _exists(tokenId),
                "ERC721 Metadata: URI query for nonexistent token"
            );

        string memory jsonURI = string(
		abi.encodePacked(
				'{ "name": "PlatziPunks #',
				tokenId, //esto puede ser número o usar una utils to_string() de OZ
				'", "description": "PlatziPunks is a random avatar"',
				"//PDTE: metadatos de la imagen",
				'"}'
            )
        );

        return jsonURI


    }

    //Override required
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


}
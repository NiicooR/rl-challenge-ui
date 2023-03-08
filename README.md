## Prerequisites

node: v18.12.1
npm: 8.19.2

In order to run this project copy the .env.sample file and place it into a .env file

In order to test this wallet already have some assets minted.
Wallet private key : 23b4e6b20052dfa866517a8538ecb062fa85473cd9933036c66ad386f691a26b

## Getting Started

yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Improvements

- overall UI redesign according to requirements
- /usdBalance handler can use a cache layer in order to avoid rate limiting issues.
- globalError hook to display proper error messages.
- some information could be stored in a separated context in order to avoid refetching to the smart contract. This data can be updated properly when needed.
- http api request can be handled with an a proper service layer, cache can be used if needed.
- metamask events could be listened in order to identify a wallet disconnection.
- GlobalContext too global. Different and smaller context must be used. Use reducer as well must be used in case of context state and update actions are many.
- Backend and Front end could share a typing library in order to handle the same dto and to fully type request bodies and responses

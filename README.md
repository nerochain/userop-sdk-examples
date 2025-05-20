# UserOp SDK Examples

A collection of example scripts for working with ERC-4337 on NERO Chain. These examples demonstrate how to interact with Account Abstraction (ERC-4337) features.

## Prerequisites

- Node.js v18.12.1 or later
- Yarn v1.22.19 or later

## Installation

1. Clone the repository:

```bash
git clone git@github.com:nerochain/userop-sdk-examples.git
cd userop-sdk-examples
```

2. Install dependencies:

```bash
yarn install
```

3. Generate configuration file:

```bash
yarn generate-config
```

4. Update the `config.json` with your specific values:

```json
{
  "_comment": "This config is for the NERO Chain Testnet.",
  "_comment1": "Information about each of the params can be found at NERO Docs(https://docs.nerochain.io/en/developer-tools/accessEntryPoint).",
  "rpcUrl": "https://rpc-testnet.nerochain.io",
  "signingKey": "YOUR_PRIVATE_KEY",
  "entryPoint": "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  "factory": "0x9406Cc6185a346906296840746125a0E44976454",
  "bundlerRpc": "https://bundler-testnet.nerochain.io",
  "paymaster": {
    "rpcUrl": "https://paymaster-testnet.nerochain.io",
    "type": "select type",
    "apikey": "YOUR_PAYMASTER_API_KEY",
    "token": "ERC20_TOKEN_ADDRESS"
  }
}
```

## Dependencies

The implementation uses the following main packages:

- `ethers`: Ethereum wallet and utilities
- `userop`: Account Abstraction SDK
- `commander`: CLI interface

## Note
Please refer to these docs for information on using the UserOp-SDK(https://docs.nerochain.io/en/developer-tools/user-op-sdk).

For inquiries regarding the Paymaster, please open a ticket on the NERO Discord(https://discord.com/invite/nerochainofficial).


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

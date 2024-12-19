# ERC-4337 Examples

A collection of example scripts for working with ERC-4337 on NERO Chain. These examples demonstrate how to interact with Account Abstraction (ERC-4337) features.

## Prerequisites

- Node.js v18.12.1 or later
- Yarn v1.22.19 or later

## Installation

1. Clone the repository:

```bash
git clone https://github.com/nerochain/erc4337-examples.git
cd erc4337-examples
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
  "rpcUrl": "https://rpc-testnet.nerochain.io",
  "signingKey": "YOUR_PRIVATE_KEY",
  "entryPoint": "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  "factory": "0x9406Cc6185a346906296840746125a0E44976454",
  "bundlerRpc": "https://bundler.service.nerochain.io",
  "paymaster": {
    "rpcUrl": "https://paymaster.nerochain.io",
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
For inquiries regarding the Paymaster, please open a ticket on the NERO Discord(https://discord.com/invite/nerochainofficial).


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

import fs from "fs/promises";
import path from "path";
import prettier from "prettier";
import { ethers } from "ethers";

const INIT_CONFIG = {
  _comment: "This config is for the NERO Chain Testnet.",
  _comment1: "Information about each of the params can be found at NERO Docs(https://docs.nerochain.io/en/aa/accessEntryPoint).",
  rpcUrl: "https://rpc-testnet.nerochain.io",
  signingKey: new ethers.Wallet(ethers.utils.randomBytes(32)).privateKey,
  entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  factory: "0x9406Cc6185a346906296840746125a0E44976454",
  bundlerRpc: "https://bundler.service.nerochain.io", 
  paymaster: {
    rpcUrl: "https://paymaster-testnet.nerochain.io",
    type: "select type",
    apikey: "Paymaster_ApiKey",
    token: "ERC20Token_ContractAddress"
  },
};

async function main() {
  const CONFIG_PATH = path.resolve(__dirname, "../config.json");
  
  try {
    const configDir = path.dirname(CONFIG_PATH);
    try {
      await fs.access(configDir);
    } catch {
      await fs.mkdir(configDir, { recursive: true });
    }

    const configContent = await prettier.format(
      JSON.stringify(INIT_CONFIG, null, 2),
      { parser: "json" }
    );
    
    await fs.writeFile(CONFIG_PATH, configContent);
    console.log(`Config written to ${CONFIG_PATH}`);
  } catch (error) {
    console.error("Failed to write config:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import { ethers } from "ethers";
import { ERC20_ABI } from "../../src";
// @ts-ignore
import config from "../../config.json";
import { Client, Presets } from "userop";
import { CLIOpts } from "../../src";

export default async function main(
  tkn: string,
  t: string,
  amt: string,
  opts: CLIOpts
) {
  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    new ethers.Wallet(config.signingKey),
    config.rpcUrl,
    {
      overrideBundlerRpc: config.bundlerRpc,
      entryPoint: config.entryPoint,
      factory: config.factory,
    }
  );

  simpleAccount.setPaymasterOptions({
    apikey: config.paymaster.apikey,
    rpc: config.paymaster.rpcUrl,
    type: config.paymaster.type || 0,
    token: config.paymaster.token,
  });

  const client = await Client.init(config.rpcUrl, {
    overrideBundlerRpc: config.bundlerRpc,
  });

  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  const token = ethers.utils.getAddress(tkn);
  const to = ethers.utils.getAddress(t);
  const erc20 = new ethers.Contract(token, ERC20_ABI, provider);
  const [symbol, decimals] = await Promise.all([
    erc20.symbol(),
    erc20.decimals(),
  ]);
  const amount = ethers.utils.parseUnits(amt, decimals);
  console.log(`Transferring ${amt} ${symbol}...`);

  const res = await client.sendUserOperation(
    simpleAccount.execute(
      erc20.address,
      0,
      erc20.interface.encodeFunctionData("transfer", [to, amount])
    ),
    {
      dryRun: opts.dryRun,
      onBuild: (op) => console.log("Signed UserOperation:", op),
    }
  );
  console.log(`UserOpHash: ${res.userOpHash}`);

  console.log("Waiting for transaction...");
  const ev = await res.wait();
  console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
}

import { ethers } from "ethers";
import { Client, Presets } from "userop";
import { CLIOpts } from "../../src";
// @ts-ignore
import config from "../../config.json";

export default async function main(t: string, amt: string, opts: CLIOpts) {
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
    token : config.paymaster.token
  });

  const client = await Client.init(config.rpcUrl, {
    overrideBundlerRpc: config.bundlerRpc,
  });

  const target = ethers.utils.getAddress(t);
  const value = ethers.utils.parseEther(amt);
  const res = await client.sendUserOperation(
    simpleAccount.execute(target, value, "0x"),
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

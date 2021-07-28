import { HardhatRuntimeEnvironment, Network } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { utils } from "ethers";

const contractName = "HelloWorld";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, tenderly, network } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const helloWorld = await deploy(contractName, {
    args: ["world"],
    from: deployer,
    log: true,
    gasPrice: utils.hexlify(utils.parseUnits("2", "gwei")),
  });

  await tenderly.persistArtifacts({
    name: contractName,
    address: helloWorld.address,
  });

  await tenderlyVerify(
    contractName,
    helloWorld.address,
    network.name,
    tenderly
  );
};
export default func;
func.tags = [contractName];

// If you want to verify on https://tenderly.co/
const tenderlyVerify = async (
  contractName: string,
  contractAddress: string,
  network: string,
  tenderly: any
) => {
  let tenderlyNetworks = [
    "kovan",
    "goerli",
    "mainnet",
    "rinkeby",
    "ropsten",
    "matic",
    "mumbai",
    "xDai",
    "POA",
  ];

  if (tenderlyNetworks.includes(network)) {
    console.log(
      `Tenderly... Attempting tenderly verification of ${contractName} on ${network}`
    );

    const verification = await tenderly.verify({
      name: contractName,
      address: contractAddress,
      network,
    });

    return verification;
  } else {
    console.log(
      `Tenderly... Contract verification not supported on ${network}`
    );
  }
};

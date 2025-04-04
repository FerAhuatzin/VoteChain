const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with address:", deployer.address);

  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const relayer = deployer.address;

  const votingSystem = await VotingSystem.deploy(relayer);
  await votingSystem.waitForDeployment();

  const deployedAddress = await votingSystem.getAddress();
  console.log("VotingSystem deployed at:", deployedAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


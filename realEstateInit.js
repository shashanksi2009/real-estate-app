fs = require('fs');
Web3 = require('web3');
web3 = new Web3( new Web3.providers.HttpProvider("http://localhost:8545/") );
console.log("Connected to Blockchain !!");
code = fs.readFileSync("realEstate.sol").toString();
solc = require('solc');
console.log("Compiling realEstate.sol ...");
compiledCode = solc.compile( code );
console.log("Compiled successfully!!");
abi = JSON.parse( compiledCode.contracts[":realEstate"].interface );
byteCode = compiledCode.contracts[':realEstate'].bytecode ;
realEstateContract =  web3.eth.contract(abi) ;
console.log("Deploying ...")
deployedContract = realEstateContract.new({data: byteCode , from: web3.eth.accounts[0] , gas: 3000000 },
( e , contract )=>{
      if( contract.address )
        {
          console.log("Deployed successfully...\n\n\nDeployed Address : " + contract.address );
          console.log("Use the above deployed address in realEstate.js ...\n\n");
        }
});

//Async function
const deploy = async () => {

    //Se le indica a ethers que adquiera el deployer
    const [deployer] = await ethers.getSigners();

    console.log ("Deploying contract with account: ", deployer.address);

    //Se crea la instancia del contrato desplegado
    const Platzi_Punks = await ethers.getContractFactory("PlatziPunks");
    const deployed = await Platzi_Punks.deploy();

    console.log("Platzi Punks deployed at: ", deployed.address);
}

//Llamada a la funcion deploy. Una vez se complete,
//se indica que cierre el proceso.
//En caso de fallo, se añade un catch para que lo envie a la consola
deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
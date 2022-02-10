//chai es una libreria de test que facilita hardhat
//Para hacer pruebas sencillas, solo importamos expect de esa lib.
const { expect } = require("chai");

//Describe
describe("Platzi Punks Contract", () => {
    const setup = async ({ maxSupply = 10000 }) => {
      const [owner] = await ethers.getSigners();
      const PlatziPunks = await ethers.getContractFactory("PlatziPunks");
      const deployed = await PlatziPunks.deploy(maxSupply);
  
      return {
        owner,
        deployed,
      };
    };



   describe('Deployment', () => {
        it('Set max supply to passed param', async () => {
            const maxSupply = 4000;

            const { deployed } = await setup({ maxSupply });

            //esta constante nos retorna el valor del contrato desplegado
            //para su función maxSupply()
            const returnedMaxSupply = await deployed.maxSupply();

            //Comparamos ambos valores si son iguales:
            expect(maxSupply).to.equal(returnedMaxSupply);

        });

    });

})
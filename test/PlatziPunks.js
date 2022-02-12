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


    //Test 1: Probar que no se pasa del maxSupply
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

    //Test 2: Minting
    describe('Minting', () => {
      it('Testing _safeMInt: Mints a new token and assigns it to owner', async () => {

        const maxSupply = 4000;
        const { owner, deployed } = await setup({ maxSupply });

        await deployed.mint();
        const ownerofMinted = await deployed.ownerOf(0);

        expect (ownerofMinted).to.equal(owner.address);

      })
    })

    //Test 3: Minting limit
    describe('Limit', () => {
      it('Has a minting limit', async () => {
        const maxSupply = 2;
        const { deployed } = await setup({ maxSupply });

        //Para probar el supply hay que mintear hasta el límite de 2 que hemos asignado:
        await deployed.mint();
        await deployed.mint();

        //Ahora hay que hacer un tercer mint y la respuesta debe ser que no se puede:
        await expect(deployed.mint()).to.be.revertedWith("No PlatziPunks left, sorry! :(");

      })

    })

    //Test 4: Probar
    describe('TokenURI', () => {
      it('return a valid metadata', async () => {
        const { deployed } = await setup({});

        //Hacemos un deploy y seguido tomamos el tokenURI(con tokenId = 0):
        await deployed.mint();
        const tokenURI = await deployed.tokenURI(0);
        //pasamos a string el tokenURI:
        const stringfieldTokenURI = await tokenURI.toString();

        //El TokenURI tiene dos partes: el prefijo y la url -> eliminamos el prefijo
        //haciendo un split
        const [, base64JSON] = stringfieldTokenURI.split(
          "data:application/json;base64"
        );

       //Tenemos algo así en base64JSON=084530ad085f...
       //lo pasamos a bytes 1001100.. con Buffer
       //lo pasamos a ascci con toString("ascii")
        const stringfieldMetadata = await Buffer.from(
          base64JSON,
          "base64").toString("ascii");
        //El resultado es tal que { "name": "Platzi..."}

        //Guardamos:
        const metadata = JSON.parse(stringfieldMetadata);

        expect(metadata).to.have.all.keys("name", "description", "image");


      })
    })


})
import wallet from "../cluster1/wallet/dev-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        const nftImage = await readFile('/Users/shubbu/DEV/solana-starter/ts/cluster1/images/img1.jpg');

        //2. Convert image to generic file.
        const genericImg = createGenericFile(nftImage, "best-nft");

        //3. Upload image
        const [myUri] = await umi.uploader.upload([genericImg])
        console.log("Your image URI: ", myUri);
        //result - https://arweave.net/7aoW1Qzp8RAPge4MviikoQCWsEsCc5AZ8Gj1mRj7hUbV
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

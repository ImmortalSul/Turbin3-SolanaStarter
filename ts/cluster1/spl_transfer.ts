import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("APnuP9a4j1V4xyLZxkAooFAPQ5dcDriux6kJHLW2SgxH");

// Recipient address
const to = new PublicKey("AECgSpfrxmn75JV2MpenyxXJHn74ik5bUztax46A5xo5");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromWallet = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
          );

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toWallet = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
          );

        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(
            connection,
            keypair,
            fromWallet.address,
            toWallet.address,
            keypair.publicKey,
            1e6
          );
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();


//https://solscan.io/tx/3iUcaHd539hNhtRcLY4CbBg14yC1TfhSx7cWTqrjVJuoGqqKyvZ89KydKjyGbDZS4ur2R18TbHkfANmSnkDsKzrs?cluster=devnet

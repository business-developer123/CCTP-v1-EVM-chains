import { CircleTransfer, wormhole } from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/evm';
import solana from '@wormhole-foundation/sdk/solana';
import { getSigner } from './helpers/helpers';

(async function () {
	// Initialize the Wormhole object for the Testnet environment and add supported chains (evm and solana)
	const wh = await wormhole('Mainnet', [evm, solana], {
		chains: {
			Solana: {
				rpc: "https://solitary-withered-dew.solana-mainnet.quiknode.pro/55f2b66cd9f12e5949fb5debd7cb32e75d0f0525"
			},
			Polygon: {
				rpc: "https://rpc.ankr.com/polygon/3e9ecdbc3076f111c0ca53ddac26263619541b34713e23ca558c97ce87fc607e"
			}
		}
	});

	// Grab chain Contexts -- these hold a reference to a cached rpc client
	const sendChain = wh.getChain('Solana');
	const rcvChain = wh.getChain('Polygon');

	// Get signer from local key
	const source = await getSigner(sendChain);
	const destination = await getSigner(rcvChain);

	// Define the amount of USDC to transfer (in the smallest unit, so 0.1 USDC = 100,000 units assuming 6 decimals)
	const amt = 100_000n;

	const automatic = false;

	// Create the circleTransfer transaction (USDC-only)
	const xfer = await wh.circleTransfer(amt, source.address, destination.address, automatic);
	console.log('Circle Transfer object created:', xfer);

	const quote = await CircleTransfer.quoteTransfer(sendChain, rcvChain, xfer.transfer);
	console.log('Quote: ', quote);

	// Step 1: Initiate the transfer on the source chain (Avalanche)
	console.log('Starting Transfer');
	const srcTxids = await xfer.initiateTransfer(source.signer);
	console.log(`Started Transfer: `, srcTxids);

	// Step 2: Wait for Circle Attestation (VAA)
	const timeout = 120 * 1000; // Timeout in milliseconds (120 seconds)
	console.log('Waiting for Attestation');
	const attestIds = await xfer.fetchAttestation(timeout);
	console.log(`Got Attestation: `, attestIds);

	// Step 3: Complete the transfer on the destination chain (Sepolia)
	console.log('Completing Transfer');
	const dstTxids = await xfer.completeTransfer(destination.signer);
	console.log(`Completed Transfer: `, dstTxids);

	console.log('Circle Transfer status: ', xfer);

	process.exit(0);
})();

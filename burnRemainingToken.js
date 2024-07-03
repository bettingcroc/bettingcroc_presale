import { preSaleContract , PUBLIC_KEY_CREATOR} from "./config.js"

preSaleContract.methods.burnRemainingTokens().send({ from: PUBLIC_KEY_CREATOR }).on('receipt', function (receipt) {
    console.log(receipt)
}).catch((error) => {
    console.log(error)
})
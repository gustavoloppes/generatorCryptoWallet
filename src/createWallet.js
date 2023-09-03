// importanto dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//bitcoin - teste de rede principal - mainfrain
// testnet - rede de teste - tesnet
const network = bitcoin.networks.testnet


// derivacao de enderecos de carteiras hd
const path = `m/49'/1'/0'/0`


// palavras aleatorias
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// criando a raiz da carteira
let root = bip32.fromSeed(seed, network)


// criando uma conta - par de pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)


// criando nosso endereco
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address


console.log("Carteira Gerada!")
console.log(`Endereco: ${btcAddress}`)
console.log(`Chave privada: ${node.toWIF()}`)
console.log(`Seed: ${mnemonic}`);
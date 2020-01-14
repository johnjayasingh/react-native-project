export const INITIAL_STATE = {
  store: {
    id: "",
    email: "",
    password: ""
  },
  mnemonic:
    "sister cereal head stick gauge expose deposit carpet clip carbon style umbrella",
  profile: {
    id: "",
    image:
      "https://cdn.pixabay.com/photo/2017/04/15/04/36/incognito-2231825__340.png",
    name: "",
    email: "",
    phone: "",
    address: "",
    country: ""
  },
  session: {
    token: "",
    loading: true,
    uploading: true
  },
  settings: {
    cryptoConversion: {
      BTC: 10000000,
      BCH: 10000000,
      ETH: 1000000000,
      ETC: 1000000000
    },
    fiatCode: "USD",
    profileIndex: 0,
    cryptoIndex: 0 // 0-23
  },
  tempDefaults: {
    credentialIndex: 0, // 0-3
    cryptoIndex: 0, // 0-23
    clipboard: "Copy Text" // String
  },
  credentials: {
    BTC: {
      publicKey: "mtxkCqKiCdDdpg9wTVyNGMDRd1Goir7PnA",
      privateKey: "cVpgn4JXkkRnuh6JBHeS5MCTUyG3MWGP3dmqSGQf4SwWzKCtKd9M"
    },
    BCH: {
      publicKey: "mozfGvTmujWHX9M7NFtJ4kTav7LSzwUr6s",
      privateKey: "cPuFaAi6o5Dyq7nuVUw5Hs5YaVHrjbwPrTWbVoEs6YSGDH3WV9kU"
    },
    ETC: {
      publicKey: "0xe7c6d8d5a9b1b0e472d9d93eb245632205014875",
      privateKey:
        "0x11915c02a6422580a31b183bc473092d5e2803cc473f175e05f2cd1ae350f57c"
    },
    ETH: {
      publicKey: "0x5ff5c997202f1ca1c879e0d83bcf27996d3353f1",
      privateKey:
        "0xe9752f455ac1f4780af1d6c116e5adad12e380593a2ac282c9a4747a441ecd92"
    }
  },
  cryptoCurrencies: [
    {
      displayText: "--",
      coinCode: "--",
      image: "../assets/images/bitcoin.png",
      symbol: "฿",

      address: "--",
      balance: 0,
      displayBalance: 0,
      unspendOutputs: [],
      fiatSymbol: "USD",
      fiatBalance: "0"
    }
  ],
  transaction: {
    // to: "msugquxEaTHNN26S3J2tee2QhrXvbrrNL4",
    to: "",
    amount: "",
    hash: ""
  },
  transactionHistory: []
};

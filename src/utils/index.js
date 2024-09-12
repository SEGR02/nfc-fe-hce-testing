import { Keyboard } from "react-native";
import NfcManager from "react-native-nfc-manager";
import { Clipboard } from "react-native";

export const handleOnPressOut = (inputRef) => {
  if (inputRef.current) {
    inputRef.current.blur();
  }
  Keyboard.dismiss();
};

export const images = [
  { cardImage: require("../../assets/cardToInsertText.png") },
  { cardImage: require("../../assets/secondaryCardToEdit.png") },
  { cardImage: require("../../assets/tertiaryCardToEdit.png") },
];

export const getBlockchain = (blockchainId) => {
  const blochains = {
    1: "BNB Chain",
    2: "Polygon",
    3: "Ethereum",
    4: "Solana",
  };
  return blochains?.[blockchainId];
};

export const getCrypto = (cryptoId) => {
  const cryptos = {
    1: "USDT",
    2: "USDC",
    3: "CB8",
    4: "BTC",
  };
  return cryptos?.[cryptoId];
};

export const cleanUp = () => {
  NfcManager.cancelTechnologyRequest().catch(() => 0);
};

export const formatWallet = (wallet) => {
  if (typeof wallet !== "string" || wallet.length < 10) {
    throw new Error(
      "La dirección debe ser una cadena de texto con al menos 10 caracteres."
    );
  }

  const firstFive = wallet.slice(0, 5);
  const lastFive = wallet.slice(-5);

  return `${firstFive}............${lastFive}`;
};

export const getCommerceWallet = (commerceId) => {
  const commerces = [
    {
      name: "Amazon",
      wallet: "0x8e60337b58566e51245e48eebbf56867ec45b34d",
      id: 1,
    },
    {
      name: "Walmart",
      wallet: "0xE314929cb1b284CfE4622D9c8d997b1D504369a7",
      id: 2,
    },
  ];
  const commerce = commerces.find((commerce) => commerce.id === commerceId);
  return commerce.wallet;
};

export const copyToClipboard = (address) => {
  Clipboard.setString(address);
  alert("Address copied to clipboard!");
};

export const getTokenAddress = (cryptoId) => {
  const tokenAddresses = {
    1: "0x55d398326f99059ff775485246999027b3197955",
    2: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    3: "0xb3a7713521007d79e757f83ce763ded56bb0f6b3",
    4: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    5: "0x3E14602186DD9dE538F729547B3918D24c823546", // !bnb
    6: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", //! wbnb
    7: "0xD88df921a91D24Fe12A9Fd15Cb88e52A182F6605", //!tk1
    8: "0xDAC9331f5d27DE207F4c511003766C175a7682B2", //!tk2
  };
  const hola = [
    {
      name: "BNB",
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      decimals: 18,
      network: "BSC",
    },
    {
      name: "USDT",
      address: "0x55d398326f99059fF775485246999027B3197955",
      decimals: 18,
      network: "BSC",
    },
    {
      name: "TK1",
      address: "0xD88df921a91D24Fe12A9Fd15Cb88e52A182F6605",
      decimals: 18,
      network: "BSC",
    },
    {
      name: "TK2",
      address: "0xDAC9331f5d27DE207F4c511003766C175a7682B2",
      decimals: 18,
      network: "BSC",
    },
  ];
  return tokenAddresses?.[cryptoId];
};

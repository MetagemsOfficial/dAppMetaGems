const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "WOMLand";
const description = "WOM Land Collection will be on 5 different generative areas of the map. The first zone, called Androth, consists of 7777 Lands which will generate a certain amount of Dustz daily depending on the tier of the Land . Each type of Land will have random resources that will surface every day which allows any player to collect, use or resell in the Metaverse. Lands are blockchain-based virtual spaces (using the ERC-721 standard for NFTs) representing property plots of World of MetaGems Metaverse. They allow players to own part of the Metaverse and thus be able to build/host content (NFTs collections and digital experiences).";
const baseUri = "ipfs://QmRZXQhHETBLoF7teCokThpJVGer7s9ER7U6kP1eM3zZTj/";

const solanaMetadata = {
  symbol: "WOMLand",
  seller_fee_basis_points: 700, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/Metagems777",
  creators: [
    {
      address: "0xa8a3158c437ef93E667E169d12d57E056a6d398E",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 2499,
    layersOrder: [
      { name: "WOMLand Basic" },
      { name: "Land Logo" },
      { name: "Land Name" },
      { name: "Main Ressources" },
      { name: "Second Ressources" },
      { name: "Size Basic" },
      { name: "Square Meters Basic" },

    ],
  },
  {
    growEditionSizeTo: 4499,
    layersOrder: [
      { name: "WOMLand Deluxe" },
      { name: "Land Logo" },
      { name: "Land Name" },
      { name: "Main Ressources" },
      { name: "Second Ressources" },
      { name: "Size Deluxe" },
      { name: "Square Meters Deluxe" },

    ],
  },
  {
    growEditionSizeTo: 5999,
    layersOrder: [
      { name: "WOMLand Special" },
      { name: "Land Logo" },
      { name: "Land Name" },
      { name: "Main Ressources" },
      { name: "Second Ressources" },
      { name: "Size Special" },
      { name: "Square Meters Special" },

    ],
  },
  {
    growEditionSizeTo: 7000,
    layersOrder: [
      { name: "WOMLand Supreme" },
      { name: "Land Logo" },
      { name: "Land Name" },
      { name: "Main Ressources" },
      { name: "Second Ressources" },
      { name: "Size Supreme" },
      { name: "Square Meters Supreme" },

    ],
  },
 
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 450,
  height: 450,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};

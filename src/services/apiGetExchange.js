import axios from "axios";

export const apiGetExchange = async (cryptoCurrency) => {
  let crypto;
  if (cryptoCurrency == "USDT") crypto = "tether";
  if (cryptoCurrency == "USDC") crypto = "usd-coin";
  if (cryptoCurrency == "CB8") crypto = "chabit";
  if (cryptoCurrency == "BTC") crypto = "bitcoin";
  return axios
    .get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=eur&x_cg_demo_api_key=CG-en2DAmCaM4gh7Cn2cR7PPDpn`
    )
    .then((response) => response?.data?.[crypto]?.eur)
    .catch((error) => console.log(error));
};

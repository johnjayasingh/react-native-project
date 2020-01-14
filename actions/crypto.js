import { CHANGE_SELECTED_CRYPTO } from "../constants/Action";

export const changeSelectedCrypto = data => ({
  type: CHANGE_SELECTED_CRYPTO,
  data
});

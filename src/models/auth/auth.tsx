import axios, { AxiosResponse } from "axios";
import {
  Auth,
  signOut,
  getAuth,
  signInWithCustomToken,
  UserCredential,
} from "@firebase/auth";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const uriListLocal = {
  getNonceToSign:
    "http://localhost:5001/world-of-pengs-game/us-central1/getNonceToSign",
  verifySignedMessage:
    "http://localhost:5001/world-of-pengs-game/us-central1/verifySignedMessage",
  verifyQuest:
    "http://localhost:5001/world-of-pengs-game/us-central1/verifyQuest",
};

const uriListProd = {
  getNonceToSign:
    "https://us-central1-world-of-pengs-game.cloudfunctions.net/getNonceToSign",
  verifySignedMessage:
    "https://us-central1-world-of-pengs-game.cloudfunctions.net/verifySignedMessage",
};

interface NonceResponse {
  nonce: string;
}
interface VerifyResponse {
  token: string;
}

export class AuthService {
  private _web3: Web3;
  private _auth: Auth;
  private _credential?: UserCredential;
  constructor(web3: Web3, auth: Auth) {
    this._web3 = web3;
    this._auth = auth;
  }
  public signOut() {
    return signOut(this._auth);
  }
  public signInWithMetaMask = async () => {
    let ethereum: any;
    const provider = await detectEthereumProvider();
    if (!provider) {
      throw new Error("Please install MetaMask");
    }
    ethereum = provider;
    console.log(1, ethereum);
    const address = await ethereum.request({ method: "eth_requestAccounts" });
    const response = (
      await axios.post<{ address: string }, AxiosResponse<NonceResponse>>(
        uriListLocal.getNonceToSign,
        {
          address: ethereum.selectedAddress,
        }
      )
    ).data;

    const signature = await ethereum.request({
      method: "personal_sign",
      params: [`0x${this.toHex(response.nonce)}`, ethereum.selectedAddress],
    });

    const verifiedResponse = { token: "hello" };
    // const verifiedResponse: VerifyResponse = (
    //   await axios.post<
    //     { address: String; signature: String },
    //     AxiosResponse<VerifyResponse>
    //   >(uriListLocal.verifySignedMessage, {
    //     address: ethereum.selectedAddress,
    //     signature: signature,
    //   })
    // ).data;

    const test: any = (
      await axios.post<null, AxiosResponse<any>>(uriListLocal.verifyQuest)
    ).data;

    console.log("OUAISCH", test);

    this._credential = await signInWithCustomToken(
      this._auth,
      verifiedResponse.token
    );
  };
  private toHex(stringToConvert: string) {
    return stringToConvert
      .split("")
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("");
  }
}

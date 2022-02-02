import { Auth, signOut } from "@firebase/auth";
import detectEthereumProvider from '@metamask/detect-provider';

export class AuthService {
  constructor(private http: any, private auth: Auth) {}
  public signOut() {
    return signOut(this.auth);
  }
  public signInWithMetaMask() {
    let ethereum: any;
    //   return from(detectEthereumProvider()).pipe(
    //     // Step 1: Request (limited) access to users ethereum account
    //     switchMap(async (provider) => {
    //     }),
    //     // Step 2: Retrieve the current nonce for the requested address
    //     switchMap(() =>
    //     ),
    //     // Step 3: Get the user to sign the nonce with their private key
    //     switchMap(
    //       async (response) =>
    //         //
    //     ),
    //     // Step 4: If the signature is valid, retrieve a custom auth token for Firebase
    //     switchMap((sig) =>
    //         //
    //     ),
    //     // Step 5: Use the auth token to auth with Firebase
    //     switchMap(
    //       async (response) =>
    //         //
    //     )
    //   );
  }
  private toHex(stringToConvert: string) {
    return stringToConvert
      .split("")
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("");
  }
}

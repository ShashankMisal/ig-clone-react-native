# ig-clone-react-native
## IG-CLONE Made using react-native and firebase
Expo is used for build

## Follow Below Steps to run.

1.Clone the repository
```sh
git clone "https://github.com/ShashankMisal/ig-clone-react-native.git"
```
2.Create a new file named as firebase.js at root of source code and paste the below code in firebase.js 

```sh
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
// Paste your firebaseConfig above

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}else{
    firebase.app()
}
const db = firebase.firestore()
export { firebase , db }
```
3.Go to https://console.firebase.google.com/ and create new project.Copy the firebaseConfig object and paste in above file

4.Install the dependencies
```sh
npm install
```
5.Start the server
```sh
expo start
```
6.Scan the QR-Code given in browser from android expo app or run from the simulator.
# VoteChain
Vote chain is a cross-OS mobile app that allows users to create, participate and observe polls of every kind: Politics, economics, sports, culture, general opinion, trends, etc. All of this powered with blockchain technology to perform a secure, confidencial, inmmutable and clean votation in every possible user necessity related with voting.

## Used technologies and architecture

### Frontend

#### Technlogies
- React native: All the UI was coded using this platform.
- JavaScript: For the main view JS was used.
- TypeScript: The components of the main views and other documents were made with Typescript.
#### Architecture
- Tabs and Stack wiring using Expo
- App folder contains the wiring and all the Views
- Components folder contains the individual components of each views.
   
### Backend

#### Technologies
- NodeJS
- JavaScript
- ExpressJS
- MongoDB
- Metamask
- OpenZepellin
- Sepolia Testnet (Ethereum)

#### Architecture
- Model Controller Routes


## Running project
- Clone repo
- Install Node js.

### Frontend developers

#### Requirements
- If working on Windows and wanting to run it on an emulator install Android studio, go to tools, device manager, enable an emulator or connect physical android device to computer.
- If working on mac have Xcode and open the emulator if wanting to run it on an emulator.
- If working with an Android physical device install Expo mobile.
- If working with an iOS physical device you ok. 

#### Steps 
- cd to VoteChain\Frontend
```
cd ...\VoteChain\Frontend
```
- Install the packages.
```
npm install
```
- Execute one of the following commands.
```
npm run start ##All running options including QR code to run it on your physical device

npm run android ## Run on android studio opening before the emulator

npm run ios ## You need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac

```
- Upload the ip of the API calls if wanting to make tests to the one in which is running in your computer.

### Backend developers

#### Steps 
- cd to VoteChain\Backend
```
cd ...\VoteChain\Backend
```
- Install the packages.
```
npm install
```
- Execute the following command.
```
npm run start-local
```

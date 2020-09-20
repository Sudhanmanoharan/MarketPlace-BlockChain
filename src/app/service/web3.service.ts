import {Injectable} from '@angular/core';

const marketPlaceArtifacts = require('../../../build/contracts/MarketPlace.json');

declare var require;
const Web3 = require('web3');
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private messageResult: any;

  constructor() {
  }

  public checkAndInstantiateWeb3(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        this.messageResult = 'connected';
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        resolve(this.messageResult);
      } else if (window.web3) {
        this.messageResult = 'connected';
        window.web3 = new Web3(window.web3.currentProvider);
        resolve(this.messageResult);
      } else {
        this.messageResult = 'No Erthereum browser detected. you should consider trying MetaMask';
        reject(this.messageResult);
      }
    });
  }

  public loadBlockChainData(): Promise<string> {
    return new Promise((resolve, reject) => {
      const web3 = window.web3;
      const account = web3.eth.getAccounts();
      if (account !== undefined) {
        resolve(account);
      } else {
        this.messageResult = 'There is no account';
        reject(this.messageResult);
      }
    });
  }

  public getContract() {
    return new Promise((resolve) => {
      const web3 = window.web3;
      let networkId;
      web3.eth.net.getId()
        .then((netId: any) => {
          networkId = netId;
          const abi = marketPlaceArtifacts.abi;
          const networkAddress = marketPlaceArtifacts.networks[networkId].address;
          const marketplace = new web3.eth.Contract(abi, networkAddress);
          resolve(marketplace);
        });
    });
  }

  public convertPriceToEther(price) {
    const web3 = window.web3;
    return web3.utils.toWei(price.toString(), 'Ether');
  }

  public convertEtherToPrice(price) {
    const web3 = window.web3;
    return web3.utils.fromWei(price.toString(), 'Ether');
  }

  public getEtherBalance(account) {

    return new Promise((resolve) => {
      const web3 = window.web3;
      const balance = web3.eth.getBalance(account)
        .then(ba => {
          resolve(web3.utils.fromWei(ba, 'Ether'));
        });
    });

  }

}

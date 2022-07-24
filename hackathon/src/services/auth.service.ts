import { storageService } from './storage'
import axios from 'axios'
import { baseUrl } from './http.service';

export const AUTH_CHANGE_EVENT = 'authChange';
const USER_TOKEN_KEY = 'user_token';

// const users = [{"id":"123","firstName":"John","lastName":"Smith","hashedPassword":'testPassword',"profilePicture":"https://myprofilepic@pinata.com","emailAddress":"evans@gen6ventures.com","addressLine1":"1234 N 180 ST","city":"Omaha","state":"NE","zipCode":"68022"},{"id":"62dc4369465cc043a2fa0ee2","firstName":"John","lastName":"Smith","hashedPassword":'testPassword',"profilePicture":"https://myprofilepic@pinata.com","emailAddress":"evans@gen6ventures.com","addressLine1":"1234 N 180 ST","city":"Omaha","state":"NE","zipCode":"68022"}]
// const mockLogin = async (username: string, password: string) => {
//   await new Promise<void>((resolve, reject) => {
//     setTimeout(() => resolve(), 1000);
//   })
//   const users = (await axios.get(`${baseUrl}/customers`)).data
//   const user = users.find((u: {emailAddress: string, id: string, hashedPassword: string}) => u.emailAddress === username && (u.hashedPassword === null || u.hashedPassword === password))
//   if(user) {
//     return user.id
//   } else {
//     throw '404 fake failure'
//   }
// }
export class AuthService {
  user?: {
    id: string,
    firstName: string,
    lastName: string,
    password: string,
    profilePicture: string,
    emailAddress: string,
    addressLine1: string,
    city: string,
    state: string,
    zipCode: string,
    phoneNumber: string,
  };
  private initialized?: Promise<void>;

  constructor() {
    this.initialize();
  }

  async _initialize() {
    await storageService.initialize();
    this.user = JSON.parse(await storageService.storage.get(USER_TOKEN_KEY))
  }
  initialize() {
    if(!this.initialized) {
      this.initialized = this._initialize();
    }
    return this.initialized
  }

  isAuthorized() {
    return !!this.user;
  }

  async login(username: string, password: string) {
    try {
      
      const user = (await axios.post(`${baseUrl}/customers/login`, {emailAddress: username, password})).data
      this.user = user;
      await storageService.storage.set(USER_TOKEN_KEY, JSON.stringify(user))
      document.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }
  }
  async logout() {
    this.user = undefined;
    await storageService.storage.remove(USER_TOKEN_KEY);
    document.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
  }
}

export const authService = new AuthService();

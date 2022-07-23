import { storageService } from './storage'
import axios from 'axios'
import { baseUrl } from './http.service';

export const AUTH_CHANGE_EVENT = 'authChange';
const USER_TOKEN_KEY = 'user_token';

const users = [{"id":"123","firstName":"John","lastName":"Smith","hashedPassword":'testPassword',"profilePicture":"https://myprofilepic@pinata.com","emailAddress":"evans@gen6ventures.com","addressLine1":"1234 N 180 ST","city":"Omaha","state":"NE","zipCode":"68022"},{"id":"62dc4369465cc043a2fa0ee2","firstName":"John","lastName":"Smith","hashedPassword":'testPassword',"profilePicture":"https://myprofilepic@pinata.com","emailAddress":"evans@gen6ventures.com","addressLine1":"1234 N 180 ST","city":"Omaha","state":"NE","zipCode":"68022"}]
const mockLogin = async (username: string, password: string) => {
  await new Promise<void>((resolve, reject) => {
    setTimeout(() => resolve(), 1000);
  })
  // const users = (await axios.get(`${baseUrl}customers`)).data
  const user = users.find((u: {emailAddress: string, id: string, hashedPassword: string}) => u.emailAddress === username && u.hashedPassword === password)
  if(user) {
    return user.id
  } else {
    throw '404 fake failure'
  }
}
export class AuthService {
  token?: string;
  private initialized?: Promise<void>;

  constructor() {
    this.initialize();
  }

  async _initialize() {
    await storageService.initialize();
    this.token = (await storageService.storage.get(USER_TOKEN_KEY))
  }
  initialize() {
    if(!this.initialized) {
      this.initialized = this._initialize();
    }
    return this.initialized
  }

  isAuthorized() {
    return !!this.token;
  }

  async login(username: string, password: string) {
    try {
      const userId = await mockLogin(username, password);
      this.token = userId;
      await storageService.storage.set(USER_TOKEN_KEY, userId)
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }
  }
}

export const authService = new AuthService();

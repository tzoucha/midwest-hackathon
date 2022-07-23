import { storageService } from './storage'

export const AUTH_CHANGE_EVENT = 'authChange';
const USER_TOKEN_KEY = 'user_token';
export class AuthService {
  token?: string;
  private initialized?: Promise<void>;

  constructor() {
    this.initialize();
  }

  async _initialize() {
    await storageService.initialize();
    this.token = (await storageService.storage.get(USER_TOKEN_KEY)) || 'fake_token'
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
    this.token = 'fakeToken'
    return true
  }
}

export const authService = new AuthService();

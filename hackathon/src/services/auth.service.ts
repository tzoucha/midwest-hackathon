import { storageService } from './storage'

export class AuthService {
  token?: string;
  private initialized?: Promise<void>;

  constructor() {
    this.initialize();
  }

  async _initialize() {
    await storageService.initialize();
    this.token = (await storageService.storage.get('user_token')) || 'fake_token'
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
}

export const authService = new AuthService();

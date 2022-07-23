import { Storage, Drivers } from '@ionic/storage'

const _storage = new Storage({
  name: '__mydb',
  driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
})

export class StorageService {
  private initialized?: Promise<void>;
  storage = _storage

  constructor() {
    this.initialize();
  }

  async _initialize() {
    await _storage.create();
  }
  initialize() {
    if(!this.initialized) {
      this.initialized = this._initialize();
    }
    return this.initialized
  }
}

export const storageService = new StorageService();
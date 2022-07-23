import { createContext, useContext } from "react";
import { authService } from './auth.service'
import { storageService } from "./storage";

export class Services {
  authService = authService
  storageService = storageService
}

const services = createContext(new Services());
export const ServicesProvider = services.Provider;
export const useServices = () => useContext(services)
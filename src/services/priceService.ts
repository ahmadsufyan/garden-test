import BaseService from "./base";
import { AxiosResponse } from "axios";

export default class PriceService extends BaseService {
  async loadData(signal?: AbortSignal): Promise<AxiosResponse> {
    return this.public("/data/price.json", signal);
  }
}

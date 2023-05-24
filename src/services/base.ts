import { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

const defaultInstance = axios.create();

class Base {
  private readonly instance: AxiosInstance = defaultInstance;

  protected async response(config: AxiosRequestConfig) {
    try {
      const response = await this.instance(config);
      if(typeof response?.data === "string" && response?.data.includes("error")){
        throw {
          code: 500,
          error: response.data,
        };
      }
      return {
        code: response?.status,
        data: response?.data,
      };
    } catch (error: any) {
      throw {
        code: error?.response?.status,
        error: error,
      };
    }
  }

  protected public(path: string, signal?: AbortSignal ) {
    return axios({
      method: "get",
      url: path,
      baseURL: "/",
      signal: signal,
    });
  }
}

export default Base;
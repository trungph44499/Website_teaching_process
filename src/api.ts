import axios, {AxiosInstance} from 'axios';

class Api {
  public caller!: AxiosInstance;

  static instance?: Api;

  static getInstance() {
    if (!this.instance) this.instance = new Api();
    return this.instance;
  }

  constructor() {
    this.init();
  }

  private init() {
    this.caller = axios.create({
      // baseURL: 'http://localhost:8080',
      headers: {
        'Content-type': 'application/json',
        // 'Ocp-Apim-Subscription-Key': 'd601231fa03b4e9b94596740339cec3e',
      },
    });
    // - Token
    const token = localStorage.getItem('OWS');

    if (token) this.caller.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // this.caller.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    this.caller.defaults.timeout = 1000 * 60 * 5;
  }

  // Handle
  public setToken(token: string) {
    localStorage.setItem('OWS', token);

    if (token) this.caller.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public getToken() {
    return localStorage.getItem('OWS') || null;
  }

  public removeToken() {
    localStorage.removeItem('OWS');

    this.caller.defaults.headers.common['Authorization'] = '';
  }
}

const api = Api.getInstance();

export default api;

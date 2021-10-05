import * as Util from '../index';
import axios from 'axios';

class Api {
  static postAxios(route, formData, config) {
    return this.axiosPost(route, formData, config);
  }

  static getAxios(route, formData, config) {
    return this.axiosGet(route, formData, config);
  }

  static putAxios(route, params, config) {
    return this.axiosPut(route, params, config);
  }

  static deleteAxios(route, params, config) {
    return this.axiosDelete(route, params, config);
  }

  static postMulitpart = async (endpoint, params, config) => {
    const url = `${Util.baseURL}${endpoint}`;
    let options = {
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-type': 'multipart/form-data',
      },
    };
    let configration = Object.assign(options);
    return axios
      .post(url, params, configration)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error);
        return error.response;
      });
  };

  static postRequest = async (endpoint, formData, config) => {
    const url = `${Util.baseURL}${endpoint}`;
    //console.log('[URL API]', url, formData, config);
    console.log('[URL formData]', formData);
    if (config) {
      // with header request
      let options = {
        headers: {
          Authorization: `Bearer ${config.token}`,
        },
      };
      let configration = Object.assign(options);
      return axios
        .post(url, formData, configration)
        .then((response) => {
          //console.log('SUCCESS!!', response);
          return response.data;
        })
        .catch((error) => {
          // console.log('FAILURE!!', error.response);
          if (error.response) {
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          }
          return error.response;
        });
    } else {
      // without header request
      //  console.log('Without Header Request');
      return axios
        .post(url, formData)
        .then((response) => {
          //      console.log('SUCCESS!!', response);
          return response.data;
        })
        .catch((error) => {
          //        console.log('FAILURE!!', error);
          return error.response;
        });
    }
  };

  static axiosPost = async (endpoint, formData, config) => {
    const url = `${Util.baseURL}${endpoint}`;
    // console.log('[URL API]', url, formData, config);
    return axios
      .post(url, formData, config)
      .then((response) => {
        // console.log('SUCCESS!!', response);
        return response.data;
      })
      .catch((error) => {
        //  console.log('FAILURE!!', error);
        return error.response;
      });
  };

  static axiosGet = async (endpoint, formData, config) => {
    // console.log('[get-axios-call]', endpoint, formData, config);
    let url = `${Util.baseURL}${endpoint}`;
    //  console.log('[URL API]', url);

    if (config) {
      // with header request
      let options = {
        headers: {
          Authorization: `Bearer ${config.token}`,
        },
      };
      //   console.log('[get-axios-header]', options);
      let configration = Object.assign(options);
      return axios
        .get(url, formData, configration)
        .then((response) => {
          //    console.log('SUCCESS!!', response);
          return response.data;
        })
        .catch((error) => {
          //    console.log('FAILURE!!', error);
          return error;
        });
    } else {
      // without header request
      return axios
        .get(url, formData)
        .then((response) => {
          //     console.log('SUCCESS!!', response);
          return response.data;
        })
        .catch((error) => {
          //   console.log('FAILURE!!', error);
          return error;
        });
    }
  };

  static axiosDelete = async (endpoint, formData, config) => {
    // console.log('[delete-axios-call]', endpoint, formData, config);
    let url = `${Util.baseURL}${endpoint}`;
    // console.log('[URL API]', url);

    if (config) {
      // with header request
      let options = {
        headers: {
          Authorization: `Bearer ${config.token}`,
        },
      };
      //  console.log('[delete-axios-header]', options);
      let configration = Object.assign(options);
      return axios
        .delete(url, formData, configration)
        .then((response) => {
          //  console.log('SUCCESS!!', response);
          return response.data;
        })
        .catch((error) => {
          //   console.log('FAILURE!!', error);
          return error;
        });
    } else {
      // without header request
      return axios
        .delete(url, formData)
        .then((response) => {
          //     console.log('SUCCESS!!', response);
          return response.data;
        })
        .catch((error) => {
          //  console.log('FAILURE!!', error);
          return error;
        });
    }
  };

  static axiosPut = async (endpoint, formData, config) => {
    return fetch(`${Util.baseURL}${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJOSN) => {
        //    console.log('SUCCESS!!', responseJOSN);
        return responseJOSN;
      })
      .catch((error) => {
        console.error('Error response:');
        console.log('FAILURE!!', error);
        console.error(error.response.data); // ***
        console.error(error.response.status); // ***
        console.error(error.response.headers); // ***
        return error;
      });
  };
}

export default Api;

//stagingServer , ngrokServer
// let url, url_params;
// const keys = Object.keys(formData);
// const values = Object.values(formData);
// const paramArray = [];
// if (keys.length > 0) {
//   keys.forEach(item => {
//     paramArray.push(item + '=' + formData[item]);
//   });
//   url_params = paramArray.join('&');
//   console.log('[newp_arams]', url_params);
// }

// if (url_params.length > 0) {
//   url = `${Util.stagingServer}${endpoint}?${url_params}`;
// } else {
//   url = `${Util.stagingServer}${endpoint}`;
// }

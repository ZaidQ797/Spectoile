import React from 'react';
import I18n from '../../translation';
import {appImages} from '../assets';

//Overall Rating Calulation Formula
//Sum of all ratings / No of ratings x100 * Multiply by 10
//Example 90 + 89 + 78 + 34 / 100 x 4 * 10 = Total Average Rating

//Superb keyword rule
//1-3 = Bad    3-5 = Average 5-7 = Good 7-10 = Superb

const calTotalAvgRating = (rating1, rating2, rating3, rating4) => {
  try {
    let avgRating = ((rating1 + rating2 + rating3 + rating4) / 400) * 10;
    let object = {
      totalRating: 0,
      keyword: '',
    };
    if (parseInt(avgRating) <= 2) {
      object.keyword = 'Pauvre';
    } else if (parseInt(avgRating) <= 2 || parseInt(avgRating) <= 5) {
      object.keyword = 'Moyen';
    } else if (parseInt(avgRating) <= 5 || parseInt(avgRating) <= 7) {
      object.keyword = 'Bon';
    } else if (parseInt(avgRating) <= 7 || parseInt(avgRating) <= 10) {
      object.keyword = 'Superbe';
    }
    object.totalRating = avgRating.toFixed(1);
    return object;
  } catch (err) {
    console.log(err);
  }
};

//get rating & price image
const getRatingImage = (value) => {
  try {
    switch (value) {
      case 0:
        return appImages.start_0;
      case 1:
        return appImages.start_1;
      case 2:
        return appImages.start_2;
      case 3:
        return appImages.start_3;
      case 4:
        return appImages.start_4;
      case 5:
        return appImages.start_5;
      default:
        return appImages.start_0;
    }
  } catch (err) {}
};

const getPriceImage = (value) => {
  try {
    switch (value) {
      case '0':
        return appImages.price_0;
      case '1':
        return appImages.price_1;
      case '2':
        return appImages.price_2;
      case '3':
        return appImages.price_3;
      case '4':
        return appImages.price_4;
      case '5':
        return appImages.price_5;
      default:
        return appImages.price_0;
    }
  } catch (err) {
    console.log(err);
  }
};

const getAddListData = (data) => {
  let cats = [];
  let tags = [];
  let cities = [];
  let amenity_meta = [];
  let timezones = [];
  Object.entries(data['category_meta']).map((item) => {
    let obj = {
      id: item[0],
      label: item[1],
      selected: false,
    };
    if (item[1] !== 'Default') {
      cats.push(obj);
    }
  });
  Object.entries(data['location_meta']).map((item) => {
    let obj = {
      value: item[0],
      label: item[1],
    };
    if (item[1] !== 'Default') {
      cities.push(obj);
    }
  });
  Object.entries(data['amenity_meta']).map((item) => {
    let obj = {
      id: item[0],
      label: item[1],
      selected: false,
    };
    if (item[1] !== 'Default') {
      amenity_meta.push(obj);
    }
  });
  Object.entries(data['tag_meta']).map((item) => {
    let obj = {
      id: item[0],
      label: item[1],
      selected: false,
    };
    if (item[1] !== 'Default') {
      tags.push(obj);
    }
  });
  timezones = data['time_zones'].map((item) => {
    return {
      value: item,
      label: item,
    };
  });

  return {
    categories: cats,
    tags: tags,
    cities: cities,
    inAmenities: amenity_meta,
    exAmenities: amenity_meta,
    timeZones: timezones,
  };
};

//Validations
const signUpValdation = (fullName, username, email, password, confirmPass) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (
    fullName === '' ||
    username === '' ||
    email === '' ||
    password === '' ||
    confirmPass === ''
  ) {
    return {
      success: false,
      message: I18n.t('enter_all_fields'),
    };
  } else if (!reg.test(email)) {
    return {
      success: false,
      message: I18n.t('enter_valid_email'),
    };
  } else if (password?.length < 6) {
    return {
      success: false,
      message: I18n.t('enter_valid_pass'),
    };
  } else if (password !== confirmPass) {
    return {
      success: false,
      message: I18n.t('pass_dont_match'),
    };
  } else {
    return {
      success: true,
      message: '',
    };
  }
};

const loginValidation = (email, password) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email === '' || password === '') {
    return {
      success: false,
      message: 'Veuillez saisir tous les champs pour continuer',
    };
  } else if (password?.length < 5) {
    return {
      success: false,
      message: 'Veuillez saisir votre mot de passe à 6 chiffres',
    };
    // } else if (!reg.test(email)) {
    //   return {
    //     success: false,
    //     message: 'Please enter valid email',
    //   };
  } else {
    return {
      success: true,
      message: '',
    };
  }
};

const GOOGLE_MAP_API_KEY = 'AIzaSyCB59pcScbhhVj5SD6-m1is6v0Qq3cGwT4';

//Captcha Verfication
//TODO- Update Personal Credentionls with Client Google account Captcha console.
const captchaSiteKey = '6LfM2_QZAAAAAGZmyI5sj0Mdiife54loEphMe_l8';
const captachaBaseUrl = 'http://google.com';

//GoogleSignin Config
const googleSignInConfig = {
  webClientId:
    '81176494986-62j1bqgug2s3f9p0c9li585i57i44l21.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId:
    '81176494986-62j1bqgug2s3f9p0c9li585i57i44l21.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
};

//Stripe Configurations
const stripe_test_key = 'sk_test_4eC39HqLyjWDarjtT1zdp7dc';

//Admob account
const admob_ios_app_id = 'ca-app-pub-6812390261218565~2076026438';

//Add listing memo's
const getSelectedPriceValue = (data, key) => {
  try {
    switch (key) {
      case 0:
        return data[0];
      case 1:
        return data[1];
      case 2:
        return data[2];
      case 3:
        return data[3];
      case 4:
        return data[4];
      case 5:
        return data[5];
      default:
        return data;
    }
  } catch (err) {}
};

const getSelections = (defaultCats, selectedCats) => {
  try {
    let newArr = defaultCats?.map((item) => {
      let found = false;
      selectedCats.forEach((elem) => {
        if (elem === item.id) {
          found = true;
        }
      });
      if (found) {
        return {
          ...item,
          selected: true,
        };
      }
      return item;
    });
    return newArr;
  } catch (err) {}
};

export {
  signUpValdation,
  loginValidation,
  GOOGLE_MAP_API_KEY,
  captchaSiteKey,
  captachaBaseUrl,
  googleSignInConfig,
  getRatingImage,
  getPriceImage,
  calTotalAvgRating,
  getAddListData,
  getSelectedPriceValue,
  getSelections,
  stripe_test_key,
  admob_ios_app_id,
};

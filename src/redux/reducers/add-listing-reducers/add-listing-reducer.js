import * as TYPES from '../../actions/types';
import I18n from '../../../translation';

const initialState = {
  addListData: {
    categories: [],
    tags: [],
    cities: [],
    inAmenities: [],
    exAmenities: [],
    timeZones: [],
  },
  weekTimes: [],
  additionalInfo: [],
  addListObj: {
    //General Info Accordian
    is_listing_featured: '', //:String
    listing_id: '', // :String
    title: '', // :String
    description: '', // :String
    excerpt: '', // :String
    title_logo_image: {}, //:Object { name: 'i',type: 'image/jpg',uri: 'image uri'}
    featured_images: [], //:Array  each image is object like { name: 'i',type: 'image/jpg',uri: 'image uri'}
    price_range: '', // :String
    //Gallery Images Accordian
    gallery_images: [], //:Array  each image is object like { name: 'i',type: 'image/jpg',uri: 'image uri'}
    //Categories Accordian
    categories: [], //:Array each category id on index like [{id: '323',name: 'attraction'}]
    //Tags Accordian
    tags: [], //:Array each tag id on index like [{id: '323',name: 'attraction'}]
    new_tag: '', // :Array //:Array each tag id on index like [{newTag: 'attractionn'}]
    //Location Accordian
    city: '', // :String
    new_city: '', // :String
    full_address: '', //:String google address like 'Jabal Mousa, Saint Catherine, Egypt'
    latitude: '',
    longitude: '',
    //Contact Information Accordian
    phone: '', // :String
    email: '', // :String
    site_url: '', // :String
    //Social links Accordian
    facebook: '', // :String
    twiiter: '', // :String
    instagram: '', // :String
    tripadvisor: '', // :String
    youTube: '', // :String
    google_plus: '', // :String
    pinterest: '', // :String
    yelp: '', // :String
    //Amunties Accordian
    included_amenities: [], //:Array each included amenties id on index like ['120','90','92'.......]
    excluded_amenities: [], //:Array each included amenties id on index like ['120','90','92'.......]
    open_table_id: '', // :String
    show_review: '', // :String
    enable_advanced_reviews: '', // :String
    buisness_hours: [], //:Array  each image is object like {id: "M6vex", weekday: {…}, openTime: {…}, endTime: {…}, is24hour: {…}, …}
    time_zone_busuness_hours: [], //:Array  each image is object like {id: "M6vex", weekday: {…}, openTime: {…}, endTime: {…}, is24hour: {…}, …}
    additional_info: [], // :Array each info will have object {id: "tbxwp", label: "Addition Info", value: "Value", valueLink: "124"}
  },
  userListing: [],
  addListRes: null,
  editListRes: null,
  claimed: [],
  reported: [],
  error: null,
  isSuccess: false,
  isFailure: false,
};
const addListingReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.CLEAR_ADD_LISTING_FORM:
      return {
        ...state,
        addListObj: {
          //General Info Accordian
          is_listing_featured: '', //:String
          listing_id: '', // :String
          title: '', // :String
          description: '', // :String
          excerpt: '', // :String
          title_logo_image: {}, //:Object { name: 'i',type: 'image/jpg',uri: 'image uri'}
          featured_images: [], //:Array  each image is object like { name: 'i',type: 'image/jpg',uri: 'image uri'}
          price_range: '', // :String
          //Gallery Images Accordian
          gallery_images: [], //:Array  each image is object like { name: 'i',type: 'image/jpg',uri: 'image uri'}
          //Categories Accordian
          categories: [], //:Array each category id on index like [{id: '323',name: 'attraction'}]
          //Tags Accordian
          tags: [], //:Array each tag id on index like [{id: '323',name: 'attraction'}]
          new_tag: '', // :Array //:Array each tag id on index like [{newTag: 'attractionn'}]
          //Location Accordian
          city: '', // :String
          new_city: '', // :String
          full_address: '', //:String google address like 'Jabal Mousa, Saint Catherine, Egypt'
          latitude: '',
          longitude: '',
          //Contact Information Accordian
          phone: '', // :String
          email: '', // :String
          site_url: '', // :String
          //Social links Accordian
          facebook: '', // :String
          twiiter: '', // :String
          instagram: '', // :String
          tripadvisor: '', // :String
          youTube: '', // :String
          google_plus: '', // :String
          pinterest: '', // :String
          yelp: '', // :String
          //Amunties Accordian
          included_amenities: [], //:Array each included amenties id on index like ['120','90','92'.......]
          excluded_amenities: [], //:Array each included amenties id on index like ['120','90','92'.......]
          open_table_id: '', // :String
          show_review: '', // :String
          enable_advanced_reviews: '', // :String
          buisness_hours: [], //:Array  each image is object like {id: "M6vex", weekday: {…}, openTime: {…}, endTime: {…}, is24hour: {…}, …}
          time_zone_busuness_hours: [], //:Array  each image is object like {id: "M6vex", weekday: {…}, openTime: {…}, endTime: {…}, is24hour: {…}, …}
          additional_info: [], // :Array each info will have object {id: "tbxwp", label: "Addition Info", value: "Value", valueLink: "124"}
        },
      };
    case TYPES.CLEAR_WEEKTIMES:
      return {
        ...state,
        weekTimes: [],
      };
    case TYPES.CLEAR_ADDITIONAL:
      return {
        ...state,
        additionalInfo: [],
      };
    case TYPES.ADD_IN_WEEKTIME:
      if (state.weekTimes.length > 0) {
        const index = state.weekTimes?.findIndex((item) => {
          if (item.weekday.value === actions.data.weekday.value) {
            return true;
          }
          return false;
        });
        if (index !== -1) {
          console.log('item already preset on index', index);
          let copiesarray = [...state.weekTimes];
          copiesarray[index] = actions.data;
          return {
            ...state,
            weekTimes: copiesarray,
          };
        } else {
          console.log('item is not already present on index', index);
          return {
            ...state,
            weekTimes: [...state.weekTimes, actions.data],
          };
        }
      }
      return {
        ...state,
        weekTimes: [...state.weekTimes, actions.data],
      };
    case TYPES.REMOVE_IN_WEEKTIME:
      console.log('id', actions.data);
      return {
        ...state,
        weekTimes: state.weekTimes?.filter((item) => item.id !== actions.data),
      };
    case TYPES.ADD_IN_ADDITIONAL:
      return {
        ...state,
        additionalInfo: [...state.additionalInfo, actions.data],
      };
    case TYPES.REMOVE_FROM_ADDITIONAL:
      console.log('id', actions.data);
      return {
        ...state,
        additionalInfo: state.additionalInfo?.filter(
          (item) => item.id !== actions.data,
        ),
      };
    case TYPES.GET_LISTING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_LISTING_SUCCESS:
      return {
        ...state,
        userListing: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_LISTING_FAILURE:
      return {
        ...state,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.DELETE_LISTING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.DELETE_LISTING_SUCCESS:
      return {
        ...state,
        delListingRes: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.DELETE_LISTING_FAILURE:
      return {
        ...state,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.ADD_LISTING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.ADD_LISTING_SUCCESS:
      return {
        ...state,
        addListRes: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.ADD_LISTING_FAILURE:
      return {
        ...state,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.EDIT_LISTING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.EDIT_LISTING_SUCCESS:
      return {
        ...state,
        editListRes: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.EDIT_LISTING_FAILURE:
      return {
        ...state,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.GET_ADDLISTING_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_ADDLISTING_DATA_SUCCESS:
      return {
        ...state,
        addListData: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_ADDLISTING_DATA_FAILURE:
      return {
        ...state,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.GET_CLAIMED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_CLAIMED_SUCCESS:
      return {
        ...state,
        claimed: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_CLAIMED_FAILURE:
      return {
        ...state,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.GET_REPORTED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_REPORTED_SUCCESS:
      return {
        ...state,
        reported: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_REPORTED_FAILURE:
      return {
        ...state,
        isSuccess: false,
        isFailure: true,
      };
    default:
      return state;
  }
};
export default addListingReducer;

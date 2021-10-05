export const tryngoServer = 'https://ids.tryngo-services.pk/wp-json';
export const liveServer = 'https://idees-sorties.ch/wp-json';

//TODO Change Production URL for going live
const devTesting = false;
export const baseURL = devTesting ? tryngoServer : liveServer;
export const endPoints = {
  //done
  login: '/jwt-auth/v1/token',
  signup: '/rar/v1/user/register',
  logout: '/rar/v1/user/logout',
  forgotPass: '/rar/v1/user/forget',
  validateToken: '/jwt-auth/v1/token/validate',
  socialAuth: '/rar/v1/user/sociol_login',
  getCategories: '/rar/v1/listings/get_listing_categories',
  getServices: '/rar/v1/listings/get_single_category_posts',
  getServiceDetail: '/rar/v1/listings/get_single_post',
  getWishlist: '/rar/v1/wishlists/get_wishlist_items',
  wishlistAction: '/rar/v1/wishlists/wishlist_action',
  wishlistCount: '/rar/v1/wishlists/wishlist_count',
  addReview: '/rar/v1/comments/add',
  search: '/rar/v1/search/simple',
  filter: '/rar/v1/search/filter',
  getProfile: '/rar/v1/user/profile',
  editProfile: '/rar/v1/user/edit_profile',
  userPacks: '/rar/v1/user/packages',
  getPacks: '/rar/v1/woocommerce/wc_get_packages',
  saveSearch: '/rar/v1/search/filter_save',
  deleteSavedSearch: '/rar/v1/search/remove_save_search_parms',
  userSavedSearches: '/rar/v1/search/get_saved_search_parms',
  savedSearchLink: '/rar/v1/search/get_saved_search',
  addListing: '/rar/v1/listings/add',
  getListing: '/rar/v1/listings/get_user_listings',
  editListing: '',
  deleteListing: '/rar/v1/listings/delete',
  getAddListingData: '/rar/v1/listings/add_listing_fields',
  getCart: '/rar/v1/woocommerce/wc_get_cart',
  addToCart: '/rar/v1/woocommerce/wc_add_to_cart',
  removeFromCart: '/rar/v1/woocommerce/wc_remove_from_cart',
  getOrders: '/rar/v1/woocommerce/get_user_orders',
  orderDetail: '/rar/v1/woocommerce/view_single_order',
  getPaymentGT: '/rar/v1/woocommerce/get_stripe_cards',
  addPaymentGT: '/rar/v1/woocommerce/submit_card',
  deletePaymentCard: '/rar/v1/woocommerce/delete_card',
  getClaimed: '/rar/v1/listings/claimed',
  getReported: '/rar/v1/listings/reported',
  getAddresses: '/rar/v1/user/addresses',
  editAddress: '/rar/v1/user/submit_user_address',
  applyCoupen: '/rar/v1/woocommerce/submit_coupon',
  placeOrder: '/rar/v1/woocommerce/submit_order',
  checkoutNonce: '/rar/v1/user/get_nonce',
  validatePackage: '/rar/v1/listings/check_package',
  randomPost: '/rar/v1/listings/get_random_post',

  //Sample for get requests
  resendEmailConfirmation: (userId) =>
    `api/Auth/ResendEmailConfirmation?userId=${userId}`,
};

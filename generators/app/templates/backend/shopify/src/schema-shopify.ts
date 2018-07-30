/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface GetShopSettingsQuery {
  // Returns a Shop resource corresponding to access token used in request.
  shop:  {
    // The shop's contact e-mail address.
    email: string,
    // The shop's name.
    name: string,
    // The shop's .myshopify.com domain name.
    myshopifyDomain: string,
  },
};

export interface ShopSettingsFragment {
  // The shop's contact e-mail address.
  email: string,
  // The shop's name.
  name: string,
  // The shop's .myshopify.com domain name.
  myshopifyDomain: string,
};

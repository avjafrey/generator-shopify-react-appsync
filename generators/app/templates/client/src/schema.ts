

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomeScreenQuery
// ====================================================

export interface HomeScreenQuery_shop {
    accessToken: string | null;
    country: string | null;
    domain: string | null;
    email: string | null;
    id: string;
    installedAt: string | null;  // {cognitoId}
    name: string | null;
    platform: Platform | null;
    platformPlan: string | null;
    timezone: string | null;
  }
  
  export interface HomeScreenQuery {
    shop: HomeScreenQuery_shop | null;
  }
  
  export interface HomeScreenQueryVariables {
    shopDomain: string;
  }
  
  /* tslint:disable */
  // This file was automatically generated and should not be edited.
  
  //==============================================================
  // START Enums and Input Objects
  //==============================================================
  
  export enum Platform {
    SHOPIFY = "SHOPIFY",
  }
  
  //==============================================================
  // END Enums and Input Objects
  //==============================================================
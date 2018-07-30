export interface IAutoLimit {
    bucketSize: number;
    calls: number;
    interval: number;
}

export interface IPublicShopifyConfig {
    accessToken: string;
    autoLimit?: boolean | IAutoLimit;
    shopName: string;
    timeout?: number;
}

export interface IPrivateShopifyConfig {
    apiKey: string;
    autoLimit?: boolean | IAutoLimit;
    password: string;
    shopName: string;
    timeout?: number;
}

export interface ICallLimits {
    remaining: number;
    current: number;
    max: number;
}

export interface IAccessScope {
    handle: string;
}

export interface ICheckout {
    abandoned_checkout_url: string;
    applied_discount?: ICheckoutDiscount[];
    billing_address?: ICustomerAddress;
    buyer_accepts_marketing: boolean;
    cancel_reason?: "customer" | "fraud" | "inventory" | "other" | null;
    cart_token: string;
    closed_at: string | null;
    completed_at: string | null;
    created_at: string;
    currency: string;
    customer: ICustomer;
    customer_locale: string;
    discount_code?: string;
    discount_codes?: ICheckoutDiscount[];
    device_id: number | null;
    email: string;
    gateway: string | null;
    gift_cards?: ICheckoutGiftCard;
    id: number;
    landing_site: string;
    line_items: ICheckoutLineItem[];
    location_id: number | null; // In API response but not documented
    note: string | null;
    note_attributes: any[];
    order?: ICheckoutOrder;
    payment_url?: string;
    phone: string | null;
    referring_site: string;
    request_details?: ICheckoutRequestDetails;
    requires_shipping?: boolean;
    reservation_time?: number;
    reservation_time_left?: number;
    shipping_address: ICustomerAddress;
    shipping_lines: ICheckoutShippingLine[];
    shipping_rates?: ICheckoutShippingRate[];
    shipping_rate?: ICheckoutShippingRate[];
    source_indentifier: string | null;
    source_name: string | null;
    source_url: string | null;
    subtotal_price: string;
    tax_lines: ICheckoutTaxLine[];
    taxes_included: boolean;
    token: string;
    total_discounts: string;
    total_line_items_price: string;
    total_price: string;
    total_tax: string;
    total_weight: number;
    updated_at: string;
    user_id: number | null; // In API response but not documented
    web_url?: string;
}

export interface ICheckoutLineItem {
    applied_discounts: any[];
    compare_at_price: string;
    destination_location_id: number;
    discount_codes: any[];
    fulfillment_service: "api" | "custom" | "legacy" | "manual";
    fulfillment_status?: "fulfilled" | "partial" | null;
    gift_card: boolean;
    grams: number;
    key: string;
    line_price: string;
    name: string;
    origin_location_id: number;
    price: string;
    product_id: number;
    properties: any | null;
    quantity: number;
    requires_shipping: boolean;
    sku: string;
    taxable: boolean;
    tax_lines: ICheckoutTaxLine[];
    title: string;
    variant_id: number;
    variant_title: string;
    vendor: string;
}

export interface ICheckoutShippingLine {
    api_client_id: number | null;
    applied_discounts: any[];
    carrier_identifier: any | null;
    carrier_service_id: number | null;
    code: string;
    delivery_category: any | null;
    id: string;
    markup: string;
    phone: string | null;
    price: string;
    requested_fulfillment_service_id: number | null;
    source: string;
    tax_lines: any[];
    title: string;
    validation_context: any | null;
}

export interface ICheckoutTaxLine {
    compare_at: number;
    position: number;
    price: string;
    rate: number;
    source: string;
    title: string;
    zone: string;
}

export interface IApplicationCharge {
    confirmation_url: string;
    created_at: string;
    id: number;
    name: string;
    price: string;
    return_url: string;
    status: "accepted" | "declined" | "expired" | "pending";
    test: true | null;
    updated_at: string;
}

export interface ICreateApplicationCharge {
    name: string;
    price: string;
    return_url: string;
    status: "accepted" | "declined" | "expired" | "pending";
    test?: true;
}

export interface IApplicationCredit {
    description: string;
    id: number;
    amount: string;
    test: true | null;
}

export interface ICreateApplicationCredit {
    description: string;
    amount: string;
    test?: true;
}

export interface IArticle {
    author: string;
    blog_id: number;
    body_html: string;
    created_at: string;
    id: number;
    handle: string;
    image: IImage;
    metafields: IObjectMetafield[];
    published: boolean;
    published_at: string;
    summary_html: string | null;
    tags: string;
    template_suffix: string | null;
    title: string;
    updated_at: string;
    user_id: number;
}

export interface ICreateArticle {
    author: string;
    body_html: string;
    handle?: string;
    image?: IBase64Image;
    metafields?: ICreateObjectMetafield[];
    published?: boolean;
    published_at?: string;
    summary_html?: string | null;
    tags?: string;
    template_suffix?: string | null;
    title: string;
    user_id?: number;
}

export interface IUpdateArticle {
    author: string;
    body_html: string;
    handle?: string;
    image?: IBase64Image;
    metafields?: ICreateObjectMetafield[];
    published?: boolean;
    published_at?: string;
    summary_html?: string | null;
    tags?: string;
    template_suffix?: string | null;
    title: string;
    user_id?: number;
}

export interface IImage {
    created_at: string;
    height: number;
    src: string;
    updated_at?: string;
    width: number;
}

export interface IBase64Image {
    attachment: string;
}

export interface IObjectMetafield {
    key: string;
    namespace: string;
    value: string | number;
    value_type: "string" | "integer";
    description: string | null;
}

export interface ICreateObjectMetafield {
    key: string;
    namespace: string;
    value: string | number;
    value_type: "string" | "integer";
    description?: string | null;
}

export interface IAsset {
    attachment?: string;
    content_type: string;
    created_at: string;
    key: string;
    public_url: string;
    size: number;
    source_key: string;
    src: string;
    theme_id: number;
    updated_at: string;
    value?: string;
}

export interface IUpdateAsset {
    attachment?: string;
    key: string;
    source_key?: string;
    src?: string;
    value?: string;
}

export interface IBlog {
    commentable: "moderate" | "no" | "yes";
    created_at: string;
    feedburner: string | null;
    feedburner_location: string | null;
    handle: string;
    id: number;
    metafield: IObjectMetafield[];
    tags: string;
    template_suffix: string | null;
    title: string;
    updated_at: string;
}

export interface ICreateBlog {
    commentable?: "moderate" | "no" | "yes";
    feedburner?: string | null;
    feedburner_location?: string | null;
    handle?: string;
    metafield?: ICreateObjectMetafield[];
    tags?: string;
    template_suffix?: string | null;
    title: string;
}

export interface ICarrierService {
    active: boolean;
    callback_url: string;
    carrier_service_type: string; // I think this could be restricted to "api" or "legacy"
    name: string;
    service_discovery: boolean;
    format: "json" | "xml";
}

export interface ICreateCarrierService {
    active?: boolean;
    callback_url: string;
    carrier_service_type?: string;
    name: string;
    service_discovery: boolean;
    format?: "json" | "xml";
}

export interface IUpdateCarrierService {
    active?: boolean;
    callback_url?: string;
    carrier_service_type?: string;
    name?: string;
    service_discovery?: boolean;
    format?: "json" | "xml";
}

export interface ICheckoutDiscount {
    amount: string;
    applicable: boolean;
    description: string;
    non_applicable_reason: string;
    title: string;
    value: string;
    value_type: "fixed_amount" | "percentage";
}

export interface ICheckoutGiftCard {
    amount_used: string;
    balance: string;
    id: string;
    last_characters: string;
}

export interface ICheckoutShippingRateCheckout {
    subtotal_price: string;
    total_price: string;
    total_tax: string;
}

export interface ICheckoutShippingRate {
    checkout: ICheckoutShippingRateCheckout;
    delivery_range: string[];
    handle: string;
    price: string;
    requires_phone: boolean;
    title: string;
}

export interface ICheckoutOrder {
    id: number;
    name: string;
    status_url: string;
}

export interface ICheckoutRequestDetails {
    accept_language: string;
    ip_address: string;
    user_agent: string;
}

export interface ICollect {
    collection_id: number;
    created_at: string;
    featured: boolean;
    id: number;
    position: number;
    product_id: number;
    sort_value: string;
    updated_at: string;
}

export interface ICreateCollect {
    collection_id: number;
    featured?: boolean;
    position?: number;
    product_id: number;
    sort_value?: string;
}

export type CollectionListingSortOrder =
    "alpha-asc" | "alpha-desc" | "best-selling" | "created" | "created-desc" | "manual" | "price-asc" | "price-desc";

export interface ICollectionListingImage extends IImage {
    position: number;
    product_it: number;
    variant_ids: number[];
}

export interface ICollectionListing {
    collection_id: string;
    body_html: string;
    default_product_image: ICollectionListingImage;
    image: IImage;
    handle: string;
    published_at: string;
    title: string;
    sort_order: CollectionListingSortOrder;
    updated_at: string;
}

export type CommentStatus = "published" | "removed" | "spam" | "unapproved";

export interface IComment {
    article_id: number;
    author: string;
    blog_id: number;
    body: string;
    body_html: string;
    created_at: string;
    email: string;
    id: number;
    ip: string;
    published_at: string;
    status: CommentStatus;
    updated_at: string;
    user_agent: string;
}

export interface ICreateComment {
    article_id?: number;
    author: string;
    blog_id?: number;
    body?: string;
    body_html?: string;
    email: string;
    ip?: string;
    published_at?: string;
    status?: CommentStatus;
    user_agent?: string;
}

export interface IUpdateComment {
    article_id?: number;
    author?: string;
    blog_id?: number;
    body?: string;
    body_html?: string;
    email?: string;
    ip?: string;
    published_at?: string;
    status?: CommentStatus;
    user_agent?: string;
}

export interface ICountry {
    code: string;
    id: number;
    name: string;
    provinces: IProvince[];
    tax: number;
    tax_name: string;
}

export interface ICreateCountry {
    code: string;
    name?: string;
    tax?: number;
    tax_name?: string;
}

export interface IUpdateCountry {
    code?: string;
    name?: string;
    tax?: number;
    tax_name?: string;
}

export type CustomerCollectionSortOrder =
    "alpha-asc" | "alpha-desc" | "best-selling" | "created" | "created-desc" | "manual" | "price-asc" | "price-desc";

export interface ICustomCollection {
    body_html: string | null;
    handle: string;
    image: IImage;
    id: number;
    metafield?: IObjectMetafield;
    published?: string;
    published_at: string;
    published_scope: string;
    sort_order: CustomerCollectionSortOrder;
    template_suffix: string | null;
    title: string;
    updated_at: string;
}

type CustomerState = "declined" | "disabled" | "enabled" | "invited";

export interface ICustomer {
    accepts_marketing: boolean;
    addresses?: ICustomerAddress[];
    created_at: string;
    default_address: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    metafield?: IObjectMetafield;
    phone: string;
    multipass_identifier: null;
    last_order_id: number | null;
    last_order_name: string | null;
    note: string | null;
    orders_count: number;
    state: CustomerState;
    tags: string;
    tax_exempt: boolean;
    total_spent: string;
    updated_at: string;
    verified_email: boolean;
}

export interface ICustomerAddress {
    address1: string;
    address2?: string;
    city: string;
    company: string | null;
    country: string;
    country_code: string;
    customer_id: number;
    first_name: string;
    id: number;
    last_name: string;
    latitude: string;
    longitude: string;
    name: string;
    phone: string | null;
    province: string;
    province_code: string;
    zip: string;
}

export interface ICustomerSavedSearch {
    created_at: string;
    id: number;
    name: string;
    query: string;
    updated_at: string;
}

export interface IDiscountCode {
    created_at: string;
    id: number;
    code: string;
    price_rule_id: number;
    updated_at: string;
    usage_count: number;
}

export interface IDraftOrderNoteAttribute {
    name: string;
    value: string;
}

export type DraftOrderDiscountValueType = "fixed_amount" | "percentage";

export interface IDraftOrderDiscount {
    amount: string;
    description: string;
    non_applicable_reason: string;
    title: string;
    value: string;
    value_type: DraftOrderDiscountValueType;
}

export type DraftOrderLineItemFulfullmentService = "api" | "custom" | "legacy" | "manual";
export type DraftOrderLineItemFulfullmentStatus = "fulfilled" | "partial";

export interface IDraftOrderLineItem {
    applied_discounts: any[] | null;
    discount_codes: any[];
    fulfillment_service: DraftOrderLineItemFulfullmentService;
    fulfillment_status?: DraftOrderLineItemFulfullmentStatus | null;
    gift_card: boolean;
    grams: number;
    key: string;
    line_price: string;
    name: string;
    origin_location_id: number;
    price: string;
    product_id: number;
    properties: any | null;
    quantity: number;
    requires_shipping: boolean;
    sku: string;
    taxable: boolean;
    tax_lines: ICheckoutTaxLine[];
    title: string;
    variant_id: number;
    variant_title: string;
    vendor: string;
}

export interface IDraftOrder {
    applied_discount: IDraftOrderDiscount[];
    billing_address: ICustomerAddress;
    completed_at: string | null;
    created_at: string;
    currency: string;
    customer: string;
    email: string;
    id: number;
    invoice_sent_at: string | null;
    invoice_url: string;
    line_items: IDraftOrderLineItem[];
    name: string;
    note: string;
    note_attributes: IDraftOrderNoteAttribute[];
    order_id: number | null;
    shipping_address: ICustomerAddress;
    shipping_line: string;
    subtotal_price: string;
    tags: string;
    tax_exempt: boolean;
    tax_lines: string;
    taxes_included: boolean;
    total_tax: string;
    total_price: string;
    updated_at: string;
}

export interface IEvent {
    arguments: any[];
    author: string;
    body: string | null;
    created_at: string;
    id: number;
    description: string;
    path: string;
    message: string;
    subject_id: number;
    subject_type: "Article" | "Blog" | "Collection" | "Comment" | "Order" | "Page" | "Product" | "ApiPermission";
    verb: string;
}

export type IFulfillmentStatus = "cancelled" | "error" | "failure" | "open" | "pending" | "success";

export interface IFulfillmentReceipt {
    textcase: boolean;
    authorization: string;
}

export interface IFulfilmentLineItemProperty {
    name: string;
    value: string;
}

export interface IFulfillmentLineItemTaxLine {
    title: string;
    price: string;
    rate: number;
}

export interface IFulfilmentLineItem {
    id: number;
    variant_id: number;
    title: string;
    quantity: number;
    price: string;
    grams: number;
    sku: string;
    variant_title: string;
    vendor: any | null;
    fulfillment_service: string;
    product_id: number;
    requires_shipping: boolean;
    taxable: boolean;
    gift_card: boolean;
    name: string;
    variant_inventory_management: string;
    properties: IFulfilmentLineItemProperty[];
    product_exists: boolean;
    fulfillable_quantity: number;
    total_discount: string;
    fulfillment_status: IFulfillmentStatus;
    tax_lines: IFulfillmentLineItemTaxLine[];
}

export interface IFulfillment {
    created_at: string;
    id: number;
    line_items: IFulfilmentLineItem[];
    notify_customer: string;
    order_id: number;
    receipt: IFulfillmentReceipt;
    service: string;
    shipment_status: string | null;
    status: IFulfillmentStatus;
    tracking_company: string;
    tracking_numbers: string[];
    tracking_url: string;
    tracking_urls: string[];
    updated_at: string;
    variant_inventory_management: string;
}

export type FulfillmentEventStatus = "confirmed" | "delivered" | "failure" | "in_transit" | "out_for_delivery";

export interface IFulfillmentEvent {
    address1: string | null;
    city: string | null;
    country: string | null;
    created_at: string;
    estimated_delivery_at: string | null;
    fulfillment_id: number;
    id: number;
    happened_at: string;
    latitude: string | null;
    longitude: string;
    message: string | null;
    order_id: string;
    province: string | null;
    shop_id: number;
    status: FulfillmentEventStatus;
    updated_at: string;
    zip: string | null;
}

export interface IFulfillmentService {
    callback_url: string;
    format: "json";
    handle: string;
    inventory_management: boolean;
    name: string;
    provider_id: number | null;
    requires_shipping_method: boolean;
    tracking_support: boolean;
}

export interface IGiftCard {
    id: number;
    api_client_id: number;
    user_id: number;
    order_id: number;
    customer_id: number;
    line_item_id: number;
    balance: string;
    currency: string;
    code: string;
    last_characters: string;
    note: string;
    template_suffix: string;
    created_at: string;
    updated_at: string;
    disabled_at: string;
    expires_on: string;
}

export interface ILocation {
    id: number;
    address1: string;
    address2: string | null;
    city: string;
    country: string;
    country_code: string;
    country_name: string;
    created_at: string;
    deleted_at: string;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    updated_at: string;
    zip: string;
}

export interface IMarketingEventMarketedResources {
    id: number;
    type: "product" | "collection" | "price_rule" | "discount" | "page" | "article" | "shop";
}

export type MarketingEventEventType =
    "ad" |
    "post" |
    "message" |
    "retargeting" |
    "sem" |
    "transactional" |
    "affiliate" |
    "loyalty" |
    "newsletter" |
    "abandoned_cart" |
    "receipt";
export type MarketingEventMarketingChannel = "search" | "display" | "social" | "email" | "referral";
export type MarketingEventBudgetType = "daily" | "lifetime";

export interface IMarketingEvent {
    breadcrumb_id: any | null;
    budget: string;
    budget_type: MarketingEventBudgetType;
    currency: string;
    description: string | null;
    ended_at: string | null;
    event_target: string;
    event_type: MarketingEventEventType;
    id: number;
    manage_url: string;
    marketed_resources: IMarketingEventMarketedResources[];
    marketing_channel: MarketingEventMarketingChannel;
    paid: boolean;
    preview_url: string;
    referring_domain: string;
    remote_id: string;
    scheduled_to_end_at: string | null;
    started_at: string;
    utm_campaign: string;
    utm_medium: string;
    utm_source: string;
}

export type MetaFieldValueType = "string" | "integer";

export interface IMetafield {
    created_at: string;
    description: string | null;
    id: number;
    key: string;
    namespace: string;
    owner_id: number;
    owner_resource: string;
    value: string | number;
    value_type: MetaFieldValueType;
    updated_at: string;
}

export type OrderCancelReason = "customer" | "declined" | "fraud" | "inventory" | "other";

export interface IOrderClientDetails {
    accept_language: string | null;
    browser_height: number | null;
    browser_ip: string | null;
    browser_width: number | null;
    session_has: string | null;
    user_agent: string | null;
}

export interface IOrderCustomer {
    accepts_marketing: boolean;
    created_at: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    phone: string;
    multipass_identifier: null;
    last_order_id: number | null;
    last_order_name: string | null;
    note: string | null;
    orders_count: number;
    state: CustomerState;
    tags: string;
    total_spent: string;
    updated_at: string;
}

export type OrderDiscountCodeType = "fixed_amount" | "percentage" | "shipping";
export type OrderFinancialStatus =
    "authorized" | "paid" | "partially_paid" | "partially_refunded" | "pending" | "voided";
export type OrderFulfillmentStatus = "fulfilled" | "partial" | null;
export type OrderProcessingMethod = "checkout" | "direct" | "express" | "manual" | "offsite";

export interface IOrderDiscountCode {
    amount: number;
    code: string;
    tyoe: OrderDiscountCodeType;
}

export interface IOrderFulfillment {
    created_at: string;
    id: number;
    line_items: any;
    order_id: number;
    receipt: string;
    order_status: any;
    tracking_company: string;
    tracking_number: string;
    updated_at: string;
}

export interface IOrderLineItemProperty {
    name: string;
    value: string;
}

export interface IOrderTaxLine {
    title: string;
    price: string;
    rate: number;
}

export interface IOrderLineItemNote {
    name: string;
    value: string;
}

export interface IOrderLineItem {
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status: OrderFulfillmentStatus;
    grams: number;
    id: number;
    price: string;
    product_id: number;
    quantity: number;
    requires_shipping: boolean;
    sku: string;
    title: string;
    variant_id: number;
    variant_title: string;
    vendor: string;
    name: string;
    gift_card: boolean;
    properties: IOrderLineItemProperty[];
    taxable: boolean;
    tax_lines: IOrderTaxLine;
    total_discount: string;
}

export interface IOrderShippingLineTaxLine {
    title: string;
    price: string;
    rate: number;
}

export interface IOrderShippingLine {
    code: string;
    price: number;
    source: string;
    title: string;
    tax_lines: IOrderShippingLineTaxLine[];
    carrier_identifier: string | null;
    requested_fulfillment_service_id: string | null;
}

export interface IOrder {
    app_id: number;
    billing_address: ICustomerAddress;
    browser_ip: string | null;
    buyer_accepts_marketing: boolean;
    cancel_reason: OrderCancelReason;
    cancelled_at: string | null;
    cart_token: string;
    client_details: IOrderClientDetails;
    closed_at: string | null;
    created_at: string;
    currency: string;
    customer: IOrderCustomer;
    customer_locale: string;
    discount_codes: IOrderDiscountCode[];
    email: string;
    financial_status: OrderFinancialStatus;
    fulfillments: IOrderFulfillment[];
    fulfillment_status: OrderFulfillmentStatus;
    tags: string;
    gateway: string;
    id: number;
    landing_site: string;
    line_items: IOrderLineItem[];
    location_id: number;
    name: string;
    note: string | null;
    note_attributes: IOrderLineItemNote[];
    number: number;
    order_number: number;
    payment_details: any;
    payment_gateway_names: string[];
    phone: string;
    processed_at: string;
    processing_method: OrderProcessingMethod;
    referring_site: string;
    refunds: string;
    shipping_address: ICustomerAddress;
    shipping_lines: IOrderShippingLine[];
}

export type OrderRisksRecommendation = "accept" | "cancel" | "cancel";

export interface IOrderRisk {
    cause_cancel: boolean;
    checkout_id: number | null;
    display: boolean;
    id: number;
    order_id: number;
    message: string;
    recommendation: OrderRisksRecommendation;
    score: number;
    source: string;
}

export interface IPage {
    author: string;
    body_html: string;
    created_at: string;
    handle: string;
    id: number;
    metafield: string;
    published_at: string;
    shop_id: number;
    template_suffic: string | null;
    title: string;
    updated_at: string;
}

export interface IPolicy {
    title: string;
    body: string;
    url: string;
    created_at: string;
    updated_at: string;
}

export interface IPriceRulePrerequisiteSubtotalRange {
    prerequisite_subtotal_range: string;
}

export type PriceRuleTargetType = "line_item" | "shipping_line";
export type PriceRuleTargetSelection = "all" | "entitled";
export type PriceRuleAllocationMethod = "each" | "across";
export type PriceRuleValueType = "fixed_amount" | "percentage";
export type PriceRuleCustomerSelection = "all" | "prerequisite";

export interface IPriceRule {
    created_at: string;
    id: number;
    title: string;
    target_type: PriceRuleTargetType;
    target_selection: PriceRuleTargetSelection;
    allocation_method: PriceRuleAllocationMethod;
    value_type: PriceRuleValueType;
    value: string;
    once_per_customer: boolean;
    usage_limit: number | null;
    customer_selection: PriceRuleCustomerSelection;
    prerequisite_saved_search_ids: number[];
    prerequisite_subtotal_range: IPriceRulePrerequisiteSubtotalRange | null;
    prerequisite_shipping_price_range: string;
    entitled_product_ids: number[];
    entitled_variant_ids: number[];
    entitled_collection_ids: number[];
    entitled_country_ids: number[];
    starts_at: string;
    ends_at: string;
}

export interface IProductOptions {
    id: number;
    name: string;
    position: number;
    product_id: number;
    values: string[];
}

export interface IProduct {
    body_html: string;
    created_at: string;
    handle: string;
    id: number;
    image: any | null;
    images: IProductImage[];
    options: IProductOptions[];
    product_type: string;
    published_at: string;
    published_scope: string;
    tags: string;
    template_suffix: string | null;
    title: string;
    metafields_global_title_tag?: string;
    metafields_global_description_tag?: string;
    updated_at: string;
    variants: IProductVariant[];
}

interface IProductImage {
    created_at: string;
    id: number;
    position: number;
    product_id: number;
    variant_ids: number[];
    src: string;
    width: number;
    height: number;
    updated_at: string;
}

export type ProductVariantInventoryPolicy = "deny" | "continue";
export type ProductVariantWeightUnit = "g" | "kg" | "oz" | "lb";

export interface IProductVariant {
    barcode: string;
    compare_at_price: string;
    created_at: string;
    fulfillment_service: string;
    grams: number;
    id: number;
    image_id: number | null;
    inventory_item_id: number;
    inventory_management: string;
    inventory_policy: ProductVariantInventoryPolicy;
    inventory_quantity: number;
    old_inventory_quantity: number;
    option1: string | null;
    option2: string | null;
    option3: string | null;
    position: number;
    price: string;
    product_id: number;
    requires_shipping: boolean;
    sku: string;
    taxable: boolean;
    title: string;
    updated_at: string;
    weight: number;
    weight_unit: ProductVariantWeightUnit;
}

export interface IProductListing {
    product_id: number;
    body_html: string;
    created_at: string;
    handle: string;
    images: IProductImage[];
    options: string[];
    product_type: string;
    published_at: string;
    tags: string;
    title: string;
    updated_at: string;
    variants: IProductVariant[];
}

export interface IProvince {
    code: string;
    country_id: number;
    id: number;
    name: string;
    shipping_zone_id: NumberConstructor;
    tax: number;
    tax_name: string;
    tax_type: string | null;
    tax_percentage: number;
}

export type RecurringApplicationChargeStatus =
    "accepted" |
    "active" |
    "cancelled" |
    "declined" |
    "expired" |
    "frozen" |
    "pending";

export interface IRecurringApplicationCharge {
    activated_on: string | null;
    billing_on: string | null;
    cancelled_on: string | null;
    capped_amount: number;
    confirmation_url: string;
    created_at: string;
    id: number;
    name: string;
    price: string;
    return_url: string;
    status: RecurringApplicationChargeStatus;
    terms: string;
    test: true | null;
    trial_days: number;
    trial_ends_on: string;
    updated_at: string;
}

export interface ICreateRecurringApplicationCharge {
    capped_amount?: number;
    name: string;
    price: number;
    return_url: string;
    terms?: string;
    test?: true;
    trial_days?: number;
    trial_ends_on?: string;
}

export interface IRedirect {
    id: string;
    path: string;
    target: string;
}

export interface ICreateRedirect {
    path: string;
    target: string;
}

export interface IUpdateRedirect {
    path?: string;
    target?: string;
}

export interface IRefundLineItem {
    id: number;
    line_item: any;
    lint_item_id: number;
    quantity: 2;
}

export interface IRefund {
    created_at: string;
    processed_at: string;
    id: number;
    note: string;
    refund_line_items: IRefundLineItem[];
    restock: string;
    transactions: string;
    user_id: string;
}

export interface IReport {
    category: string;
    id: number;
    name: string;
    shopify_ql: string;
    updated_at: string;
}

export type ResourceFeedbackState = "requires_action" | "success";

export interface IResourceFeedback {
    shop_id: number;
    created_at: string;
    updated_at: string;
    resource_id: number;
    resource_type: string;
    state: ResourceFeedbackState;
    messages: string[];
    feedback_generated_at: string;
}

export type ScriptTagDisplayScope = "online_store" | "order_status" | "all";
export type ScriptTagEvent = "onload";

export interface IScriptTag {
    created_at: string;
    event: ScriptTagEvent;
    id: number;
    src: string;
    display_scope: ScriptTagDisplayScope;
    updated_at: string;
}

export interface ICreateScriptTag {
    event: ScriptTagEvent;
    src: string;
    display_scope?: ScriptTagDisplayScope;
}

export interface IUpdateScriptTag {
    event: ScriptTagEvent;
    src: string;
    display_scope?: ScriptTagDisplayScope;
}

export interface ICarrierShippingRateProvider {
    carrier_service_id: number;
    flat_rate_modified: string;
    id: number;
    percentage_modified: number;
    service_filter: any;
    shipping_zone_id: number;
}

export interface IPriceBasedShippingRate {
    id: number;
    max_order_subtotal: string | null;
    min_order_subtotal: string | null;
    name: string;
    price: string;
    shipping_zone_id: number;
}

export interface IWeightBasedShippingRate {
    id: number;
    name: string;
    price: string;
    shipping_zone_id: number;
    weight_height: number;
    weight_low: number;
}

export interface IShippingZoneCountry {
    code: string;
    country_id: number;
    id: number;
    name: string;
    tax: number;
    tax_name: string;
    tax_percentage: number;
    tax_type: any | null;
    shipping_zone_id: number;
}

export interface IShippingZone {
    id: number;
    name: string;
    countries: IShippingZoneCountry[];
    carrier_shipping_rate_providers: ICarrierShippingRateProvider[];
    price_based_shipping_rates: IPriceBasedShippingRate[];
    weight_based_shipping_rates: IWeightBasedShippingRate[];
}

export interface IShop {
    address1: string;
    address2: string;
    city: string;
    country: string;
    country_code: string;
    country_name: string;
    created_at: string;
    county_taxes: string;
    customer_email: string | null;
    currency: string;
    domain: string;
    eligible_for_card_reader_giveaway: boolean;
    eligible_for_payments: boolean;
    email: string;
    finances: boolean;
    force_ssl: boolean;
    google_apps_domain: string | null;
    google_apps_login_enabled: any | null;
    has_discounts: boolean;
    has_gift_cards: boolean;
    has_storefront: boolean;
    iana_timezone: string;
    id: number;
    latitude: number;
    longitude: number;
    money_format: string;
    money_in_emails_format: string;
    money_with_currency_format: string;
    money_with_currency_in_emails_format: string;
    myshopify_domain: string;
    name: string;
    password_enabled: boolean;
    phone: string | null;
    plan_display_name: string;
    plan_name: string;
    primary_locale: string;
    primary_location_id: number;
    province: string;
    province_code: string;
    requires_extra_payments_agreement: boolean;
    setup_required: boolean;
    shop_owner: string;
    source: string | null;
    tax_shipping: boolean | null;
    taxes_included: true | null;
    timezone: string;
    updated_at: string;
    weight_unit: string;
    zip: string;
}

export type SmartCollectionRuleTextColumn = "title" | "tag" | "type" | "variant_title" | "vendor";
export type SmartCollectionRuleTextRelation =
    "contains" | "equals" | "ends_with" | "not_contains" | "not_equals" | "starts_with";
export type SmartCollectionRuleNumberColumn =
    "variant_compare_at_price" | "variant_inventory" | "variant_price" | "variant_weight";
export type TSmartCollectionRuleNumberRelation = "equals" | "greater_than" | "less_than" | "not_equals";

export interface ISmartCollectionRule {
    column: SmartCollectionRuleTextColumn | SmartCollectionRuleNumberColumn;
    relation: SmartCollectionRuleTextRelation | TSmartCollectionRuleNumberRelation;
    condition: string;
}

export type SmartCollectionSortOrder =
    "alpha-asc" |
    "alpha-desc" |
    "best-selling" |
    "created" |
    "created-desc" |
    "manual" |
    "price-asc" |
    "price-desc";

export interface ISmartCollection {
    body_html: string;
    disjunctive: boolean;
    handle: string;
    id: number;
    image?: IImage;
    published_at: string;
    published_scope: string;
    rules: ISmartCollectionRule[];
    sort_order: SmartCollectionSortOrder;
    template_suffix: string | null;
    title: string;
    updated_at: string;
}

export interface IStorefrontAccessToken {
    id: string;
    access_token: string;
    access_scope: string;
    created_at: string;
    title: string;
}

export type ThemeRole = "main" | "unpublished";

export interface ITheme {
    created_at: string;
    id: number;
    name: string;
    previewable: boolean;
    processing: boolean;
    role: ThemeRole;
    theme_store_id: number;
    updated_at: string;
}

export type TransactionErrorCode =
    "call_issuer" |
    "card_declined" |
    "expired_card" |
    "incorrect_address" |
    "incorrect_cvc" |
    "incorrect_number" |
    "incorrect_zip" |
    "invalid_cvc" |
    "invalid_expiry_date" |
    "invalid_number" |
    "pick_up_card" |
    "processing_error";
export type TransactionKind = "authorization" | "capture" | "refund" | "sale" | "void";
export type TransactionSourceName = "android" | "iphone" | "pos" | "web";
export type TransactionStatus = "error" | "failure" | "pending" | "success";

export interface ITransactionPaymentDetails {
    avs_result_code: string | null;
    credit_card_bin: string | null;
    credit_card_company: string;
    create_card_number: string;
    cvv_result_code: string | null;
}

export interface ITRansactionReceipt {
    testcase: boolean;
    authorization: string;
}

export interface ITransaction {
    amount: string;
    authorization: string;
    created_at: string;
    device_id: string;
    gateway: string;
    source_name: TransactionSourceName;
    payment_details: ITransactionPaymentDetails;
    id: number;
    kind: TransactionKind;
    order_id: number;
    receipt: ITRansactionReceipt;
    error_code: TransactionErrorCode;
    status: TransactionStatus;
    test: boolean;
    user_id: number;
    currency: string;
}

export interface IUsageCharge {
    balance_remaining: number;
    balance_used: number;
    billing_on: string;
    created_at: string;
    description: string;
    id: number;
    price: string;
    risk_level: number;
    recurring_application_charge_id: number;
    updated_at: string;
}

export interface ICreateUsageCharge {
    description: string;
    price: number;
}

export type UserPermissions =
    "applications" |
    "customers" |
    "dashboard" |
    "full" |
    "gift_cards" |
    "links" |
    "marketing" |
    "order" |
    "pages" |
    "preferences" |
    "products" |
    "reports" |
    "themes";

export type UserType = "regular" | "restricted";

export interface IUser {
    account_owner: boolean;
    bio: string;
    email: string;
    first_name: string;
    id: number;
    im: string;
    last_name: string;
    permissions: UserPermissions[];
    phone: string;
    pin: string;
    receive_announcements: number;
    screen_name: string;
    url: string;
    user_type: UserType;
}

export type WebhookTopic =
    "app/uninstalled" |
    "carts/create" |
    "carts/update" |
    "checkouts/create" |
    "checkouts/delete" |
    "checkouts/update" |
    "collection_listings/add" |
    "collection_listings/remove" |
    "collection_listings/update" |
    "collections/create" |
    "collections/delete" |
    "collections/update" |
    "customer_groups/create" |
    "customer_groups/delete" |
    "customer_groups/update" |
    "customers/create" |
    "customers/delete" |
    "customers/disable" |
    "customers/enable" |
    "customers/redact" |
    "customers/update" |
    "draft_orders/create" |
    "draft_orders/delete" |
    "draft_orders/update" |
    "fulfillment_events/create" |
    "fulfillment_events/delete" |
    "fulfillments/create" |
    "fulfillments/update" |
    "order_transactions/create" |
    "orders/cancelled" |
    "orders/create" |
    "orders/delete" |
    "orders/fulfilled" |
    "orders/paid" |
    "orders/partially_fulfilled" |
    "orders/updated" |
    "product_listings/add" |
    "product_listings/remove" |
    "product_listings/update" |
    "products/create" |
    "products/delete" |
    "products/update" |
    "refunds/create" |
    "shop/update" |
    "shop/redact" |
    "themes/create" |
    "themes/delete" |
    "themes/publish" |
    "themes/update";

export type WebhookFormat = "json" | "xml";

export interface IWebhook {
    address: string;
    created_at: string;
    fields: string[];
    format: WebhookFormat;
    id: number;
    metafield_namespaces: string[];
    topic: WebhookTopic;
    updated_at: string;
}

export interface ICreateWebhook {
    address: string;
    fields?: string[];
    format?: WebhookFormat;
    metafield_namespaces?: string[];
    topic: WebhookTopic;
}

export interface IUpdateWebhook {
    address: string;
    fields?: string[];
    format?: WebhookFormat;
    metafield_namespaces?: string[];
    topic: WebhookTopic;
}

export interface ICustomerRedact {
    shop_id: number;
    shop_domain: string;
    customer: {
      id: number;
      email: string;
      phone: string;
    };
    orders_to_redact: string[];
  }

export interface IShopRedact {
    shop_id: number;
    shop_domain: string;
}

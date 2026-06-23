export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  token?: string;
  user?: ApiUser;
}

export interface ApiUser {
  id: string;
  phone: string;
  name?: string;
}

export interface ApiService {
  _id: string;
  name: string;
  description?: string;
  category: "CarWash" | "BikeWash" | "AddOn" | "Membership" | string;
  basePrice: number;
  duration?: number;
  image?: string;
  isActive?: boolean;
  packages?: unknown[];
}

export interface ApiTimeSlot {
  time: string;
  startTime?: string;
  endTime?: string;
  order?: number;
}

export interface ApiAvailableSlot {
  id: string;
  time: string;
  startTime?: string;
  endTime?: string;
  order?: number;
}

export interface ApiAvailableSlotsData {
  slotsByDate: Record<string, ApiAvailableSlot[]>;
}

export interface ApiVehicle {
  _id: string;
  vehicleType: string;
  vehicleModel: string;
  isSelected?: boolean;
}

export interface ApiWalletTransaction {
  amount?: number;
  type?: string;
  note?: string;
  description?: string;
  createdAt?: string;
  date?: string;
}

export interface ApiWallet {
  walletBalance: number;
  transactions?: ApiWalletTransaction[];
}

export interface ApiReferralInfo {
  referralCode?: string;
  totalReferrals?: number;
  coinsEarned?: number;
  referralCount?: number;
  rewardsEarned?: number;
}

export interface ApiMembership {
  _id?: string;
  status?: string;
  planName?: string;
  name?: string;
  serviceName?: string;
  expiresAt?: string;
  endDate?: string;
  startDate?: string;
}

export interface ApiOrderItem {
  serviceId: string;
  addOnIds?: string[];
  packageType: "OneTime" | "Monthly" | "Membership";
  packageTimes: number;
  scheduledDate?: string;
  scheduledTimeSlot?: string;
  scheduledSlots?: Array<{ scheduledDate: string; scheduledTimeSlot: string }>;
}

export interface ApiOrderCustomer {
  name?: string;
  phone?: string;
  address: string;
  vehicleType: string;
  vehicleModel: string;
  latitude?: number;
  longitude?: number;
}

export interface CreateOrderPayload {
  items: ApiOrderItem[];
  customer: ApiOrderCustomer;
  couponCode?: string;
  walletUsedAmount?: number;
}

export interface ApiOrder {
  _id: string;
  orderNumber?: string;
  status: string;
  items?: ApiOrderItem[];
  customer?: ApiOrderCustomer;
  createdAt?: string;
  totalAmount?: number;
  finalAmount?: number;
  couponCode?: string;
  walletUsedAmount?: number;
}

export interface CouponValidation {
  valid: boolean;
  message?: string;
  discountAmount?: number;
  finalAmount?: number;
}

export interface PublicMediaItem {
  _id?: string;
  url?: string;
  image?: string;
  video?: string;
  title?: string;
  label?: string;
  before?: string;
  after?: string;
  quote?: string;
  name?: string;
}

export interface PublicMedia {
  testimonials?: PublicMediaItem[];
  transformations?: PublicMediaItem[];
  seeTheDifference?: PublicMediaItem[];
  homeSliders?: PublicMediaItem[];
  whyChooseUs?: PublicMediaItem[];
  loginBanner?: PublicMediaItem[];
}

export interface PatchMeRequest {
  name?: string;
  description?: string;
  profileImage?: string | null;
  phone?: string;
  agreeMarketing?: boolean;
}

export interface UserCategory {
  id: number;
  categoryId: number;
  sortOrder: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCategories {
  data: UserCategory[];
  total: number;
}

export interface User {
  id: number;
  profileImage: string;
  email: string;
  name: string;
  description: string;
  phone: string;
  todayMissionCompletion: {
    totalCount: number;
    completedCount: number;
    completionRate: number;
  };
  footprint: {
    daysSinceSignup: number;
    maxConsecutiveUseDays: number;
    completedMissionCount: number;
  };
  categories: UserCategories;
  setting: {
    agreeMarketing: boolean;
    agreeMarketingPhone: boolean;
    agreeMarketingPhoneAt: string;
  };
  accounts: string[];
  createdAt: string;
  updatedAt: string;
}

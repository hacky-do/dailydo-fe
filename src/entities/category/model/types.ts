export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface MissionCategoriesResponse {
  data: Category[];
  total: number;
}

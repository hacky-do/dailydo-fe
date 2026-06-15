export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CategoryListResponse {
  data: Category[];
  total: number;
}

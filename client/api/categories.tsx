import entryPoint from "./entryPoint";

export type Category = {
  code: string;
  name: string;
  description: string;
};

export const categoriesApi = {
  get: (code: string) => entryPoint.get<Category>(`/categories/${code}`),
  getAll: () => entryPoint.get<Category[]>("/categories/"),
};

export default categoriesApi;

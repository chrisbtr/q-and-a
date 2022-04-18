import entryPoint from "./entryPoint";
import { Question } from "./questions";

export type Category = {
  code: string;
  name: string;
  description: string;
  questions: Question[];
};

export const categoriesApi = {
  get: (code: string) => entryPoint.get<Category>(`/categories/${code}`),
  getAll: () => entryPoint.get<Category[]>("/categories/"),
};

export default categoriesApi;

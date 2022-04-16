import entryPoint from "./entryPoint";

export type Question = {
  id: number;
  title: string;
  categoryCode: string;
  content: string;
  subject?: string;
  answer?: string;
};

type QuestionResponseData = {
  id: number;
  title: string;
  category_code: string;
  is_answered: boolean;
  content: string;
  subject?: string;
};

type CreateQuestionData = {
  title: string;
  categoryCode: string;
  content: string;
  subject?: string;
};

type GetAllQuestionData = {
  categoryCode?: string;
};

export const questionsApi = {
  get: (id: string) => entryPoint.get<QuestionResponseData>(`/questions/${id}`),

  getAll: ({ categoryCode }: GetAllQuestionData = {}) =>
    entryPoint.get<QuestionResponseData[]>("/questions", {
      params: { categoryCode },
    }),

  create: ({ title, categoryCode, content, subject }: CreateQuestionData) =>
    entryPoint
      .post<QuestionResponseData>("/questions", {
        title,
        categoryCode,
        content,
        subject,
      })
      .then((res) => res.data),
};

export default questionsApi;

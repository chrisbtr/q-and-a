import entryPoint from "./entryPoint";

export type Answer = {
  id: number,
  userId: number,
  questionId: number,
  content: string,
  createdAt: Date,
  editedAt?: Date,
}

export type Question = {
  id: number;
  title: string;
  categoryCode: string;
  content: string;
  subject?: string;
  answers: Answer[];
};

type QuestionResponseData = {
  id: number;
  title: string;
  categoryCode: string;
  isAnswered: boolean;
  content: string;
  subject?: string;
  answers: Answer[];
};

type CreateQuestionData = {
  title: string;
  categoryCode: string;
  content: string;
  subject?: string;
};

type GetAllQuestionData = {
  categoryCode?: string;
  query?: string;
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

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
  createdAt: string;
};

type QuestionResponseData = {
  id: number;
  title: string;
  categoryCode: string;
  isAnswered: boolean;
  content: string;
  subject?: string;
  answers: Answer[];
  createdAt: string;
};

type AllQuestionResponseData = {
  allQuestionsCount: number;
  questions: QuestionResponseData[];
};

export type CreateQuestionParams = {
  title: string;
  categoryCode: string;
  content: string;
  subject?: string;
};

export type GetAllQuestionParams = {
  categoryCode?: string;
  query?: string;
  take?: number;
  skip?: number;
};

export const questionsApi = {
  get: (id: number) => entryPoint.get<QuestionResponseData>(`/questions/${id}`),

  getAll: ({ categoryCode, query, take, skip }: GetAllQuestionParams = {}) =>
    entryPoint.get<AllQuestionResponseData>("/questions", {
      params: { categoryCode, searchBy: query, take, skip },
    }),

  create: ({ title, categoryCode, content, subject }: CreateQuestionParams) =>
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

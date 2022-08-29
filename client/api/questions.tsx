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

type AllQuestionResponseData = {
  allQuestionsCount: number;
  questions: QuestionResponseData[];
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
  take?: number;
  skip?: number;
};

export const questionsApi = {
  get: (id: string) => entryPoint.get<QuestionResponseData>(`/questions/${id}`),

  getAll: ({ categoryCode, query, take, skip }: GetAllQuestionData = {}) =>
    entryPoint.get<AllQuestionResponseData>("/questions", {
      params: { categoryCode, searchBy: query, take, skip },
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

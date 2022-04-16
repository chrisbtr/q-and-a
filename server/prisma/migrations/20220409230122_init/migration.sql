-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "content" VARCHAR(255) NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "category_code" VARCHAR(100) NOT NULL,
    "is_answered" BOOLEAN NOT NULL,
    "title" VARCHAR(20) NOT NULL,
    "subject" VARCHAR(100) DEFAULT E'',
    "content" VARCHAR(255) NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "fk_question_id" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "fk_category_code" FOREIGN KEY ("category_code") REFERENCES "categories"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

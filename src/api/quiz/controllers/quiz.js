'use strict';

/**
 *  quiz controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::quiz.quiz', ({ strapi }) => ({
    async score(ctx) {
        const { id } = ctx.params;
        const userAnswers = ctx.request.body;
        const quiz = await strapi.service('api::quiz.quiz').findOne(id, { populate: { questions: true } });
        let score = 0;

        if (!quiz) {
            return ctx.notFound()
        }

        if (Object.keys(userAnswers).length === 0) {
            return ctx.badRequest('The request body is empty', userAnswers)
        }

        const answers = userAnswers.filter((userAnswer) => {
            const question = quiz.questions.find((element) => element.id === userAnswer.questionId);

            if (question) {
                userAnswer.correct = false;

                if (question.answerCorrect === userAnswer.questionAnswer) {
                    userAnswer.correct = true;
                    score++;
                }

                return userAnswer;
            }
        });

        const questionCount = quiz.questions?.length;

        delete quiz.questions;

        return { quiz, answers, score, questionCount };
    },
}));

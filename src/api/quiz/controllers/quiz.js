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

        if (quiz && Object.keys(userAnswers).length !== 0) {
            userAnswers.map((userAnswer) => {
                const question = quiz.questions.find((element) => element.id === userAnswer.questionId);

                if (question) {
                    if (question.answerCorrect === userAnswer.questionAnswer) {
                        score++;
                    }
                }
            });
        }

        const questionCount = quiz.questions?.length;

        delete quiz.questions;

        return { quiz, score, scoredAnswers: userAnswers, questionCount };
    },
}));

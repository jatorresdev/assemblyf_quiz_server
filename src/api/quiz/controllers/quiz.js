'use strict';

/**
 *  quiz controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::quiz.quiz', ({ strapi }) => ({
  async create(ctx) {
    const requestBody = ctx.request.body;
    const requestBodyQuestions = requestBody.data?.questions;
    const questionsId = [];

    if (Array.isArray(requestBodyQuestions)) {
      delete requestBody.data.questions;

      for (const question of requestBodyQuestions) {
        const data = {
          data: question
        };
        const entityQuestion = await strapi.service('api::question.question').create(data);
        questionsId.push(entityQuestion.id);
      }
    }

    requestBody.data.questions = questionsId;
    ctx.request.body = requestBody;

    return super.create(ctx);
  }
}));

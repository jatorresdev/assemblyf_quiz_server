module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/quizzes/:id/score',
      handler: 'custom-quiz.score',
      config: {
        auth: false
      },
    }
  ]
}
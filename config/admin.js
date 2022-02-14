module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0590eb1c017c9bcdbf4db0238b900bda'),
  },
});

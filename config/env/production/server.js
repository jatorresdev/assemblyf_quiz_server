module.exports = ({ env }) => ({
    proxy: true,
    app: {
        keys: env.array("APP_KEYS"),
    },
});

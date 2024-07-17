module.exports = {
  apps: [
    {
      name: "e-dating",
      cwd: "/home/ubuntu/pm/e-dating",
      script: "index.js",
      log_date_format: "YYYY-MM-DD HH:mm Z",

      env: {
        DATABASE_URL: "",

        JWT_SECRET: "",

        PORT: 3002,
      },
    },
  ],
};

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Blog Api",
    description: "Dan's Blog API",
    version: "0.1.9",
  },
  paths: {
    "/users": {
      get: {
        summary: "Gets all users",
      },
    },
    "/auth/register": {
      post: {
        summary: "Register a user",
        parameters: [
          {
            name: "newUser",
            in: "body",
            schema: {},
            required: true,
            description: "registers a user",
          },
        ],
      },
    },
    "/auth/login": {
      post: {
        summary: "Login a user",
      },
    },
    "/blog": {
      get: {
        summary: "Gets a blog from a user",
      },
    },
    "/blog/private": {
      get: {
        summary: "Gets only the private blogs",
      },
    },
    "/blog/update/id": {
      put: {
        summary: "Updates the id",
      },
    },

    "/blog/delete/id": {
      delete: {
        summary: "",
      },
    },
  },
};

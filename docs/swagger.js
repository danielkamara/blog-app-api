module.exports = {
  openapi: "3.0.3",
  info: {
    title: "Blog Api",
    description: "Dan's Blog API",
    version: "0.1.9",
  },
  paths: {
    "/user": {
      get: {
        summary: "Get  all users",

        parameters: [
          {
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
            email: {
              type: "string",
            },
          },
        ], // expected params.
        // expected responses
        responses: {
          // response code
          200: {
            description: "We have users!", // response desc.
            content: {},
          },
        },
      },
    },
    "/user/register": {
      post: {
        summary: "Register a user",
      },
    },
    "/user/login": {
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

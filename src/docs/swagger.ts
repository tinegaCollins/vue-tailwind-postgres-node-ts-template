import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Users API",
    version: "1.0.0",
    description: "API documentation for the Users Management System",
  },
  servers: [{ url: "/api", description: "API Base (relative to server)" }],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { 
            type: "string",
            description: "Unique identifier for the user"
          },
          name: { 
            type: "string",
            description: "Full name of the user"
          },
          email: { 
            type: "string",
            format: "email",
            description: "Email address (unique)"
          },
          phone: { 
            type: "string",
            description: "Phone number"
          },
          role: { 
            type: "string",
            description: "User role (default: USER)"
          },
          isActive: { 
            type: "boolean",
            description: "Whether the user is active"
          },
          createdAt: { 
            type: "string", 
            format: "date-time",
            description: "When the user was created"
          },
          updatedAt: { 
            type: "string", 
            format: "date-time",
            description: "When the user was last updated"
          },
        },
        required: ["id", "name", "email", "phone", "role", "isActive", "createdAt", "updatedAt"],
      },
      UserCreate: {
        type: "object",
        required: ["name", "email", "phone"],
        properties: {
          name: { 
            type: "string",
            description: "Full name of the user"
          },
          email: { 
            type: "string",
            format: "email",
            description: "Email address (must be unique)"
          },
          phone: { 
            type: "string",
            description: "Phone number"
          },
          role: { 
            type: "string",
            default: "USER",
            description: "User role"
          },
          isActive: { 
            type: "boolean",
            default: true,
            description: "Whether the user is active"
          },
        },
      },
      UserUpdate: {
        type: "object",
        properties: {
          name: { 
            type: "string",
            description: "Full name of the user"
          },
          email: { 
            type: "string",
            format: "email",
            description: "Email address (must be unique)"
          },
          phone: { 
            type: "string",
            description: "Phone number"
          },
          role: { 
            type: "string",
            description: "User role"
          },
          isActive: { 
            type: "boolean",
            description: "Whether the user is active"
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: { 
            type: "string", 
            description: "Error message" 
          },
        },
      },
      NukeResponse: {
        type: "object",
        properties: {
          message: { 
            type: "string", 
            description: "Success message" 
          },
          timestamp: {
            type: "string",
            format: "date-time",
            description: "When the operation was performed",
          },
          clearedCount: {
            type: "integer",
            description: "Number of users that were cleared",
          },
        },
      },
    },
  },
  paths: {
    "/users": {
      get: {
        summary: "List users",
        tags: ["Users"],
        parameters: [
          {
            name: "search",
            in: "query",
            schema: { type: "string" },
            description: "Search term to filter by name or email",
          },
          {
            name: "role",
            in: "query",
            schema: { type: "string" },
            description: "Filter by user role",
          },
          {
            name: "isActive",
            in: "query",
            schema: { type: "boolean" },
            description: "Filter by active status",
          },
          {
            name: "skip",
            in: "query",
            schema: { type: "integer", minimum: 0 },
            description: "Number of records to skip",
          },
          {
            name: "take",
            in: "query",
            schema: { type: "integer", minimum: 1, maximum: 100 },
            description: "Number of records to take",
          },
        ],
        responses: {
          200: {
            description: "List of users",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/User",
                      },
                    },
                    total: { type: "integer" },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a user",
        description: "Create a new user with the provided information",
        tags: ["Users"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserCreate" },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          400: {
            description: "Bad request - missing required fields or validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          409: {
            description: "Conflict - email already exists",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/users/{id}": {
      get: {
        summary: "Get a user by ID",
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "User ID",
          },
        ],
        responses: {
          200: {
            description: "User details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          400: {
            description: "Bad request - missing ID",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      put: {
        summary: "Update a user",
        description: "Update an existing user's information",
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "User ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserUpdate" },
            },
          },
        },
        responses: {
          200: {
            description: "User updated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          400: {
            description: "Bad request - missing ID or validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          409: {
            description: "Conflict - email already exists",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a user",
        description: "Delete a user by their ID",
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "User ID",
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    deletedUser: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - missing ID",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/users/nuke": {
      delete: {
        summary: "Clear all users from database",
        description: "Remove all users from the database. This is a destructive operation and should be used with caution.",
        tags: ["Database"],
        responses: {
          200: {
            description: "All users cleared successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/NukeResponse" },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
  },
};

export const swaggerSpec = swaggerJsdoc({
  definition: swaggerDefinition,
  apis: [],
});

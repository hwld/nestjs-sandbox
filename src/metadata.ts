/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./create-user.dto"), { "CreateUserDTO": { name: { required: true, type: () => String }, email: { required: true, type: () => String } } }], [import("./cats/dto/create-cat.dto"), { "CreateCatDtoClass": { name: { required: true, type: () => String }, age: { required: true, type: () => Number }, breed: { required: true, type: () => String } } }], [import("./cats/dto/update-cat.dto"), { "UpdateCatDto": {} }], [import("./cats/entities/cat.entity"), { "Cat": {} }]], "controllers": [[import("./app.controller"), { "AppController": { "getPostById": { type: Object }, "getPublishedPosts": {}, "getFilteredPosts": {}, "createDraft": {}, "signupUser": {}, "deletePost": {} } }], [import("./cats/cats.controller"), { "CatsController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }]] } };
};
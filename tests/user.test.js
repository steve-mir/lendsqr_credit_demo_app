const request = require("supertest");
// const app = require("../src/api/v1/routes/users");
const app = require("../index");

describe("User routes", () => {
    it("POST /users/register --> register a new user", () => {
        return request(app).post("/users/register").send({
            email: "john@gmail.com",
            password: "Steve$123456789",
            name: "John",
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .then(resp =>{
            expect(resp.body).toEqual(
                expect.objectContaining({
                    msg: "User created successfully",
                    email: expect.any(String),
                    name: expect.any(String),
                })
            )
        });

    });
    
    it("PATCH /users/profile --> Update profile", () => {
        return request(app).patch("/users/profile").send({
            name: "John",
            username: "JohnDoe",
            phone: "0912345678"
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .then(resp =>{
            expect(resp.body).toEqual(
                expect.objectContaining({
                    email: expect.any(Object),
                })
            )
        });

    });
});
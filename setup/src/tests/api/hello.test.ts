import request from "supertest";
describe("/hello", () => {
  describe("Given no inital state", () => {
    describe("When a GET request is made", () => {
      it("returns John Doe", () => request("http://localhost:3000")
        .get("/api/hello")
        .then((response) => {
          expect(response.body).toEqual({
            name: "John Doe"
          });
        }));
    });
  });
});

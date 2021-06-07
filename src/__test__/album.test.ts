// import { dbConnect, dbDisconnect } from "./db/mongoMemoryServer";
// import request from "supertest";
// import app from "../app";

// describe("create data / Update data", () => {
//   it("Create a new organization", async () => {
//     const res: request.Response = await request(app)
//       .post("/add")
//       .send(org)
//       .set("authorization", `Bearer ${userToken}`);
//     expect(res.status).toEqual(200);
//     expect(res.body).toHaveProperty("newInfo");
//     expect(res.body.newInfo).toHaveProperty("_id");
//     expect(typeof res.body.newInfo === "object").toBe(true);
//     expect(res.body.newInfo.organization).toBe("node ninja");
//     id = res.body.newInfo._id;
//     prefilled = {
//       ...res.body.newInfo,
//     };
//   });

//   it("should update an organization", async () => {
//     org.organization = "edited ninja";
//     const res: request.Response = await request(app)
//       .put(`/update/${id}`)
//       .send(org)
//       .set("authorization", `Bearer ${userToken}`);
//     expect(res.status).toEqual(200);
//     expect(res.body).toHaveProperty("organization");
//     expect(res.body).toHaveProperty("_id");
//     expect(typeof res.body === "object").toBe(true);
//     expect(res.body._id).toBe(id);
//     expect(res.body.organization).toBe("edited ninja");
//     prefilled = {
//       ...res.body,
//     };
//   });
// });
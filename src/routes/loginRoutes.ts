import { Router, Request, Response } from "express";

const router = Router();

//GET
router.get("/login", (reqest: Request, response: Response) => {
  response.send(`
    <form method="POST">
        <div>
            <label>Email</label>
            <input name="email"/>
        </div>
        <div>
            <label>Password</label>
            <input name="password" type="password"/>
        </div>
        <button>Submit</button>
    </form>
`);
});

//POST
router.post("/login", (request: Request, response: Response) => {
  const { email, password } = request.body;

  response.send(email + password);
});

export { router };

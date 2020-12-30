import { Router, Request, Response } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

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
router.post("/login", (request: RequestWithBody, response: Response) => {
  const { email, password } = request.body;

  if (email) {
    response.send(email.toUpperCase());
  } else {
    response.send("You must provide an email");
  }
});

export { router };

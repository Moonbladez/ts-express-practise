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
  if (email && password && email === "hi@hi.com" && password === "password") {
    // mark as logged in
    request.session = { loggedIn: true };
    response.redirect("/");
    //route
  } else {
    response.send("Invalid email or password");
  }
});

//root
router.get("/", (request: Request, response: Response) => {
  if (request.session && request.session.loggedIn) {
    response.send(`
        <div>
            <div>You are loggined in</div>
            <a href="/logout">logout</a>
        </div>
      `);
  } else {
    response.send(`
    <div>
        <div>You are not logged in/div>
        <a href="/login">logout</a>
    </div>
  `);
  }
});

export { router };

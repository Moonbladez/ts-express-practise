import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  if (request.session && request.session.loggedIn) {
    next();
    return;
  }

  response.status(403);
  response.send("not permitted");
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
        <div>You are not logged in</div>
        <a href="/login">login</a>
    </div>
  `);
  }
});

//logout
router.get("/logout", (request: Request, response: Response) => {
  //reset session
  request.session = undefined;
  response.redirect("/");
});

router.get(
  "/protected",
  requireAuth,
  (request: Request, response: Response) => {
    response.send(
      "Welcome to the protected route. The secret of the universe is 42"
    );
  }
);

export { router };

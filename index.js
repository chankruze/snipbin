const utils = require("./utils");

if (utils.isDevEnv()) {
  require("dotenv").config();
}

const PORT = process.env.PORT || utils.genRandPort(49152, 65535);

const express = require("express"),
  connectMongoDB = require("./mongo/db"),
  Snippet = require("./mongo/models/Snippet");
// connect to database
connectMongoDB();
// express app
const app = express();
app.use((req, res, next) => {
  res.locals.url = req.originalUrl;
  res.locals.host = req.get("host");
  res.locals.protocol = req.protocol;
  next();
});
// set view engine
app.set("view engine", "ejs");
// serve static files from public folder
app.use(express.static("public"));
// if we use express.json() it will parse the body
// from post/fetch request except from html post form
app.use(express.urlencoded({ extended: true }));

// route: root
app.get("/", (req, res) => {
  const code = `Welcome to SnipBin!
  
Use the controls in the top right corner
to create a new file to share with others.`;

  res.render("code-display", { code, language: "plaintext" });
});

// route: new
app.get("/new", (req, res) => {
  res.render("new");
});

// route: save
app.post("/save", async (req, res) => {
  const value = req.body.value;
  try {
    // brain storm
    // check if id present
    // check is snippet is present (if so then update that)
    // else create new
    const snippet = await Snippet.create({ value });
    res.redirect(`/${snippet.id}`);
  } catch (e) {
    res.render("new", { value });
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const snippet = await Snippet.findById(id);
    res.render("code-display", {
      code: snippet.value,
      id,
    });
  } catch (e) {
    res.redirect("/");
  }
});

app.get("/:id/duplicate", async (req, res) => {
  const id = req.params.id;
  try {
    const snippet = await Snippet.findById(id);
    res.render("new", { value: snippet.value });
  } catch (e) {
    res.redirect(`/${id}`);
  }
});

// app.get("/:id/edit", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const snippet = await Snippet.findById(id);
//     res.render("edit", { value: snippet.value });
//   } catch (e) {
//     res.redirect(`/${id}`);
//   }
// });

app.listen(PORT, () =>
  console.log(`server is live on: http://localhost:${PORT}`)
);

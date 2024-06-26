if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
const express = require("express");
// const morgan = require("morgan");
const path=require('path');
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const indexControllers = require("./controllers/indexControllers");
const userControllers = require("./controllers/userControllers");
const ownerControllers = require("./controllers/ownerControllers");
const methodOverride = require('method-override');
const session = require('express-session');
const flash= require('connect-flash');


const app = express();

//middleware for google oauth
app.use(passport.initialize())

app.use(cookieParser());

app.use(methodOverride('_method'));

// Passport Config
require("./config/passport")(passport);

// DB config
const db = process.env.DBURI;
//console.log(db)

// Connect to mongo
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false })
	.then(() => {
		const PORT = process.env.PORT || 8080;
		app.listen(PORT, console.log("Server Started"));
		console.log("Connected to DB");
	})
	.catch((err) => {
		console.log(err);
	});

// Middleware
app.use(express.static('public'))
// app.use(morgan("dev"));
app.set("view engine", "ejs");
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

// Connect Flash
app.use(flash());

// Global Vars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


app.use("/", indexControllers);

app.use(
	"/user",
	passport.authenticate("jwt_user", { session: false }),
	userControllers
);
app.use(
	"/owner",
	passport.authenticate("jwt_owner", { session: false }),
	ownerControllers
);

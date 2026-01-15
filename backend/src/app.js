import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

const allowedOrigins = [
  "https://hospify.me",
  "https://www.hospify.me",
  "https://vidplay-eta.vercel.app", // optional (can remove later)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  })
);

// ✅ Preflight fix for modern Express
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept"
    );
    return res.sendStatus(200);
  }
  next();
});

// cors : a mechanism that allows web application to access resources from different domains. 


// limiting the request so that surver can hold the load 
app.use(express.json({limit:"16kb"}))
// exncode url data and put it in object form  
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// stors static files in public
app.use(express.static("public"))

app.use(cookieParser())




// routes
import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.route.js"
import subscriptionRoute from "./routes/subscription.routes.js"
import likeRouter from "./routes/like.routers.js"
import commentRouter from "./routes/comment.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"
import playlistRouter from "./routes/playlist.routes.js"





//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/subscriptions", subscriptionRoute)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/dashboard", dashboardRouter)
app.use("/api/v1/playlists", playlistRouter)

export {app}
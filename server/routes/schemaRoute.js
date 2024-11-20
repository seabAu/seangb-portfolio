// All routes used by apps hosted on this site.
import express from 'express';
const router = express.Router();
import auth from "../middleware/auth.js";
import * as C from "../controllers/schemaController.js";

// @route GET api/apps/planner/tasks/test
// @description tests tasks route
// @access Public
router.get("/test", (req, res) => res.send("task route testing!"));


router.get( "/", auth, C.GetSchemas );


router.get( "/user", auth, C.GetUserSchema );


router.get( "/blog", auth, C.GetBlogSchema );


router.get( "/planner", auth, C.GetPlannerSchema );


router.get( "/portfolio", C.GetPortfolioSchemas );


const onRoute = (callPath, callType, callData) => {};

// module.exports = router;
export default router;
// All routes used by apps hosted on this site.

import axios from 'axios';
import express from 'express';
const router = express.Router();
import auth from "../middleware/auth.js";
import * as C from "../controllers/appsController.js";

// @route GET api/apps/planner/tasks/test
// @description tests tasks route
// @access Public
router.get( '/test', C.Test ); 

// @route GET api/apps/planner/tasks
// @description Get all tasks
// @access Public
router.get( '/planner/', auth, C.PlannerGetTasks );

// @route GET api/apps/planner/tasks/:id
// @description Get single task by id
// @access Public
router.get( '/planner/:id', C.PlannerGetTask ); 

// @route GET api/apps/planner/tasks
// @description add/save task
// @access Public
router.post( '/planner', C.PlannerTaskAdd ); 

// @route       POST /api/apps/planner/add-task
// @desc        Add a new task
// @access      Public
router.post( "/planner/add-task", auth, C.PlannerTaskAdd ); 

// @route GET api/apps/planner/tasks/:id
// @description Update task
// @access Public
router.put( '/planner/:id', C.PlannerTaskUpdate ); 

// @route GET api/apps/planner/tasks/:id
// @description Delete task by id
// @access Public
router.delete( '/planner/:id', C.PlannerTaskDelete ); 

// @route       POST /api/planner/edit-task
// @desc        Edit a task
// @access      Private
router.post( "/planner/edit-task", auth, C.PlannerTaskUpdateBody ); 


// Delete experience
// @route       POST /api/planner/delete-task
// @desc        Delete a task
// @access      Private
router.post( "/planner/delete-task", auth, C.PlannerTaskDeleteBody ); 

export default router;

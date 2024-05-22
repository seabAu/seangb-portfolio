// All routes used by apps hosted on this site.

import axios from 'axios';
import express from 'express';
const router = express.Router();
import auth from "../middleware/auth.js";

import { Planner, Tasks } from "../models/appsModel.js";

// @route GET api/apps/planner/tasks/test
// @description tests tasks route
// @access Public
const Test = async ( req, res ) => res.send( 'task route testing!' );

// @route GET api/apps/planner/tasks
// @description Get all tasks
// @access Public
const PlannerGetTasks = async ( req, res ) => {
    // Tasks.find()
    //     .then( tasks => res.json( tasks ) )
    //     .catch( err => res.status( 404 ).json( {
    //         notasksfound: 'No Tasks found'
    //     } ) );
    try {
        const tasks = await Tasks.find();
        res.status(200).send({
            tasks: tasks,
        });
        // console.log( "test" );
    } catch (error) {
        res.status(500).send(error);
    }
}

// @route GET api/apps/planner/tasks/:id
// @description Get single task by id
// @access Public
const PlannerGetTask = async ( req, res ) => {
    Tasks.findById( req.params.id )
        .then( task => res.json( task ) )
        .catch( err => res.status( 404 ).json( {
            notaskfound: 'No Task found'
        } ) );
};

// @route       POST /api/apps/planner/add-task
// @desc        Add a new task
// @access      Public
const PlannerTaskAdd = async ( req, res ) =>
{
	// console.log("APPS :: PLANNER :: ADD-TASK :: Task schema = ", Tasks.schema.tree);
    try
    {
        const task = new Tasks(req.body);
		await task.save();
		// console.log("APPS :: PLANNER :: ADD-TASK", "\n :: req.body = ", req.body, "\n :: res = ", res.body);
		// If it works, throw a success message.
		res.send({
			data: Tasks.schema.tree,
			success: true,
			message: "Task added successfully",
			status: 200,
        } );
        
        // Tasks.create( req.body )
        //     .then( ( task ) => (
        //         res.send( {
        //             data: task,
        //             success: true,
        //             message: "Task added successfully",
        //             status: 200,
        //         } )
        //     ) )
        //     .catch( ( err ) =>
        //         res.send({
        //             error: "Unable to add this task",
        //             data: err,
        //             success: false,
        //             message: ["400 Error. Unable to add this task. :: Error = ", err].join(''),
        //             status: 400,
        //         })
        // );
        
        // console.log("APPS :: PLANNER :: ADD-TASK", "\n :: req.body = ", req.body, "\n :: res = ", res.body);
        // If it works, throw a success message.
    } catch (error) {
        // res.status(500).send(error);
        // console.log("APPS :: PLANNER :: ADD-TASK :: 500 ERROR", "\n :: req.body = ", req.body, "\n :: error = ", error);
    
        res.send({
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        });
    }
};

// @route GET api/apps/planner/tasks/:id
// @description Update task
// @access Public
const PlannerTaskUpdate = async ( req, res ) => {
    Tasks.findByIdAndUpdate( req.params.id, req.body )
        .then( task => res.json( {
            msg: 'Updated successfully'
        } ) )
        .catch( err =>
            res.status( 400 ).json( {
                error: 'Unable to update the Database'
            } )
        );
};

// @route GET api/apps/planner/tasks/:id
// @description Delete task by id
// @access Public
const PlannerTaskDelete = async ( req, res ) => {
    Tasks.findByIdAndRemove( req.params.id, req.body )
        .then( task => res.json( {
            mgs: 'Task entry deleted successfully'
        } ) )
        .catch( err => res.status( 404 ).json( {
            error: 'No such a task'
        } ) );
};


// @route       POST /api/planner/edit-task
// @desc        Edit a task
// @access      Private
const PlannerTaskUpdateBody = async ( req, res ) => {
    try {
        const task = await Tasks.findOneAndUpdate( {
                _id: req.body._id
            },
            req.body, {
                new: true
            },
        );
        res.send( {
            data: task,
            success: true,
            message: "Task updated successfully.",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
};


// Delete experience
// @route       POST /api/planner/delete-task
// @desc        Delete a task
// @access      Private
const PlannerTaskDeleteBody = async ( req, res ) => {
    try {
        const task = await Tasks.findOneAndDelete( {
            _id: req.body._id,
        } );

        // If it works, throw a success message.
        res.send({
            data: task,
            success: true,
            message: "Task deleted successfully",
            status: 200,
        });
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
};

export
{
    Test,
    PlannerGetTasks,
    PlannerGetTask,
    PlannerTaskAdd,
    PlannerTaskUpdate,
    PlannerTaskDelete,
    PlannerTaskUpdateBody,
    PlannerTaskDeleteBody
};

/*  // @route       POST /api/apps/planner/add-task
    // @desc        Add a new task
    // @access      Public
    router.post( "/planner/add-tasks", auth, async FunctionName ); 
    
    const FunctionName = async ( req, res ) =>
    {
        try
        {
    		const task = new Tasks(req.body);
    		await task.save();
    		// console.log("APPS :: PLANNER :: ADD-TASK", "\n :: req.body = ", req.body, "\n :: res = ", res.body);
    		// If it works, throw a success message.
    		res.send({
    			data: task,
    			success: true,
    			message: "Task added successfully",
    			status: 200,
    		});
    	} catch (error) {
    		// res.status(500).send(error);
    		// console.log("APPS :: PLANNER :: ADD-TASK :: 500 ERROR", "\n :: req.body = ", req.body, "\n :: error = ", error);

    		res.send({
    			data: error,
    			success: false,
    			message: "500 Error.",
    			status: 500,
    		});
    	}
    });
*/




/*
// All routes used by apps hosted on this site.

import axios from 'axios';
import express from 'express';
const router = express.Router();
import auth from "../middleware/auth.js";

import { Planner, Tasks } from "../models/appsModel.js";

// @route GET api/apps/planner/tasks/test
// @description tests tasks route
// @access Public
router.get( '/test', C.FunctionName ); 

const FunctionName = async ( req, res ) => res.send( 'task route testing!' ) );

// @route GET api/apps/planner/tasks
// @description Get all tasks
// @access Public
router.get( '/planner/', auth, C.PlannerGetTasks );
const PlannerGetTasks = async ( req, res ) => {
    // Tasks.find()
    //     .then( tasks => res.json( tasks ) )
    //     .catch( err => res.status( 404 ).json( {
    //         notasksfound: 'No Tasks found'
    //     } ) );
    try {
        const tasks = await Tasks.find();
        res.status(200).send({
            tasks: tasks,
        });
        // console.log( "test" );
    } catch (error) {
        res.status(500).send(error);
    }
}

// @route GET api/apps/planner/tasks/:id
// @description Get single task by id
// @access Public
router.get( '/planner/:id', C.PlannerGetTask ); 

const PlannerGetTask = async ( req, res ) => {
    Tasks.findById( req.params.id )
        .then( task => res.json( task ) )
        .catch( err => res.status( 404 ).json( {
            notaskfound: 'No Task found'
        } ) );
};

// @route GET api/apps/planner/tasks
// @description add/save task
// @access Public
router.post( '/planner', C.PlannerTaskAdd ); 

// @route       POST /api/apps/planner/add-task
// @desc        Add a new task
// @access      Public
router.post( "/planner/add-task", auth, C.PlannerTaskAdd ); 

const PlannerTaskAdd = async ( req, res ) =>
{
	// console.log("APPS :: PLANNER :: ADD-TASK :: Task schema = ", Tasks.schema.tree);
    try
    {
        const task = new Tasks(req.body);
		await task.save();
		// console.log("APPS :: PLANNER :: ADD-TASK", "\n :: req.body = ", req.body, "\n :: res = ", res.body);
		// If it works, throw a success message.
		res.send({
			data: Tasks.schema.tree,
			success: true,
			message: "Task added successfully",
			status: 200,
        } );
        
        // Tasks.create( req.body )
        //     .then( ( task ) => (
        //         res.send( {
        //             data: task,
        //             success: true,
        //             message: "Task added successfully",
        //             status: 200,
        //         } )
        //     ) )
        //     .catch( ( err ) =>
        //         res.send({
        //             error: "Unable to add this task",
        //             data: err,
        //             success: false,
        //             message: ["400 Error. Unable to add this task. :: Error = ", err].join(''),
        //             status: 400,
        //         })
        // );
        
        // console.log("APPS :: PLANNER :: ADD-TASK", "\n :: req.body = ", req.body, "\n :: res = ", res.body);
        // If it works, throw a success message.
    } catch (error) {
        // res.status(500).send(error);
        // console.log("APPS :: PLANNER :: ADD-TASK :: 500 ERROR", "\n :: req.body = ", req.body, "\n :: error = ", error);
    
        res.send({
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        });
    }
};

// @route GET api/apps/planner/tasks/:id
// @description Update task
// @access Public
router.put( '/planner/:id', C.PlannerTaskUpdate ); 

const PlannerTaskUpdate = async ( req, res ) => {
    Tasks.findByIdAndUpdate( req.params.id, req.body )
        .then( task => res.json( {
            msg: 'Updated successfully'
        } ) )
        .catch( err =>
            res.status( 400 ).json( {
                error: 'Unable to update the Database'
            } )
        );
};

// @route GET api/apps/planner/tasks/:id
// @description Delete task by id
// @access Public
router.delete( '/planner/:id', C.PlannerTaskDelete ); 

const PlannerTaskDelete = async ( req, res ) => {
    Tasks.findByIdAndRemove( req.params.id, req.body )
        .then( task => res.json( {
            mgs: 'Task entry deleted successfully'
        } ) )
        .catch( err => res.status( 404 ).json( {
            error: 'No such a task'
        } ) );
};


// @route       POST /api/planner/edit-task
// @desc        Edit a task
// @access      Private
router.post( "/planner/edit-task", auth, C.PlannerTaskUpdateBody ); 

const PlannerTaskUpdateBody = async ( req, res ) => {
    try {
        const task = await Tasks.findOneAndUpdate( {
                _id: req.body._id
            },
            req.body, {
                new: true
            },
        );
        res.send( {
            data: task,
            success: true,
            message: "Task updated successfully.",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );


// Delete experience
// @route       POST /api/planner/delete-task
// @desc        Delete a task
// @access      Private
router.post( "/planner/delete-task", auth, C.PlannerTaskDeleteBody ); 

const PlannerTaskDeleteBody = async ( req, res ) => {
    try {
        const task = await Tasks.findOneAndDelete( {
            _id: req.body._id,
        } );

        // If it works, throw a success message.
        res.send({
            data: task,
            success: true,
            message: "Task deleted successfully",
            status: 200,
        });
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

export default router;
*/
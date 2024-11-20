import mongoose from "mongoose";
import populate from "mongoose-autopopulate";

const plannerSchema = new mongoose.Schema({
    /// REQUIRED
    // MongoDB will insert a _id field.
    // _id: {
    //     type: Object,
    //     required: true,
    //     unique: true,
    // }
    workspaces: {
        type: Array,
        default: [],
    },
    categories: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    filters: {
        type: [String],
        default: [],
    },
});
plannerSchema.plugin(populate);

// create schema
// authorId: {
//     type: mongoose.Types.ObjectId,
//     required: true,
// },
// taskId: {
//     type: {
//         authorId: {
//             type: mongoose.Types.ObjectId,
//             unique: true,
//         },
//         taskIndex: {
//             type: Number,
//             default: 0,
//             index: { unique: true },
//         },
//     },
// },
const taskSchema = new mongoose.Schema({
    // authorId: {
    //     type: String,
    //     // type: mongoose.Types.ObjectId,
    //     // unique: true,
    // },
    // taskIndex: {
    //     type: Number,
    //     default: 0,
    //     index: { unique: true },
    // },
    taskId: {
        type: {
            type: String,
            // required: true,
            unique: false
            // authorId: {
            //     type: mongoose.Types.ObjectId,
            //     unique: true,
            // }
        }
    },
    workspace: {
        type: String,
        default: "",
        required: true,
        // unique: true,
    },
    title: {
        type: String,
        required: [true, "A title must be provided."],
        maxlength: [100, "name must be less than 100 characters"],
        trim: true,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "Must be provided todo description"],
    },
    notes: {
        // Array of notes.
        type: Array,
        default: [],
    },
    subtasks: {
        // Array of subtasks.
        type: Array,
        default: [],
    },
    priority: {
        type: String,
        enum: ["none", "low", "medium", "high", "urgent", "asap", "critical"],
        default: "none",
        required: true,
    },
    status: {
        type: String,
        // enum: ["incomplete", "inProgress", "completed"],
        enum: ["cancelled", "postponed", "waitingrequirements", "incomplete", "inprogress", "completed"],
        default: "incomplete",
        required: true,
    },
    completeness: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    prerequisites: {
        // Array of task IDs required to be completed before this one can be started.
        type: Array,
        default: [],
    },
    // Timestamps
    timestampDue: {
        type: Date,
        default: Date.now,
    },
    timestampEstimated: {
        type: Date,
        default: Date.now + 24 * 60 * 60 * 1000,
    },
    timestampCreated: {
        type: Date,
        default: Date.now,
    },
    timestampUpdated: {
        type: Date,
        default: Date.now,
    },
});
taskSchema.plugin(populate);

const tasksSchema = new mongoose.Schema({
	workspace: {
		type: String,
		default: "",
	},
	title: {
		type: String,
		required: [true, "A title must be provided."],
		maxlength: [100, "Title must be less than 100 characters"],
		trim: true,
	},
	category: {
		type: String,
	},
	description: {
		type: String,
		required: [true, "A description must be provided."],
	},
	notes: {
		// Array of notes.
		type: Array,
		default: [],
	},
	subtasks: {
		// Array of subtasks.
		type: Array,
		default: [],
	},
	priority: {
		type: String,
		enum: ["none", "low", "medium", "high", "urgent", "asap", "critical"],
		default: "none",
		required: true,
	},
	status: {
		type: String,
		enum: ["cancelled", "postponed", "waitingrequirements", "incomplete", "inprogress", "completed"],
		default: "incomplete",
		required: true,
	},
	completeness: {
		type: Number,
		default: 0,
		min: 0,
		max: 100,
	},
	prerequisites: {
		// Array of task IDs required to be completed before this one can be started.
		type: Array,
		default: [],
	},
	// Timestamps
	timestampDue: {
		type: Date,
		default: Date.now,
	},
	timestampEstimated: {
		type: Date,
		// default: Date.now + 24 * 60 * 60 * 1000,
		default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
	},
	timestampCreated: {
		type: Date,
		default: Date.now,
	},
	timestampUpdated: {
		type: Date,
		default: Date.now,
	},
	//  releaseDate: {
	//  	type: Date,
	//  	default: function () {
	//  		if (this.released) {
	//  			return Date.now();
	//  		}
	//  		return null;
	//  	},
	//  },
});
tasksSchema.plugin(populate);

// module.exports = {
//     Planner: mongoose.model("planner", plannerSchema),
//     Task: mongoose.model("task", taskSchema),
//     Tasks: mongoose.model("tasks", tasksSchema),
// };

export const Planner = mongoose.model("planner", plannerSchema);
export const Task = mongoose.model("task", taskSchema);
export const Tasks = mongoose.model( "tasks", tasksSchema );

export default {
    Planner, Task, Tasks
};
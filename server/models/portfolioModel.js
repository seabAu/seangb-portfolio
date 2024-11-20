import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import populate from "mongoose-autopopulate";

// Create a model schema for each of the sections.
const introSchema = new mongoose.Schema( {
    welcomeText: {
        type: String,
        required: true,
    },
    lottieURL: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
} );
introSchema.plugin( populate );

const skillSchema = new mongoose.Schema( {
    index: {
        type: Number,
    },
    showIndex: {
        type: Number,
    },
    enabled: {
        type: Boolean,
    },
    name: {
        type: String,
        // required: true,
    },
    category: {
        // Broadly what category does the skill fit into
        type: String,
        // required: true,
    },
    tags: {
        // Tokens to indicate subcategory.
        // Category can be "Electrical Engineering" while tags can include "power diagrams".
        type: Array,
        // required: true,
    },
    proficiency: {
        type: Number,
        min: 0,
        max: 10,
        // required: true,
    },
    years: {
        type: Number,
        min: 0,
        max: 50,
        // required: true,
    },
} );
skillSchema.plugin( populate );

const aboutSchema = new mongoose.Schema( {
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    statement: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    description: {
        type: Array,
        required: true,
    },
    description1: {
        type: Array,
        required: false,
    },
    description2: {
        type: Array,
        required: false,
    },
    certifications: {
        type: Array,
        required: false,
    },
    achievements: {
        type: Array,
        required: false,
    },
    skills: {
        // type: Array,
        type: [ skillSchema ],
        required: true,
    },
    social: {
        type: [
            {
                site: {
                    type: String,
                },
                url: {
                    type: String,
                },
                icon: {
                    type: String, // url to an icon?
                },
            },
        ],
    },
} );
aboutSchema.plugin( populate );

const experienceSchema = new mongoose.Schema( {
    index: {
        type: Number,
    },
    showIndex: {
        type: Number,
    },
    enabled: {
        type: Boolean,
    },
    title: {
        type: String,
        required: true,
    },
    period: {
        type: String,
        required: true,
    },
    startdate: {
        type: String,
        required: true,
    },
    enddate: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    label: {
        // Some sort of abbreviated name to show in shrunken tabs.
        type: String
    },
    description: {
        type: String,
        required: true,
    },
    duties: {
        type: Array,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
} );
experienceSchema.plugin( populate );


// PROJECTS

const technologiesSchema = new mongoose.Schema(
    {
        index: {
            type: Number,
        },
        showIndex: {
            type: Number,
        },
        enabled: {
            type: Boolean,
        },
        name: {
            type: String,
        },
        category: {
            type: String,
        },
        tags: {
            // Tokens to indicate subcategory.
            // Category can be "Electrical Engineering" while tags can include "power diagrams".
            type: [ String ],
            // required: true,
        },
    }, {
    // This adds "createdAt" and "updatedAt" timestamps automatically.
    // timestamps: true,
    _id: true
}
);
technologiesSchema.plugin( populate );

const projectSchema = new mongoose.Schema(
    {
        index: {
            type: Number,
            index: true
        },
        showIndex: {
            type: Number,
            index: true
        },
        enabled: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            required: true,
            default: "",
        },
        context: {
            type: String,
            required: true,
            default: "",
        },
        description: {
            type: String,
            required: true,
            default: "",
        },
        image: {
            type: String,
            required: true,
            default: "https://placehold.co/200x400",
        },
        images: {
            // Later this will be UUIDs of images applied to this project.
            type: [ String ],
            default: []
        },
        // media: {
        //     type: [String],
        //     default: []
        // },
        link: {
            type: String,
            required: true,
            default: "https://placehold.co/200x400",
        },
        technologies: {
            // type: Array,
            type: [ technologiesSchema ],
            required: true,
        },
        // location: {
        //     type: String,
        //     required: true,
        // },
    }, {
    // This adds "createdAt" and "updatedAt" timestamps automatically.
    // timestamps: true,
    _id: true,
    plugin: populate,
}
);
projectSchema.plugin( populate );

const educationSchema = new mongoose.Schema( {
    index: {
        type: Number,
    },
    showIndex: {
        type: Number,
    },
    enabled: {
        type: Boolean,
    },
    degree: {
        type: String,
        required: true,
    },
    major: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    subjects: {
        type: Array,
        required: true,
    },
} );
educationSchema.plugin( populate );

const contactSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
} );
contactSchema.plugin( populate );

const messageSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    company: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    preference: {
        type: String,
        required: false,
    },
    timestamp: {
        type: Date,
        required: false,
        default: Date.now,
    },
}, {
    // This adds "createdAt" and "updatedAt" timestamps automatically.
    timestamps: true,
    _id: true,
    // plugin: populate
} );
messageSchema.plugin( populate );

// export default {
//     Intro: mongoose.model("intros", introSchema),
//     About: mongoose.model("abouts", aboutSchema),
//     Experience: mongoose.model("experiences", experienceSchema),
//     Project: mongoose.model("projects", projectSchema),
//     Education: mongoose.model("educations", educationSchema),
//     Contact: mongoose.model("contacts", contactSchema),
//     Message: mongoose.model("messages", messageSchema),
// };
// 
export const Intro = mongoose.model( "intros", introSchema );
export const About = mongoose.model( "abouts", aboutSchema );
export const Experience = mongoose.model( "experiences", experienceSchema );
export const Project = mongoose.model( "projects", projectSchema );
export const Education = mongoose.model( "educations", educationSchema );
export const Contact = mongoose.model( "contacts", contactSchema );
export const Message = mongoose.model( "messages", messageSchema );

export default {
    Intro: mongoose.model( "intros", introSchema ),
    About: mongoose.model( "abouts", aboutSchema ),
    Experience: mongoose.model( "experiences", experienceSchema ),
    Project: mongoose.model( "projects", projectSchema ),
    Education: mongoose.model( "educations", educationSchema ),
    Contact: mongoose.model( "contacts", contactSchema ),
    Message: mongoose.model( "messages", messageSchema ),
};
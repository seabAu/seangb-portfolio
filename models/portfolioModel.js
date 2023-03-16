const mongoose = require("mongoose");

// Create a model schema for each of the sections.
const introSchema = new mongoose.Schema({
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
});
introSchema.plugin(require("mongoose-autopopulate"));

/*
    about = {
        url: url,
        firstName: "",
        lastName: "",
        statement: "",
        description1: "",
        description2: "",
        skills: [
            {
                name: {
                    type: String,
                    required: true,
                },
                category: {
                    type: String,
                    required: true,
                },
                proficiency: {
                    type: Number,
                    min: 0,
                    max: 10,
                    required: true,
                },
                years: {
                    type: Number,
                    min: 0,
                    max: 50,
                    required: true,
                },
            },
        ],
    };
*/
const skillSchema = new mongoose.Schema({
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
skillSchema.plugin(require("mongoose-autopopulate"));

const aboutSchema = new mongoose.Schema({
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
        type: [skillSchema],
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
});
aboutSchema.plugin(require("mongoose-autopopulate"));

const experienceSchema = new mongoose.Schema({
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
});
experienceSchema.plugin(require("mongoose-autopopulate"));


const projectSchema = new mongoose.Schema({
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
    context: {
        type: String,
        required: true,
    },
    description: {
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
    technologies: {
        type: [
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
                    // required: true,
                },
                category: {
                    type: String,
                    // required: true,
                },
                tags: {
                    // Tokens to indicate subcategory.
                    // Category can be "Electrical Engineering" while tags can include "power diagrams".
                    type: Array,
                    // required: true,
                },
            },
        ],
        required: true,
    },
    // technologies: {
    //     type: Array,
    //     required: true,
    // },
    // location: {
    //     type: String,
    //     required: true,
    // },
});
projectSchema.plugin(require("mongoose-autopopulate"));


const educationSchema = new mongoose.Schema({
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
});
educationSchema.plugin(require("mongoose-autopopulate"));


const contactSchema = new mongoose.Schema({
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
contactSchema.plugin(require("mongoose-autopopulate"));


const messageSchema = new mongoose.Schema({
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
});
messageSchema.plugin(require("mongoose-autopopulate"));


module.exports = {
    Intro: mongoose.model("intros", introSchema),
    About: mongoose.model("abouts", aboutSchema),
    Experience: mongoose.model("experiences", experienceSchema),
    Project: mongoose.model("projects", projectSchema),
    Education: mongoose.model("educations", educationSchema),
    Contact: mongoose.model("contacts", contactSchema),
    Message: mongoose.model("messages", messageSchema ),
};


/*
    const mongoose = require("mongoose");

    // Create a model schema for each of the sections.
    const introSchema = new mongoose.Schema({
        welcomeText: {
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
    });

    const aboutSchema = new mongoose.Schema({
        lottieURL: {
            type: String,
            required: true,
        },
        description1: {
            type: String,
            required: true,
        },
        description2: {
            type: String,
            required: true,
        },
        skills: {
            type: Array,
            required: true,
        },
    });

    const experienceSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        period: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
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
    });

    const projectSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
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
        technologies: {
            type: Array,
            required: true,
        },
        // location: {
        //     type: String,
        //     required: true,
        // },
    });

    const educationSchema = new mongoose.Schema({
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
    });

    const contactSchema = new mongoose.Schema({
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

    const messageSchema = new mongoose.Schema({
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
    });

    module.exports = {
        Intro: mongoose.model("intros", introSchema),
        About: mongoose.model("abouts", aboutSchema),
        Experience: mongoose.model("experiences", experienceSchema),
        Project: mongoose.model("projects", projectSchema),
        Education: mongoose.model("educations", educationSchema),
        Contact: mongoose.model("contacts", contactSchema),
        Message: mongoose.model("messages", messageSchema ),
    };
*/
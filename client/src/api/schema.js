export const dataSchema = {

}

const Schema = {
    obj: {
        workspace: {
            type: [ Function: String ],
            default: ''
        },
        title: {
            type: [ Function: String ],
            required: [ Array ],
            maxlength: [ Array ],
            trim: true
        },
        category: {
            type: [ Function: String ]
        },
        description: {
            type: [ Function: String ],
            required: [ Array ]
        },
        notes: {
            type: [ Function: Array ],
            default: []
        },
        subtasks: {
            type: [ Function: Array ],
            default: []
        },
        priority: {
            type: [ Function: String ],
            enum: [ Array ],
            default: 'none',
            required: true
        },
        status: {
            type: [ Function: String ],
            enum: [ Array ],
            default: 'incomplete',
            required: true
        },
        completeness: {
            type: [ Function: Number ],
            default: 0,
            min: 0,
            max: 100
        },
        prerequisites: {
            type: [ Function: Array ],
            default: []
        },
        timestampDue: {
            type: [ Function: Date ],
            default: [ Function: now ]
        },
        timestampEstimated: {
            type: [ Function: Date ],
            default: [ Function: default ]
        },
        timestampCreated: {
            type: [ Function: Date ],
            default: [ Function: now ]
        },
        timestampUpdated: {
            type: [ Function: Date ],
            default: [ Function: now ]
        }
    },
    paths: {
        workspace: SchemaString {
            enumValues: [],
            regExp: null,
            path: 'workspace',
            instance: 'String',
            validators: [],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaStringOptions ],
            _index: null,
            defaultValue: '',
      [ Symbol( mongoose# schemaType ) ]: true
        },
        title: SchemaString {
            enumValues: [],
            regExp: null,
            path: 'title',
            instance: 'String',
            validators: [ Array ],
            getters: [],
            setters: [ Array ],
            _presplitPath: [ Array ],
            options: [ SchemaStringOptions ],
            _index: null,
            isRequired: true,
            requiredValidator: [ Function( anonymous ) ],
            originalRequiredValue: true,
            maxlengthValidator: [ Function( anonymous ) ],
      [ Symbol( mongoose# schemaType ) ]: true
        },
        category: SchemaString {
            enumValues: [],
            regExp: null,
            path: 'category',
            instance: 'String',
            validators: [],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaStringOptions ],
            _index: null,
      [ Symbol( mongoose# schemaType ) ]: true
        },
        description: SchemaString {
            enumValues: [],
            regExp: null,
            path: 'description',
            instance: 'String',
            validators: [ Array ],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaStringOptions ],
            _index: null,
            isRequired: true,
            requiredValidator: [ Function( anonymous ) ],
            originalRequiredValue: true,
      [ Symbol( mongoose# schemaType ) ]: true
        },
        notes: SchemaArray {
            schemaOptions: [ Object ],
            casterConstructor: [ Function ],
            caster: [ Mixed ],
            '$embeddedSchemaType': [ Mixed ],
            '$isMongooseArray': true,
            path: 'notes',
            instance: 'Array',
            validators: [],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaArrayOptions ],
            _index: null,
            defaultValue: [ Function ],
      [ Symbol( mongoose# schemaType ) ]: true
        },
        subtasks: SchemaArray {
            schemaOptions: [ Object ],
            casterConstructor: [ Function ],
            caster: [ Mixed ],
            '$embeddedSchemaType': [ Mixed ],
            '$isMongooseArray': true,
            path: 'subtasks',
            instance: 'Array',
            validators: [],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaArrayOptions ],
            _index: null,
            defaultValue: [ Function ],
      [ Symbol( mongoose# schemaType ) ]: true
        },
        priority: SchemaString {
            enumValues: [ Array ],
            regExp: null,
            path: 'priority',
            instance: 'String',
            validators: [ Array ],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaStringOptions ],
            _index: null,
            enumValidator: [ Function( anonymous ) ],
            defaultValue: 'none',
            isRequired: true,
            requiredValidator: [ Function( anonymous ) ],
            originalRequiredValue: true,
      [ Symbol( mongoose# schemaType ) ]: true
        },
        status: SchemaString {
            enumValues: [ Array ],
            regExp: null,
            path: 'status',
            instance: 'String',
            validators: [ Array ],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaStringOptions ],
            _index: null,
            enumValidator: [ Function( anonymous ) ],
            defaultValue: 'incomplete',
            isRequired: true,
            requiredValidator: [ Function( anonymous ) ],
            originalRequiredValue: true,
      [ Symbol( mongoose# schemaType ) ]: true
        },
        completeness: SchemaNumber {
            path: 'completeness',
            instance: 'Number',
            validators: [ Array ],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaNumberOptions ],
            _index: null,
            defaultValue: 0,
            minValidator: [ Function( anonymous ) ],
            maxValidator: [ Function( anonymous ) ],
      [ Symbol( mongoose# schemaType ) ]: true
        },
        prerequisites: SchemaArray {
            schemaOptions: [ Object ],
            casterConstructor: [ Function ],
            caster: [ Mixed ],
            '$embeddedSchemaType': [ Mixed ],
            '$isMongooseArray': true,
            path: 'prerequisites',
            instance: 'Array',
            validators: [],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaArrayOptions ],
            _index: null,
            defaultValue: [ Function ],
      [ Symbol( mongoose# schemaType ) ]: true
        },
        timestampDue: SchemaDate {
            path: 'timestampDue',
            instance: 'Date',
            validators: [],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaDateOptions ],
            _index: null,
            defaultValue: [ Function: now ],
      [ Symbol( mongoose# schemaType ) ]: true
        },
        timestampEstimated: SchemaDate {
            path: 'timestampEstimated',
            instance: 'Date',
            validators: [],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaDateOptions ],
            _index: null,
            defaultValue: [ Function: default ],
      [ Symbol( mongoose# schemaType ) ]: true
        },
        timestampCreated: SchemaDate {
            path: 'timestampCreated',
            instance: 'Date',
            validators: [],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaDateOptions ],
            _index: null,
            defaultValue: [ Function: now ],
      [ Symbol( mongoose# schemaType ) ]: true
        },
        timestampUpdated: SchemaDate {
            path: 'timestampUpdated',
            instance: 'Date',
            validators: [],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaDateOptions ],
            _index: null,
            defaultValue: [ Function: now ],
      [ Symbol( mongoose# schemaType ) ]: true
        },
        _id: ObjectId {
            path: '_id',
            instance: 'ObjectID',
            validators: [],
            getters: [],
            setters: [ Array ],
            _presplitPath: [ Array ],
            options: [ SchemaObjectIdOptions ],
            _index: null,
            defaultValue: [ Function ],
      [ Symbol( mongoose# schemaType ) ]: true
        },
        __v: SchemaNumber {
            path: '__v',
            instance: 'Number',
            validators: [],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: [ SchemaNumberOptions ],
            _index: null,
      [ Symbol( mongoose# schemaType ) ]: true
        }
    },
    aliases: {},
    subpaths: {
        'notes.$': Mixed {
            path: 'notes.$',
            instance: 'Mixed',
            validators: [],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: SchemaTypeOptions {},
            _index: null,
      [ Symbol( mongoose# schemaType ) ]: true,
      [ Symbol( mongoose: schema_mixed ) ]: true
        },
        'subtasks.$': Mixed {
            path: 'subtasks.$',
            instance: 'Mixed',
            validators: [],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: SchemaTypeOptions {},
            _index: null,
      [ Symbol( mongoose# schemaType ) ]: true,
      [ Symbol( mongoose: schema_mixed ) ]: true
        },
        'prerequisites.$': Mixed {
            path: 'prerequisites.$',
            instance: 'Mixed',
            validators: [],
            getters: [],
            setters: [],
            _presplitPath: [ Array ],
            options: SchemaTypeOptions {},
            _index: null,
      [ Symbol( mongoose# schemaType ) ]: true,
      [ Symbol( mongoose: schema_mixed ) ]: true
        }
    },
    virtuals: {
        id: VirtualType {
            path: 'id',
            getters: [ Array ],
            setters: [],
            options: {}
        }
    },
    singleNestedPaths: {},
    nested: {},
    inherits: {},
    callQueue: [],
    _indexes: [],
    methods: {},
    methodOptions: {},
    statics: {},
    tree: {
        workspace: {
            type: [ Function: String ],
            default: ''
        },
        title: {
            type: [ Function: String ],
            required: [ Array ],
            maxlength: [ Array ],
            trim: true
        },
        category: {
            type: [ Function: String ]
        },
        description: {
            type: [ Function: String ],
            required: [ Array ]
        },
        notes: {
            type: [ Function: Array ],
            default: []
        },
        subtasks: {
            type: [ Function: Array ],
            default: []
        },
        priority: {
            type: [ Function: String ],
            enum: [ Array ],
            default: 'none',
            required: true
        },
        status: {
            type: [ Function: String ],
            enum: [ Array ],
            default: 'incomplete',
            required: true
        },
        completeness: {
            type: [ Function: Number ],
            default: 0,
            min: 0,
            max: 100
        },
        prerequisites: {
            type: [ Function: Array ],
            default: []
        },
        timestampDue: {
            type: [ Function: Date ],
            default: [ Function: now ]
        },
        timestampEstimated: {
            type: [ Function: Date ],
            default: [ Function: default ]
        },
        timestampCreated: {
            type: [ Function: Date ],
            default: [ Function: now ]
        },
        timestampUpdated: {
            type: [ Function: Date ],
            default: [ Function: now ]
        },
        _id: {
            auto: true,
            type: 'ObjectId'
        },
        __v: [ Function: Number ],
        id: VirtualType {
            path: 'id',
            getters: [ Array ],
            setters: [],
            options: {}
        }
    },
    query: {},
    childSchemas: [],
    plugins: [
        {
            fn: [ Function: autopopulatePlugin ],
            opts: undefined
        },
        {
            fn: [ Function: removeSubdocs ],
            opts: [ Object ]
        },
        {
            fn: [ Function: saveSubdocs ],
            opts: [ Object ]
        },
        {
            fn: [ Function ],
            opts: [ Object ]
        },
        {
            fn: [ Function: trackTransaction ],
            opts: [ Object ]
        },
        {
            fn: [ Function: validateBeforeSave ],
            opts: [ Object ]
        }
  ],
    '$id': 20,
    mapPaths: [],
    s: {
        hooks: Kareem {
            _pres: [ Map ],
            _posts: [ Map ]
        }
    },
    _userProvidedOptions: {},
    options: {
        typeKey: 'type',
        id: true,
        _id: true,
        validateBeforeSave: true,
        read: null,
        shardKey: null,
        discriminatorKey: '__t',
        autoIndex: null,
        minimize: true,
        optimisticConcurrency: false,
        versionKey: '__v',
        capped: false,
        bufferCommands: true,
        strictQuery: true,
        strict: true,
        pluralization: true
    },
    '$globalPluginsApplied': true
}

{
    "data": {
        "data": {
            "obj": {
                "workspace": {
                    "default": ""
                },
                "title": {
                    "required": [
                        true,
                        "A title must be provided."
                    ],
                    "maxlength": [
                        100,
                        "Title must be less than 100 characters"
                    ],
                    "trim": true
                },
                "category": {},
                "description": {
                    "required": [
                        true,
                        "A description must be provided."
                    ]
                },
                "notes": {
                    "default": []
                },
                "subtasks": {
                    "default": []
                },
                "priority": {
                    "enum": [
                        "none",
                        "low",
                        "medium",
                        "high",
                        "urgent",
                        "asap",
                        "critical"
                    ],
                    "default": "none",
                    "required": true
                },
                "status": {
                    "enum": [
                        "cancelled",
                        "postponed",
                        "waitingrequirements",
                        "incomplete",
                        "inprogress",
                        "completed"
                    ],
                    "default": "incomplete",
                    "required": true
                },
                "completeness": {
                    "default": 0,
                    "min": 0,
                    "max": 100
                },
                "prerequisites": {
                    "default": []
                },
                "timestampDue": {},
                "timestampEstimated": {},
                "timestampCreated": {},
                "timestampUpdated": {}
            },
            "paths": {
                "workspace": {
                    "enumValues": [],
                    "regExp": null,
                    "path": "workspace",
                    "instance": "String",
                    "validators": [],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "workspace"
                    ],
                    "options": {
                        "default": ""
                    },
                    "_index": null,
                    "defaultValue": ""
                },
                "title": {
                    "enumValues": [],
                    "regExp": null,
                    "path": "title",
                    "instance": "String",
                    "validators": [
                        {
                            "message": "A title must be provided.",
                            "type": "required"
                        },
                        {
                            "message": "Title must be less than 100 characters",
                            "type": "maxlength",
                            "maxlength": 100
                        }
                    ],
                    "getters": [],
                    "setters": [
                        null
                    ],
                    "_presplitPath": [
                        "title"
                    ],
                    "options": {
                        "required": [
                            true,
                            "A title must be provided."
                        ],
                        "maxlength": [
                            100,
                            "Title must be less than 100 characters"
                        ],
                        "trim": true
                    },
                    "_index": null,
                    "isRequired": true,
                    "originalRequiredValue": true
                },
                "category": {
                    "enumValues": [],
                    "regExp": null,
                    "path": "category",
                    "instance": "String",
                    "validators": [],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "category"
                    ],
                    "options": {},
                    "_index": null
                },
                "description": {
                    "enumValues": [],
                    "regExp": null,
                    "path": "description",
                    "instance": "String",
                    "validators": [
                        {
                            "message": "A description must be provided.",
                            "type": "required"
                        }
                    ],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "description"
                    ],
                    "options": {
                        "required": [
                            true,
                            "A description must be provided."
                        ]
                    },
                    "_index": null,
                    "isRequired": true,
                    "originalRequiredValue": true
                },
                "notes": {
                    "schemaOptions": {
                        "typeKey": "type",
                        "id": true,
                        "_id": true,
                        "validateBeforeSave": true,
                        "read": null,
                        "shardKey": null,
                        "discriminatorKey": "__t",
                        "autoIndex": null,
                        "minimize": true,
                        "optimisticConcurrency": false,
                        "versionKey": "__v",
                        "capped": false,
                        "bufferCommands": true,
                        "strictQuery": true,
                        "strict": true,
                        "pluralization": true
                    },
                    "caster": {
                        "path": "notes",
                        "instance": "Mixed",
                        "validators": [],
                        "getters": [],
                        "setters": [],
                        "_presplitPath": [
                            "notes"
                        ],
                        "options": {},
                        "_index": null,
                        "_arrayPath": "notes.$",
                        "_arrayParentPath": "notes"
                    },
                    "$embeddedSchemaType": {
                        "path": "notes",
                        "instance": "Mixed",
                        "validators": [],
                        "getters": [],
                        "setters": [],
                        "_presplitPath": [
                            "notes"
                        ],
                        "options": {},
                        "_index": null,
                        "_arrayPath": "notes.$",
                        "_arrayParentPath": "notes"
                    },
                    "$isMongooseArray": true,
                    "path": "notes",
                    "instance": "Array",
                    "validators": [],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "notes"
                    ],
                    "options": {
                        "default": []
                    },
                    "_index": null
                },
                "subtasks": {
                    "schemaOptions": {
                        "typeKey": "type",
                        "id": true,
                        "_id": true,
                        "validateBeforeSave": true,
                        "read": null,
                        "shardKey": null,
                        "discriminatorKey": "__t",
                        "autoIndex": null,
                        "minimize": true,
                        "optimisticConcurrency": false,
                        "versionKey": "__v",
                        "capped": false,
                        "bufferCommands": true,
                        "strictQuery": true,
                        "strict": true,
                        "pluralization": true
                    },
                    "caster": {
                        "path": "subtasks",
                        "instance": "Mixed",
                        "validators": [],
                        "getters": [],
                        "setters": [],
                        "_presplitPath": [
                            "subtasks"
                        ],
                        "options": {},
                        "_index": null,
                        "_arrayPath": "subtasks.$",
                        "_arrayParentPath": "subtasks"
                    },
                    "$embeddedSchemaType": {
                        "path": "subtasks",
                        "instance": "Mixed",
                        "validators": [],
                        "getters": [],
                        "setters": [],
                        "_presplitPath": [
                            "subtasks"
                        ],
                        "options": {},
                        "_index": null,
                        "_arrayPath": "subtasks.$",
                        "_arrayParentPath": "subtasks"
                    },
                    "$isMongooseArray": true,
                    "path": "subtasks",
                    "instance": "Array",
                    "validators": [],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "subtasks"
                    ],
                    "options": {
                        "default": []
                    },
                    "_index": null
                },
                "priority": {
                    "enumValues": [
                        "none",
                        "low",
                        "medium",
                        "high",
                        "urgent",
                        "asap",
                        "critical"
                    ],
                    "regExp": null,
                    "path": "priority",
                    "instance": "String",
                    "validators": [
                        {
                            "message": "Path `{PATH}` is required.",
                            "type": "required"
                        },
                        {
                            "message": "`{VALUE}` is not a valid enum value for path `{PATH}`.",
                            "type": "enum",
                            "enumValues": [
                                "none",
                                "low",
                                "medium",
                                "high",
                                "urgent",
                                "asap",
                                "critical"
                            ]
                        }
                    ],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "priority"
                    ],
                    "options": {
                        "enum": [
                            "none",
                            "low",
                            "medium",
                            "high",
                            "urgent",
                            "asap",
                            "critical"
                        ],
                        "default": "none",
                        "required": true
                    },
                    "_index": null,
                    "defaultValue": "none",
                    "isRequired": true,
                    "originalRequiredValue": true
                },
                "status": {
                    "enumValues": [
                        "cancelled",
                        "postponed",
                        "waitingrequirements",
                        "incomplete",
                        "inprogress",
                        "completed"
                    ],
                    "regExp": null,
                    "path": "status",
                    "instance": "String",
                    "validators": [
                        {
                            "message": "Path `{PATH}` is required.",
                            "type": "required"
                        },
                        {
                            "message": "`{VALUE}` is not a valid enum value for path `{PATH}`.",
                            "type": "enum",
                            "enumValues": [
                                "cancelled",
                                "postponed",
                                "waitingrequirements",
                                "incomplete",
                                "inprogress",
                                "completed"
                            ]
                        }
                    ],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "status"
                    ],
                    "options": {
                        "enum": [
                            "cancelled",
                            "postponed",
                            "waitingrequirements",
                            "incomplete",
                            "inprogress",
                            "completed"
                        ],
                        "default": "incomplete",
                        "required": true
                    },
                    "_index": null,
                    "defaultValue": "incomplete",
                    "isRequired": true,
                    "originalRequiredValue": true
                },
                "completeness": {
                    "path": "completeness",
                    "instance": "Number",
                    "validators": [
                        {
                            "message": "Path `{PATH}` ({VALUE}) is less than minimum allowed value (0).",
                            "type": "min",
                            "min": 0
                        },
                        {
                            "message": "Path `{PATH}` ({VALUE}) is more than maximum allowed value (100).",
                            "type": "max",
                            "max": 100
                        }
                    ],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "completeness"
                    ],
                    "options": {
                        "default": 0,
                        "min": 0,
                        "max": 100
                    },
                    "_index": null,
                    "defaultValue": 0
                },
                "prerequisites": {
                    "schemaOptions": {
                        "typeKey": "type",
                        "id": true,
                        "_id": true,
                        "validateBeforeSave": true,
                        "read": null,
                        "shardKey": null,
                        "discriminatorKey": "__t",
                        "autoIndex": null,
                        "minimize": true,
                        "optimisticConcurrency": false,
                        "versionKey": "__v",
                        "capped": false,
                        "bufferCommands": true,
                        "strictQuery": true,
                        "strict": true,
                        "pluralization": true
                    },
                    "caster": {
                        "path": "prerequisites",
                        "instance": "Mixed",
                        "validators": [],
                        "getters": [],
                        "setters": [],
                        "_presplitPath": [
                            "prerequisites"
                        ],
                        "options": {},
                        "_index": null,
                        "_arrayPath": "prerequisites.$",
                        "_arrayParentPath": "prerequisites"
                    },
                    "$embeddedSchemaType": {
                        "path": "prerequisites",
                        "instance": "Mixed",
                        "validators": [],
                        "getters": [],
                        "setters": [],
                        "_presplitPath": [
                            "prerequisites"
                        ],
                        "options": {},
                        "_index": null,
                        "_arrayPath": "prerequisites.$",
                        "_arrayParentPath": "prerequisites"
                    },
                    "$isMongooseArray": true,
                    "path": "prerequisites",
                    "instance": "Array",
                    "validators": [],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "prerequisites"
                    ],
                    "options": {
                        "default": []
                    },
                    "_index": null
                },
                "timestampDue": {
                    "path": "timestampDue",
                    "instance": "Date",
                    "validators": [],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "timestampDue"
                    ],
                    "options": {},
                    "_index": null
                },
                "timestampEstimated": {
                    "path": "timestampEstimated",
                    "instance": "Date",
                    "validators": [],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "timestampEstimated"
                    ],
                    "options": {},
                    "_index": null
                },
                "timestampCreated": {
                    "path": "timestampCreated",
                    "instance": "Date",
                    "validators": [],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "timestampCreated"
                    ],
                    "options": {},
                    "_index": null
                },
                "timestampUpdated": {
                    "path": "timestampUpdated",
                    "instance": "Date",
                    "validators": [],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "timestampUpdated"
                    ],
                    "options": {},
                    "_index": null
                },
                "_id": {
                    "path": "_id",
                    "instance": "ObjectID",
                    "validators": [],
                    "getters": [],
                    "setters": [
                        null
                    ],
                    "_presplitPath": [
                        "_id"
                    ],
                    "options": {
                        "auto": true,
                        "type": "ObjectId"
                    },
                    "_index": null
                },
                "__v": {
                    "path": "__v",
                    "instance": "Number",
                    "validators": [],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "__v"
                    ],
                    "options": {},
                    "_index": null
                }
            },
            "aliases": {},
            "subpaths": {
                "notes.$": {
                    "path": "notes.$",
                    "instance": "Mixed",
                    "validators": [],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "notes"
                    ],
                    "options": {},
                    "_index": null
                },
                "subtasks.$": {
                    "path": "subtasks.$",
                    "instance": "Mixed",
                    "validators": [],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "subtasks"
                    ],
                    "options": {},
                    "_index": null
                },
                "prerequisites.$": {
                    "path": "prerequisites.$",
                    "instance": "Mixed",
                    "validators": [],
                    "getters": [],
                    "setters": [],
                    "_presplitPath": [
                        "prerequisites"
                    ],
                    "options": {},
                    "_index": null
                }
            },
            "virtuals": {
                "id": {
                    "path": "id",
                    "getters": [
                        null
                    ],
                    "setters": [],
                    "options": {}
                }
            },
            "singleNestedPaths": {},
            "nested": {},
            "inherits": {},
            "callQueue": [],
            "_indexes": [],
            "methods": {},
            "methodOptions": {},
            "statics": {},
            "tree": {
                "workspace": {
                    "default": ""
                },
                "title": {
                    "required": [
                        true,
                        "A title must be provided."
                    ],
                    "maxlength": [
                        100,
                        "Title must be less than 100 characters"
                    ],
                    "trim": true
                },
                "category": {},
                "description": {
                    "required": [
                        true,
                        "A description must be provided."
                    ]
                },
                "notes": {
                    "default": []
                },
                "subtasks": {
                    "default": []
                },
                "priority": {
                    "enum": [
                        "none",
                        "low",
                        "medium",
                        "high",
                        "urgent",
                        "asap",
                        "critical"
                    ],
                    "default": "none",
                    "required": true
                },
                "status": {
                    "enum": [
                        "cancelled",
                        "postponed",
                        "waitingrequirements",
                        "incomplete",
                        "inprogress",
                        "completed"
                    ],
                    "default": "incomplete",
                    "required": true
                },
                "completeness": {
                    "default": 0,
                    "min": 0,
                    "max": 100
                },
                "prerequisites": {
                    "default": []
                },
                "timestampDue": {},
                "timestampEstimated": {},
                "timestampCreated": {},
                "timestampUpdated": {},
                "_id": {
                    "auto": true,
                    "type": "ObjectId"
                },
                "id": {
                    "path": "id",
                    "getters": [
                        null
                    ],
                    "setters": [],
                    "options": {}
                }
            },
            "query": {},
            "childSchemas": [],
            "plugins": [
                {},
                {
                    "opts": {
                        "deduplicate": true
                    }
                },
                {
                    "opts": {
                        "deduplicate": true
                    }
                },
                {
                    "opts": {
                        "deduplicate": true
                    }
                },
                {
                    "opts": {
                        "deduplicate": true
                    }
                },
                {
                    "opts": {
                        "deduplicate": true
                    }
                }
            ],
            "$id": 20,
            "mapPaths": [],
            "s": {
                "hooks": {
                    "_pres": {},
                    "_posts": {}
                }
            },
            "_userProvidedOptions": {},
            "options": {
                "typeKey": "type",
                "id": true,
                "_id": true,
                "validateBeforeSave": true,
                "read": null,
                "shardKey": null,
                "discriminatorKey": "__t",
                "autoIndex": null,
                "minimize": true,
                "optimisticConcurrency": false,
                "versionKey": "__v",
                "capped": false,
                "bufferCommands": true,
                "strictQuery": true,
                "strict": true,
                "pluralization": true
            },
            "$globalPluginsApplied": true,
            "_requiredpaths": [
                "status",
                "priority",
                "description",
                "title"
            ],
            "_indexedpaths": []
        },
        "success": true,
        "message": "Task added successfully",
        "status": 200
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "9660",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWQzOGE1MjU4YjQyYmJmNjVkMzI5YSIsImlhdCI6MTY4MTg5NDAyNSwiZXhwIjoxNjgxODk3NjI1fQ.77XsyvH4-vmXaMjkZjLp23tekxVaPl6Pz81xc9M2-I4"
        },
        "baseURL": "//localhost:4000",
        "method": "post",
        "url": "/api/apps/planner/add-task",
        "data": "{\"workspace\":\"e98ve\",\"title\":\"b16mm\",\"category\":\"r8f0h\",\"description\":\"yugss\",\"notes\":[85,10,false,false,1681894211656,1681894211656,1681894211656,\"r116b\",70,46,\"49ozx\"],\"subtasks\":[49,1681894211656,false,76,1681894211656,\"zznvm\",22,false,75,1681894211656,false],\"priority\":\"critical\",\"status\":\"waitingrequirements\",\"completeness\":38,\"prerequisites\":[false,false,1681894211657,1681894211657,\"0kqqq\",\"tapww\",false,38,\"yj4yh\",35,\"qcip2\"],\"timestampDue\":1681894211657,\"timestampEstimated\":1681894211657,\"timestampCreated\":1681894211657,\"timestampUpdated\":1681894211657}"
    },
    "request": {}
}
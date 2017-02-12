import mongoose from 'mongoose';

const VALIDATION_ERROR_INVALID_ENUM = 'ValidationError: `{VALUE}` is not valid for {PATH}.'
const VALIDATION_ERROR_MISSING_REQUIRED = 'ValidationError: Missing required value ({PATH}).'

const JointType = {
    values: [
        'AnkleLeft',
        'AnkleRight',
        'ElbowLeft',
        'ElbowRight',
        'FootLeft',
        'FootRight',
        'HandLeft',
        'HandRight',
        'HandTipLeft',
        'HandTipRight',
        'Head',
        'HipLeft',
        'HipRight',
        'KneeLeft',
        'KneeRight',
        'Neck',
        'ShoulderLeft',
        'ShoulderRight',
        'SpineBase',
        'SpineMid',
        'SpineShoulder',
        'ThumbLeft',
        'ThumbRight',
        'WristLeft',
        'WristRight',
    ],
    message: VALIDATION_ERROR_INVALID_ENUM
};

const RequiredNumber = {
    type: Number,
    required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
}

const Joint = mongoose.Schema({
    JointType: {
        type: String,
        enum: JointType,
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    X: RequiredNumber,
    Y: RequiredNumber,
    Z: RequiredNumber
},
{
    _id: false
});

const BodySnapshot = mongoose.Schema({
    Joints: {
        type: [ Joint ],
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    Time: {
        type: Date,
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    }
},
{
    _id: false
});

const AudioSnapshot = mongoose.Schema({
    Intensity: {
        type: Number,
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ],
        default: 0.0
    },
    Time: {
        type: Date,
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    }
},
{
    _id: false
});

const Session = mongoose.Schema({
    Snapshots: {
        type: [ BodySnapshot ],
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    AudioSnapshots: {
        type: [ AudioSnapshot ],
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    }
},
{
    versionKey: false
});

export default mongoose.model('Session', Session);

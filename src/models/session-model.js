import mongoose from 'mongoose';

const VALIDATION_ERROR_INVALID_ENUM = 'ValidationError ({PATH}): `{VALUE}` is not valid.'
const VALIDATION_ERROR_MISSING_REQUIRED = 'ValidationError ({PATH}): Missing required value.'

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
};

const Joint = {
    JointType: {
        type: String,
        enum: JointType,
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    X: RequiredNumber,
    Y: RequiredNumber,
    Z: RequiredNumber
};

const Snapshot = {
    Joints: {
        type: [ Joint ],
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    Time: {
        type: Date,
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    }
};

const Session = mongoose.Schema({
    Snapshots: {
        type: Snapshot,
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    }
});

export default mongoose.model('Session', Session);

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
    required: true
}

const Joint = mongoose.Schema({
    JointType: {
        type: String,
        enum: JointType,
        required: true
    },
    X: RequiredNumber,
    Y: RequiredNumber,
    Z: RequiredNumber
},
{
    _id: false
});

const Snapshot = mongoose.Schema({
    Joints: {
        type: [ Joint ],
        required: true
    },
    Time: {
        type: Date,
        required: true
    }
},
{
    _id: false
});

const Session = mongoose.Schema({
    Snapshots: {
        type: [ Snapshot ],
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    }
},
{
    versionKey: false
});

export default mongoose.model('Session', Session);

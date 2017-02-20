import errors from './error-messages';
import mongoose from 'mongoose';

const options = {
    _id: false
};

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
    message: errors.VALIDATION_ERROR_INVALID_ENUM
};

const RequiredNumber = {
    type: Number,
    required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
}

const Joint = mongoose.Schema({
    JointType: {
        type: String,
        enum: JointType,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    X: RequiredNumber,
    Y: RequiredNumber,
    Z: RequiredNumber
}, options);

export const BodySnapshot = mongoose.Schema({
    Joints: {
        type: [ Joint ],
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    Time: {
        type: Date,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    }
}, options);

export const AudioSnapshot = mongoose.Schema({
    Intensity: {
        type: Number,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ],
        default: 0.0
    },
    Time: {
        type: Date,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    }
}, options);

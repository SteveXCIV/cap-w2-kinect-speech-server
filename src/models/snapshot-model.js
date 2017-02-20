import errors from './error-messages';
import mongoose from 'mongoose';

const options = {
    _id: false
};

const JointType = {
    values: [
        // 'AnkleLeft',
        // 'AnkleRight',
        'ElbowLeft',
        'ElbowRight',
        // 'FootLeft',
        // 'FootRight',
        'HandLeft',
        'HandRight',
        'HandTipLeft',
        'HandTipRight',
        'Head',
        // 'HipLeft',
        // 'HipRight',
        // 'KneeLeft',
        // 'KneeRight',
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
    required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ],
    default: 0.0
};

const RequiredDate = {
    type: Date,
    required: [ true, erorrs.VALIDATION_ERROR_MISSING_REQUIRED ]
};

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
    Time: RequiredDate
}, options);

export const AudioSnapshot = mongoose.Schema({
    Intensity: RequiredNumber,
    Time: RequiredDate
}, options);

export const DistanceSnapshot = mongoose.Schema({
    Distance: RequiredNumber,
    Time: RequiredDate
}, options);

export const Distance2Snapshot = mongoose.Schema({
    HandToHandDistance: RequiredNumber,
    HandsToSpineDistance: RequiredNumber,
    Time: RequiredDate
}, options);

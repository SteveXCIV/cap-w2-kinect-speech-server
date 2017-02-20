import errors from './error-messages';
import mongoose from 'mongoose';
import {
    AudioSnapshot,
    BodySnapshot,
    DistanceSnapshot,
    Distance2Snapshot
} from './snapshot-model';
import RequiredDate from './common';

const options = {
    discriminatorKey: 'kind',
    versionKey: false
};

const ObjectiveSchema = mongoose.Schema({
    AudioSnapshots: {
        type: [ AudioSnapshot ],
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    BodySnapshots: {
        type: [ BodySnapshot ],
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    EndTime: RequiredDate,
    StartTime: RequiredDate
}, options);

export const ObjectiveModel = mongoose.model('Objective', ObjectiveSchema);

const DescribeObjectiveSchema = mongoose.Schema({
    Distances: {
        type: [ Distance2Snapshot ],
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    }
}, options);

const LocateObjectiveSchema = mongoose.Schema({
    ActivationTime: RequiredDate,
    Distances: {
        type: [ DistanceSnapshot ],
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    }
}, options);

export const DescribeObjective = ObjectiveModel.discriminator(
    'DescribeObjective',
    DescribeObjectiveSchema
);

export const LocateObjective = ObjectiveModel.discriminator(
    'LocateObjective',
    LocateObjectiveSchema
);

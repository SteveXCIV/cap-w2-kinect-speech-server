import errors from './error-messages';
import mongoose from 'mongoose';
import { Objective } from './objective-model';
import {
    RequiredDate,
    RequiredNumber
} from './common';

export const Trial = mongoose.Schema({
    EndTime: RequiredDate,
    Difficulty: RequiredNumber,
    Objectives: {
        type: [ Objective ],
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    StartTime: RequiredDate
});

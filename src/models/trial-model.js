import errors from './error-messages';
import mongoose from 'mongoose';
import {
    Objective,
    DescribeObjective,
    LocateObjective
} from './objective-model';
import {
    RequiredDate,
    RequiredNumber
} from './common';

const Trial = mongoose.Schema({
    EndTime: RequiredDate,
    Difficulty: RequiredNumber,
    Objectives: {
        type: [ Objective ],
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    StartTime: RequiredDate
});

Trial.path('Objectives').discriminator('DescribeObjective', DescribeObjective);
Trial.path('Objectives').discriminator('LocateObjective', LocateObjective);

export { Trial };

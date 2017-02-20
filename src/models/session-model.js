import errors from './error-messages';
import mongoose from 'mongoose';
import RequiredDate from './common';
import Calibration from './calibration-model';
import Trial from './trial-model';
import PATIENT_NAME from './account-model';

const SessionSchema = mongoose.Schema({
    CalibrationData: {
        type: Calibration,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    EndTime: RequiredDate,
    Patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: PATIENT_NAME,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    StartTime: RequiredDate,
    Trials: {
        type: [ Trial ],
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    }
},
{
    versionKey: false
});

export const SESSION_NAME = 'Session';
export default mongoose.model(SESSION_NAME, SessionSchema);

import errors from './error-messages';
import mongoose from 'mongoose';
import PATIENT_NAME from './account-model';
import SESSION_NAME from './session-model';

const EXPIRATION_PERIOD = '6h';

const SessionWindow = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: PATIENT_NAME,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    createdAt: {
        type: Date,
        expires: EXPIRATION_PERIOD,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ],
        default: Date.now
    }
}, { versionKey: false });

export default mongoose.Model('SessionWindow', SessionWindow);

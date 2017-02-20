import errors from './error-messages';
import mongoose from 'mongoose';

const Session = mongoose.Schema({
    BodySnapshots: {
        type: [ BodySnapshot ],
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    AudioSnapshots: {
        type: [ AudioSnapshot ],
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    }
},
{
    versionKey: false
});

export const SESSION_NAME = 'Session';
export default mongoose.model(SESSION_NAME, Session);

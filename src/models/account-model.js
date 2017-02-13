import errors from './error-messages';
import mongoose from 'mongoose';
import mongoose_unique from 'mongoose-unique-validator';

// this is made freely available at http://emailregex.com/, it's a highly accurate email regex
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ACCOUNT_NAME = 'Account';
const PATIENT_NAME = 'Patient';
const PHYSICIAN_NAME = 'Physician';

const options = { discriminatorKey: 'kind' };

const AccountSchema = mongoose.Schema({
    email: {
        type: String,
        match: [ EMAIL_REGEX, errors.VALIDATION_ERROR_BAD_EMAIL ],
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ],
        unique: true,
        uniqueCaseInsensitive: true
    },
    password: {
        type: String,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    firstName: {
        type: String,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    lastName: {
        type: String,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    joinDate: {
        type: Date,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ],
        default: Date.now
    }
}, options);
AccountSchema.plugin(mongoose_unique, { message: VALIDATION_ERROR_UNIQUE });
const Account = mongoose.model(ACCOUNT_NAME, AccountSchema);

const PatientSchema = mongoose.Schema({
    physician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: PHYSICIAN_NAME
    }
});

const PhysicianSchema = mongoose.Schema({
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: PATIENT_NAME
    }]
});

export const Patient = Account.discriminator(PATIENT_NAME, PatientSchema);
export const Physician = Account.discriminator(PHYSICIAN_NAME, PhysicianSchema);

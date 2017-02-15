import errors from './error-messages';
import mongoose from 'mongoose';
import mongoose_unique from 'mongoose-unique-validator';
import bcrypt from 'bcrypt-nodejs';
import SESSION_NAME from './session-model.js';

// this is made freely available at http://emailregex.com/, it's a highly accurate email regex
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ACCOUNT_NAME = 'Account';
export const PATIENT_NAME = 'Patient';
const PHYSICIAN_NAME = 'Physician';

const options = {
    discriminatorKey: 'kind',
    versionKey: false
};

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
AccountSchema.plugin(mongoose_unique, { message: errors.VALIDATION_ERROR_UNIQUE });
AccountSchema.methods.authenticate = function(password) {
    return bcrypt.compareSync(password, this.password);
}
AccountSchema.statics.isPhysician = account => account.kind === PHYSICIAN_NAME;
AccountSchema.statics.register = function(account) {
    if (account.password) {
        let p = bcrypt.hashSync(account.password);
        account.password = p;
    }
    return this.create(account);
}
export const Account = mongoose.model(ACCOUNT_NAME, AccountSchema);

const PatientSchema = mongoose.Schema({
    physician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: PHYSICIAN_NAME,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    temp: {
        type: Boolean,
        required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ],
        default: false
    },
    sessions: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: SESSION_NAME,
        }],
        default: []
    }
}, options);

const PhysicianSchema = mongoose.Schema({
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: PATIENT_NAME
    }]
}, options);
PhysicianSchema.statics.findProfileById = function(physicianId, cb) {
    return this.findById(physicianId)
        .populate({ path: 'patients', select: '_id firstName lastName' });
};
PhysicianSchema.statics.linkPatient = function(physicianId, patient, cb) {
    return this
        .findByIdAndUpdate(physicianId, { $push: { patients: patient._id } })
        .then(() => patient);
};

export const Patient = Account.discriminator(PATIENT_NAME, PatientSchema);
export const Physician = Account.discriminator(PHYSICIAN_NAME, PhysicianSchema);

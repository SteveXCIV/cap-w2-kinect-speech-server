import errors from './error-messages';
import mongoose from 'mongoose';
import mongoose_unique from 'mongoose-unique-validator';

// this is made freely available at http://emailregex.com/, it's a highly accurate email regex
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Account = mongoose.Schema({
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
});

Account.plugin(mongoose_unique, { message: VALIDATION_ERROR_UNIQUE });
export default mongoose.model('Account', User);

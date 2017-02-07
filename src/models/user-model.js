import mongoose from 'mongoose';
import mongoose_unique from 'mongoose-unique-validator';

const VALIDATION_ERROR_BAD_EMAIL = 'ValidationError: `{VALUE}` is not a valid email address.'
const VALIDATION_ERROR_MISSING_REQUIRED = 'ValidationError: Missing required value ({PATH}).'
const VALIDATION_ERROR_UNIQUE = 'ValidationError: The {PATH} `{VALUE}` is already in use.';

// this is made freely available at http://emailregex.com/, it's a highly accurate email regex
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const User = mongoose.Schema({
    email: {
        type: String,
        match: [ EMAIL_REGEX, VALIDATION_ERROR_BAD_EMAIL ],
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ],
        unique: true,
        uniqueCaseInsensitive: true
    },
    password: {
        type: String,
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    firstName: {
        type: String,
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    lastName: {
        type: String,
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ]
    },
    joinDate: {
        type: Date,
        required: [ true, VALIDATION_ERROR_MISSING_REQUIRED ],
        default: Date.now
    }
});

User.plugin(mongoose_unique, { message: VALIDATION_ERROR_UNIQUE });
export default mongoose.model('User', User);

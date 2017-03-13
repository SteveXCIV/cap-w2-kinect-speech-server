import errors from './error-messages';

export const RequiredDate = {
    type: Date,
    required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ]
};

export const RequiredNumber = {
    type: Number,
    required: [ true, errors.VALIDATION_ERROR_MISSING_REQUIRED ],
    default: 0.0
};

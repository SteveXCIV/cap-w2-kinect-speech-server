import errors from './error-messages';
import mongoose from 'mongoose';
import {
    RequiredDate,
    RequiredNumber
} from './common';

const CalibrationSchema = mongoose.Schema({
    AudioThreshold: RequiredNumber,
    EndTime: RequiredDate,
    MaxReachLeft: RequiredNumber,
    MaxReachRight: RequiredNumber,
    PointingZoneTimerSec: RequiredNumber,
    Radius: RequiredNumber,
    StartTime: RequiredDate
});

export const Calibration = mongoose.model('Calibration', CalibrationSchema);

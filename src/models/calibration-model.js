import errors from './error-messages';
import mongoose from 'mongoose';
import {
    RequiredDate,
    RequiredNumber
} from './common';

export const Calibration = mongoose.Schema({
    AudioThreshold: RequiredNumber,
    EndTime: RequiredDate,
    MaxReachLeft: RequiredNumber,
    MaxReachRight: RequiredNumber,
    PointingZoneTimerSec: RequiredNumber,
    Radius: RequiredNumber,
    StartTime: RequiredDate
}, { _id: false });

import * as mongoose from 'mongoose';
import { JobSchedule } from '../interface/models.interface';

const jobScheduleSchema = new mongoose.Schema<JobSchedule>(
  {
    jobScheduleSchemaVersion: {
      type: String
    },
    jobScheduleStartAt: {
      type: Date
    },
    jobScheduleEndAt: {
      type: Date
    },
    jobScheduleRepeat: {
      type: Number
    },
    jobScheduleRunOnDays: {
      type: Number
    },
    jobScheduleRunMonth: {
      type: Number
    },
    jobScheduleRunFrequencyPerDay: {
      type: Number
    },
    jobScheduleRunTimeOfDay: {
      type: String
    },
    jobScheduleRunFrequencyMinutes: {
      type: Number
    },
    jobScheduleRunFrequencyHours: {
      type: Number
    },
    nextRunAt: {
      type: Date
    },
    workspacePlatformSettingsId: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('job-schedule', jobScheduleSchema);

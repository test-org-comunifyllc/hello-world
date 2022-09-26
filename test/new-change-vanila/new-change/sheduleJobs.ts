import * as mongoose from 'mongoose';
import { ScheduledJobs } from '../interface/models.interface';

const scheduledJobsSchema = new mongoose.Schema<ScheduledJobs>(
  {
    jobScheduleId: {
      type: String
    },
    jobScheduledStatus: {
      type: String,
      enum: ['SUCCESS', 'FAILED', 'INPROGRESS']
    },
    jobScheduledInitiatedAt: {
      type: Date
    },
    jobScheduledCompletedAt: {
      type: Date
    },
    retriesLeft: {
      type: Number
    },
    status: {
      type: String
    },
    createdBy: {
      type: String
    },
    updatedBy: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('scheduled-jobs', scheduledJobsSchema);

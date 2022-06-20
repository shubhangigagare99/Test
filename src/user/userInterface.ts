import * as mongoose from 'mongoose';

export default interface userInterface extends mongoose.Document {
    name: string;
    originalId: string;
}

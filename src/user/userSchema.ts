import * as mongoose from 'mongoose';

class userSchema extends mongoose.Schema {
    constructor(collection: any) {
        const versionedOptions = Object.assign({
            createdAt: {
                default: Date.now,
                type: Date,
            },
            deletedAt: {
                required: false,
                type: Date,
            },
            name: {
              required: true,
              type: String,
          },
          originalId: {
            required: true,
            type: String,
        }
        })
        super(versionedOptions, collection);
    }
}
export default userSchema;

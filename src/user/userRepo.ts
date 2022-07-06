import * as mongoose from "mongoose";
import userInterface from "./userInterface";
import { userModel } from "./userModel";

class userRepo {
  private model: any;
  constructor(model: any) {
    this.model = model;
  }

  public async create(data: any, projection?: any): Promise<any> {
    try {
      const id = new mongoose.Types.ObjectId();
      return new this.model(
        {
          originalId: data.originalId || id,
          ...data,
        },
      ).save();
    } catch (error) {
      console.log("CATCH BLOCK : User repo create =>", error);
    }
  }

  public async count(query: any) {
    try {
      return await this.model.countDocuments({ deletedAt: null, ...query });
    } catch (error) {
      console.log("CATCH BLOCK : User repo count =>", error);
    }
  }

  public Delete(originalId: string): mongoose.UpdateQuery<userInterface> {
    return this.model.updateOne(
      { originalId, deletedAt: null },
      { deletedAt: Date.now() }
    );
  }
  public async getAll(
    options?: mongoose.QueryOptions,
    projection?: any
  ): Promise<mongoose.Query<userInterface[], userInterface>> {
    try {
      return this.model.find(
        {deletedAt: null},
      );
    } catch (error) {
      console.log("CATCH BLOCK : User repo getAll =>", error);
    }
  }

  public find(query: any = {}, projection: any = {}, options: any = {}): mongoose.Query<userInterface[], userInterface> {
    const finalQuery = { deletedAt: null, ...query };
    return this.model.find(finalQuery, projection, options);
}
}

export default new userRepo(userModel);

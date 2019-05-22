

import PrismaProcessor from "@prisma-cms/prisma-processor";
import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

export class RealtyFloorProcessor extends PrismaProcessor {


  constructor(props) {

    super(props);

    this.objectType = "RealtyFloor";

    this.private = true;

  }


  async create(objectType, args, info) {


    let {
      data: {
        ...data
      },
      ...otherArgs
    } = args;


    const {
      id: currentUserId,
    } = await this.getUser(true);


    Object.assign(data, {
      CreatedBy: {
        connect: {
          id: currentUserId,
        },
      },
    });

    return super.create(objectType, {
      data,
      ...otherArgs,
    }, info);

  }


  async mutate(objectType, args, info) {

    return super.mutate(objectType, args);
  }

}




export class Module extends PrismaModule {


  constructor(props = {}) {

    super(props);

    // this.mergeModules([ 
    // ]);


    this.RealtyFloorResponse = {
      data: (source, args, ctx, info) => {

        const {
          id,
        } = source && source.data || {};

        return id ? ctx.db.query.realtyFloor({
          where: {
            id,
          },
        }, info) : null;

      },
    }

  }



  getResolvers() {


    return {
      Query: {
        realtyFloor: this.realtyFloor.bind(this),
        realtyFloors: this.realtyFloors.bind(this),
        realtyFloorsConnection: this.realtyFloorsConnection.bind(this),
      },
      Mutation: {
        createRealtyFloorProcessor: this.createRealtyFloorProcessor.bind(this),
        updateRealtyFloorProcessor: this.updateRealtyFloorProcessor.bind(this),
        deleteRealtyFloor: this.deleteRealtyFloor.bind(this),
        deleteManyRealtyFloors: this.deleteManyRealtyFloors.bind(this),
      },
      Subscription: {
        realtyFloor: {
          subscribe: async (parent, args, ctx, info) => {

            return ctx.db.subscription.realtyFloor(args, info)
          },
        },
      },
      RealtyFloorResponse: this.RealtyFloorResponse,
    }

  }


  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx);
  }

  getProcessorClass() {
    return RealtyFloorProcessor;
  }


  realtyFloors(source, args, ctx, info) {
    return ctx.db.query.realtyFloors({}, info);
  }

  realtyFloor(source, args, ctx, info) {
    return ctx.db.query.realtyFloor({}, info);
  }

  realtyFloorsConnection(source, args, ctx, info) {
    return ctx.db.query.realtyFloorsConnection({}, info);
  }


  createRealtyFloorProcessor(source, args, ctx, info) {

    return this.getProcessor(ctx).createWithResponse("RealtyFloor", args, info);
  }

  updateRealtyFloorProcessor(source, args, ctx, info) {

    return this.getProcessor(ctx).updateWithResponse("RealtyFloor", args, info);
  }


  deleteRealtyFloor(source, args, ctx, info) {
    return ctx.db.mutation.deleteRealtyFloor({}, info);
  }


  deleteManyRealtyFloors(source, args, ctx, info) {
    return ctx.db.mutation.deleteManyRealtyFloors({}, info);
  }

}


export default Module;

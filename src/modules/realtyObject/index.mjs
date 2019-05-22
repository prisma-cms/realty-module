

import PrismaProcessor from "@prisma-cms/prisma-processor";
import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

export class RealtyObjectProcessor extends PrismaProcessor {


  constructor(props) {

    super(props);

    this.objectType = "RealtyObject";

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


    this.RealtyObjectResponse = {
      data: (source, args, ctx, info) => {

        const {
          id,
        } = source && source.data || {};

        return id ? ctx.db.query.realtyObject({
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
        realtyObject: this.realtyObject.bind(this),
        realtyObjects: this.realtyObjects.bind(this),
        realtyObjectsConnection: this.realtyObjectsConnection.bind(this),
      },
      Mutation: {
        createRealtyObjectProcessor: this.createRealtyObjectProcessor.bind(this),
        updateRealtyObjectProcessor: this.updateRealtyObjectProcessor.bind(this),
        deleteRealtyObject: this.deleteRealtyObject.bind(this),
        deleteManyRealtyObjects: this.deleteManyRealtyObjects.bind(this),
      },
      Subscription: {
        realtyObject: {
          subscribe: async (parent, args, ctx, info) => {

            return ctx.db.subscription.realtyObject(args, info)
          },
        },
      },
      RealtyObjectResponse: this.RealtyObjectResponse,
    }

  }


  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx);
  }

  getProcessorClass() {
    return RealtyObjectProcessor;
  }


  realtyObjects(source, args, ctx, info) {
    return ctx.db.query.realtyObjects({}, info);
  }

  realtyObject(source, args, ctx, info) {
    return ctx.db.query.realtyObject({}, info);
  }

  realtyObjectsConnection(source, args, ctx, info) {
    return ctx.db.query.realtyObjectsConnection({}, info);
  }


  createRealtyObjectProcessor(source, args, ctx, info) {

    return this.getProcessor(ctx).createWithResponse("RealtyObject", args, info);
  }

  updateRealtyObjectProcessor(source, args, ctx, info) {

    return this.getProcessor(ctx).updateWithResponse("RealtyObject", args, info);
  }


  deleteRealtyObject(source, args, ctx, info) {
    return ctx.db.mutation.deleteRealtyObject({}, info);
  }


  deleteManyRealtyObjects(source, args, ctx, info) {
    return ctx.db.mutation.deleteManyRealtyObjects({}, info);
  }

}


export default Module;

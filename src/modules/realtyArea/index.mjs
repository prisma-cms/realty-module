

import PrismaProcessor from "@prisma-cms/prisma-processor";
import PrismaModule from "@prisma-cms/prisma-module";

import chalk from "chalk";

export class RealtyAreaProcessor extends PrismaProcessor {


  constructor(props) {

    super(props);

    this.objectType = "RealtyArea";

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


    this.RealtyAreaResponse = {
      data: (source, args, ctx, info) => {

        const {
          id,
        } = source && source.data || {};

        return id ? ctx.db.query.realtyArea({
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
        realtyArea: this.realtyArea.bind(this),
        realtyAreas: this.realtyAreas.bind(this),
        realtyAreasConnection: this.realtyAreasConnection.bind(this),
      },
      Mutation: {
        createRealtyAreaProcessor: this.createRealtyAreaProcessor.bind(this),
        updateRealtyAreaProcessor: this.updateRealtyAreaProcessor.bind(this),
        deleteRealtyArea: this.deleteRealtyArea.bind(this),
        deleteManyRealtyAreas: this.deleteManyRealtyAreas.bind(this),
      },
      Subscription: {
        realtyArea: {
          subscribe: async (parent, args, ctx, info) => {

            return ctx.db.subscription.realtyArea(args, info)
          },
        },
      },
      RealtyAreaResponse: this.RealtyAreaResponse,
    }

  }


  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx);
  }

  getProcessorClass() {
    return RealtyAreaProcessor;
  }


  realtyAreas(source, args, ctx, info) {
    return ctx.db.query.realtyAreas({}, info);
  }

  realtyArea(source, args, ctx, info) {
    return ctx.db.query.realtyArea({}, info);
  }

  realtyAreasConnection(source, args, ctx, info) {
    return ctx.db.query.realtyAreasConnection({}, info);
  }


  createRealtyAreaProcessor(source, args, ctx, info) {

    return this.getProcessor(ctx).createWithResponse("RealtyArea", args, info);
  }

  updateRealtyAreaProcessor(source, args, ctx, info) {

    return this.getProcessor(ctx).updateWithResponse("RealtyArea", args, info);
  }


  deleteRealtyArea(source, args, ctx, info) {
    return ctx.db.mutation.deleteRealtyArea({}, info);
  }


  deleteManyRealtyAreas(source, args, ctx, info) {
    return ctx.db.mutation.deleteManyRealtyAreas({}, info);
  }

}


export default Module;


import expect from 'expect'

import chalk from "chalk";

import {
  verifySchema,
} from "../../default/schema.test.mjs";

import TestModule from "../../../";


import mocha from 'mocha'
const { describe, it } = mocha

const module = new TestModule();


/**
 */

const requiredTypes = [
  {
    name: "Query",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
      ],
    },
  },
  {
    name: "User",
    fields: {
      both: [
        "id",
      ],
      prisma: [
      ],
      api: [
      ],
    },
  },
  {
    name: "RealtyArea",
    fields: {
      both: [
        "id",
        "name",
        "code",
        "type",
        "Objects",
        "CreatedBy",
      ],
      prisma: [
      ],
      api: [
      ],
    },
  },
  {
    name: "RealtyObject",
    fields: {
      both: [
        "id",
        "name",
        "code",
        "type",
        "Floor",
        "Floors",
        "Children",
        "Parent",
        "Area",
        "CreatedBy",
      ],
      prisma: [
      ],
      api: [
      ],
    },
  },
  {
    name: "RealtyFloor",
    fields: {
      both: [
        "id",
        "name",
        "Object",
        "Objects",
        "CreatedBy",
      ],
      prisma: [
      ],
      api: [
      ],
    },
  },
  // {
  //   name: "RealtyRoom",
  //   fields: {
  //     both: [
  //       "id",
  //       "name",
  //       "code",
  //       "type",
  //     ],
  //     prisma: [
  //     ],
  //     api: [
  //     ],
  //   },
  // },
  // {
  //   name: "RealtyEntrance",
  //   fields: {
  //     both: [
  //       "id",
  //     ],
  //     prisma: [
  //     ],
  //     api: [
  //     ],
  //   },
  // },
]




describe('modxclub Verify prisma Schema', () => {

  verifySchema(module.getSchema(), requiredTypes);

});


describe('modxclub Verify API Schema 2', () => {

  verifySchema(module.getApiSchema(), requiredTypes);

});
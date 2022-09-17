/**
 * Task.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    idProject: {
      type: "string",
      required: true,
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    type: {
      type: "string",
      defaultsTo: "Task",
    },
    status: {
      type: "string",
      defaultsTo: "BACKLOG",
    },
    assignees: {
      type: "json",
      columnType: "float",
    },
    reporter: {
      type: "string",
    },
    duedate: {
      type: "string",
      defaultsTo: "4",
    },
    priority: {
      type: "string",
      defaultsTo: "Medium",
    },
    position: {
      type: "number",
    },
    idBoard: {
      type: "number",
      defaultsTo: 1,
    },
    outOfDate: {
      type: "boolean",
      defaultsTo: false,
    },
  },
};

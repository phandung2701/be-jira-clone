/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getListTask: async (req, res) => {
    try {
      const id = req.params.id;
      const tasks = await sails.models.task.find({
        where: { idProject: id },
        sort: [{ position: "ASC" }, { idBoard: "ASC" }],
      });

      return res.ok({
        success: true,
        tasks: tasks,
      });
    } catch (err) {
      return res.serverError({
        success: false,
        error: err,
      });
    }
  },

  searchTask: async (req, res) => {
    try {
      const { arrAssignees, id, name } = req.body;
      const query = {
        idProject: id,
      };
      if (name.length > 0) {
        query["title"] = { contains: name };
      }
      if (arrAssignees.length > 0) {
        query["assignees"] = arrAssignees;
      }
      /**
       * query = {
       *  idProject : id,
       *  title : {contains : name}
       *  assignees : arrAssignees
       * }
       **/
      const result = await sails.models.task.find({
        where: query,
        sort: [{ position: "ASC" }, { idBoard: "ASC" }],
      });

      return res.ok({ tasks: result });
    } catch (err) {
      return res.serverError({
        success: false,
        error: err,
      });
    }
  },
  updatePosition: async (req, res) => {
    const {
      resourceList,
      destinationList,
      sourceColIndex,
      destinationColIndex,
      idProject,
    } = req.body;
    const IDResourceList = resourceList.reduce((acc, cur) => {
      return [...acc, cur.id];
    }, []);
    const IDDestinationList = destinationList.reduce((acc, cur) => {
      return [...acc, cur.id];
    }, []);

    try {
      /**
       * cách 2 : xóa hết các task có trong req.body và tạo lại
       */
      await Task.destroy({
        id: { in: [...IDResourceList, ...IDDestinationList] },
      }).fetch();
      await Task.createEach([...resourceList, ...destinationList]).fetch();

      /**
       * cách 1 : loop qua các cột và update lại position của task
       */
      // if (sourceColIndex.id !== destinationColIndex.id) {
      //   for (const key in resourceList) {
      //     await Task.update({ id: resourceList[key].id }).set({
      //       position: key,
      //       idBoard: sourceColIndex.id,
      //       status: sourceColIndex.name,
      //     });
      //   }
      //   for (const key in destinationList) {
      //     await Task.update({ id: destinationList[key].id }).set({
      //       position: key,
      //       idBoard: destinationColIndex.id,
      //       status: destinationColIndex.name,
      //     });
      //   }
      // } else {
      //   for (const key in destinationList) {
      //     await Task.update({
      //       id: destinationList[key].id,
      //     }).set({
      //       position: key,
      //       idBoard: destinationColIndex.id,
      //       status: destinationColIndex.name,
      //     });
      //   }
      // }
      return res.ok("updated");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

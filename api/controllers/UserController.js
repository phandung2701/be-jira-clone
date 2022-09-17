/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getInformation: async (req, res) => {
    try {
      const userInfo = await sails.models.user.findOne({ idUser: req.auth.id });

      return res.status(200).json({
        success: true,
        user: userInfo || "no information",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  },

  updateInformation: async (req, res) => {
    try {
      const user = await sails.models.user.findOne({ idUser: req.auth.id });
      if (user) {
        const userUpdate = await sails.models.user
          .updateOne({ idUser: id })
          .set(req.body);
        return res.status(200).json({
          success: true,
          user: userUpdate,
        });
      } else {
        const data = req.body;
        const userInfo = await sails.models.user
          .create({
            idUser: req.auth.id || data.id,
            name: data.name,
            birth: data.birth,
            avatar: data.avatar,
            address: data.address,
            identityCard: data.identityCard,
            cardAt: data.cardAt,
          })
          .fetch();
        return res.status(200).json({
          success: true,
          user: userInfo,
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  },
};

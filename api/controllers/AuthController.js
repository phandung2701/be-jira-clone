/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  activeAccount: async (req, res) => {
    try {
      const { id } = req.body;
      const auth = await sails.models.auth
        .updateOne({ id: id })
        .set({ active: true });
      return res.status(200).json("verify successfully");
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  },
  register: async (req, res) => {
    try {
      const data = req.body;
      if (data.confirmPassword && data.password !== data.confirmPassword)
        return res.badRequest("Password not the same");
      const user = await sails.models.auth
        .create({
          email: data.email,
          password: data.password,
        })
        .fetch();
      let OTP = Math.floor(Math.random() * 1000000);
      const accessToken = jwToken.accessToken({
        id: user.id,
        email: user.email,
        otp: OTP,
      });

      const refreshToken = jwToken.refreshToken({
        id: user.id,
        email: user.email,
      });
      // res.cookie("refreshToken", refreshToken, {
      //   httpOnly: true,
      //   secure: false,
      //   path: "/",
      //   sameSite: "strict",
      // });
      const tokenTB = await sails.models.token.create({
        idUser: user.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: process.env.EXPIRESIN_ACCESSTOKEN,
      });
      EmailService.sendWelcomeMail(user, OTP);

      return res.status(200).json({
        success: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  },

  login: async (req, res) => {
    try {
      const data = req.body;

      if (!data.email || !data.password)
        return res.badRequest("Email and password required");
      const user = await sails.models.auth.findOne({ email: data.email });

      if (!user) return res.notFound();

      if (user.active) {
        Auth.comparePassword(data.password, user.password)
          .then(async () => {
            const accessToken = await jwToken.accessToken({
              id: user.id,
              email: user.email,
            });
            const refreshToken = await jwToken.refreshToken({
              id: user.id,
              email: user.email,
            });
            const findToken = await sails.models.token.findOne({
              idUser: user.id,
            });
            if (!findToken) {
              return res.status(404).json("account does not exist");
            }
            const newToken = {
              accessToken: accessToken,
              refreshToken: refreshToken,
              expiresIn: process.env.EXPIRESIN_ACCESSTOKEN,
            };
            const updateToken = await sails.models.token
              .update({ id: findToken.id })
              .set(newToken);
            // res.cookie("refreshToken", refreshToken, {
            //   httpOnly: true,
            //   secure: false,
            //   path: "/",
            //   sameSite: "strict",
            // });

            return res.status(200).json({
              success: true,
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          })
          .catch((err) => {
            return res.status(404).json({
              success: false,
              error: err,
            });
          });
      } else {
        return res.status(404).json("incorrect email or password");
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.body.data;
      if (!refreshToken) {
        return res.status(401).json("You're not authenticated");
      }
      jwToken.verifyRefreshToken(refreshToken, async (err, user) => {
        if (err) {
          return res.json(401, { err: "Invalid Token!" });
        }
        const findToken = await sails.models.token.findOne({
          idUser: user.id,
          refreshToken: refreshToken,
        });

        if (!findToken) {
          return res.forbidden("Invalid Token");
        }
        const newAccessToken = await jwToken.accessToken({
          id: user.id,
          email: user.email,
        });
        const newRefreshToken = await jwToken.refreshToken({
          id: user.id,
          email: user.email,
        });
        const newToken = {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          expiredAt: process.env.EXPIRED_ACCESS_TOKEN,
        };
        const updateToken = await sails.models.token
          .update({ idUser: user.id })
          .set(newToken);
        // res.cookie("refreshToken", newRefreshToken, {
        //   httpOnly: true,
        //   secure: false,
        //   path: "/",
        //   sameSite: "strict",
        // });
        res.status(200).json({
          success: true,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      });
    } catch (err) {
      return res.severError(err);
    }
  },
};

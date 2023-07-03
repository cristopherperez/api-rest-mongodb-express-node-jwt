import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
const router = express.Router();

router.post(
  "/register",
  [
    body("email", "formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    body("password", "formato de password incorrecto").custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("No coinciden las passwords");
        }
        return value;
      }
    ),
  ],
  validationResultExpress,
  register
);
router.post(
  "/login",
  [
    body("email", "formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

export default router;
// import {
//   infoUser,
//   login,
//   register,
//   refreshToken,
//   logout,
// } from "../controllers/auth.controller.js";
// import { validationResultExpress } from "../middlewares/validationResultExpress.js";
// import { requireToken } from "../middlewares/requireToken.js";
// import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
// const router = Router();

// router.post(
//   "/register",
//   [
//     body("email", "Formato de email incorrecto")
//       .trim()
//       .isEmail()
//       .normalizeEmail(),
//     body("password", "Mínimo 6 caracteres").trim().isLength({ min: 6 }),
//     body("password", "Formato de password incorrecto").custom(
//       (value, { req }) => {
//         if (value !== req.body.repassword) {
//           throw new Error("No coinciden las passwords");
//         }
//         return value;
//       }
//     ),
//   ],
//   validationResultExpress,
//   register
// );
// router.post(
//   "/login",
//   [
//     body("email", "Formato de email incorrecto")
//       .trim()
//       .isEmail()
//       .normalizeEmail(),
//     body("password", "Mínimo 6 caracteres").trim().isLength({ min: 6 }),
//   ],
//   validationResultExpress,
//   login
// );

// router.get("/protected", requireToken, infoUser);
// router.get("/refresh", requireRefreshToken, refreshToken);
// router.get("/logout", logout);

// export default router;

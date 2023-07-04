import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
// import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "No existe este usuario" });

    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ error: "Password incorrecto" });

    const token = jwt.sign({uid: user.id}, process.env.JWT_SECRET)

    res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// export const register = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     //alternativa dos de validacion buscando por email
//     let user = await User.findOne({ email });
//     if (user) throw { code: 11000 }; //THROW hace q el codigo salte al catch, es decir vaya al error.
//     // termina alternativa dos de validacion

//     user = new User({ email, password });
//     await user.save();

//     // generar token con JWT

//     return res.status(201).json({ ok: true });
//   } catch (error) {
//     //alternativa uno de validacion por defecto mongoose
//     console.log(error);
//     if (error.code === 11000) {
//       return res.status(400).json({ error: "Ya existe este usuario" });
//     }
//     //termina alternativa uno de validacion
//     return res.status(500).json({ error: "error de servidor" });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     let user = await User.findOne({ email });

//     if (!user) return res.status(403).json({ error: "No existe este usuario" });

//     const respuestaPassword = await user.comparePassword(password);
//     if (!respuestaPassword)
//       return res.status(403).json({ error: "Password incorrecto" });

//     //Generar token con JWT
//     const { token, expiresIn } = generateToken(user.id);
//     generateRefreshToken(user.id, res);

//     return res.json({ token, expiresIn });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "error de servidor" });
//   }
// };

// export const infoUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.uid).lean();
//     return res.json({ email: user.email, uid: user.id });
//   } catch (error) {
//     return res.status(500).json({ error: "error de server" });
//   }
// };

// export const refreshToken = (req, res) => {
//   try {
//     const { token, expiresIn } = generateToken(req.uid);

//     return res.json({ token, expiresIn });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "error de server" });
//   }
// };

// export const logout = (req, res) => {
//   res.clearCookie("refreshToken");
//   res.json({ ok: true });
// };

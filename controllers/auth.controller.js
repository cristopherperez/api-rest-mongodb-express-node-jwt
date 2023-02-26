import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    //alternativa dos de validacion buscando por email
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 }; //THROW hace q el codigo salte al catch, es decir vaya al error.
    // termina alternativa dos de validacion

    user = new User({ email, password });
    await user.save();

    // generar token con JWT

    return res.status(201).json({ ok: true });
  } catch (error) {
    //alternativa uno de validacion por defecto mongoose
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    //termina alternativa uno de validacion
    return res.status(500).json({ error: "error de servidor" });
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

    //Generar token con JWT
    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET);
    return res.json({ ok: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de servidor" });
  }
};

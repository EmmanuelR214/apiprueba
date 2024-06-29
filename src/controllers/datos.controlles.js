import { Coonexion } from "../db.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";
import { CreateAccessToken } from "../libs/jwt.js";


export const verifYToken = async (req, res) => {
  try {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).json(['Unauthorized']);
    }
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json(['Unauthorized']);
      } else {
        return res.json(['Si']);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(['Error del servidor']);
  }
};


export const getDatos = async (req, res) => {
  try {
    const [rows] = await Coonexion.execute("SELECT * FROM usuarios");
    const id = 1
    const token = await CreateAccessToken({id: id})
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7)
    res.cookie('token', token, {expires: expirationDate,sameSite: 'None',secure: true, domain: 'labarbada.store'});
    res.status(200).json(rows)
  } catch (error) {
    console.log(error)
    res.status((500)).json(['error']) 
  }
}

export const PostLogout = (req, res)=>{
  res.cookie('token', "", {
      expires: new Date(0)
  })
  return res.sendStatus(200)
}

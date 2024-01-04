import User from "../models/UserModel.js";
import path from "path";
import fs from "fs";

export const getProfil = async (req, res) => {
  try {
    const response = await User.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProfilById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveProfil = (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const DateOfBirth = req.body.DateOfBirth;
  const gender = req.body.gender;
  const password = req.body.hashPassword;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await User.create({
        name: name,
        email: email,
        phone: phone,
        DateOfBirth: DateOfBirth,
        gender: gender,
        password: password,
        url: url,
      });
      res.status(201).json({ msg: "Profil Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateProfil = async (req, res) => {
  const profil = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!profil) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = profil.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${profil.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const DateOfBirth = req.body.DateOfBirth;
  const gender = req.body.gender;
  const password = req.body.hashPassword;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await User.update(
      {
        name: name,
        email: email,
        phone: phone,
        DateOfBirth: DateOfBirth,
        gender: gender,
        password: password,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Profil Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProfil = async (req, res) => {
  const profil = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!profil) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${profil.image}`;
    fs.unlinkSync(filepath);
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Profil Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

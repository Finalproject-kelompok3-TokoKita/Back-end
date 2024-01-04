import express from "express";
import { getProfil, getProfilById, saveProfil, updateProfil, deleteProfil } from "../controller/ProfilController.js";

const router = express.Router();

router.get("/profil", getProfil);
router.get("/profil/:id", getProfilById);
router.post("/profil", saveProfil);
router.patch("/profil/:id", updateProfil);
router.delete("/profil/:id", deleteProfil);

export default router;

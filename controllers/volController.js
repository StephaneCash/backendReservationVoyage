const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem, Op } = require('sequelize');

const getAllVols = async (req, res) => {
    try {
        let vols = await db.vols.findAll();
        res.status(200).json(vols);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

const createVol = async (req, res) => {
    try {
        const { villeDest, villeDepart, heureDepart, heureArrivee, maxHeure, prix, agence, agenceIdId } = req.body;
        if (req.file) {
            let newVol = await db.vols.create({
                villeDest: villeDest,
                villeDepart: villeDepart,
                heureDepart: heureDepart,
                heureArrivee: heureArrivee,
                maxHeure: maxHeure,
                prix: prix,
                agence: agence,
                agenceIdId: agenceIdId,
                url: `api/${req.file.path}`
            });
            res.status(201).json({ message: "Vol créé avec succès", data: newVol })
        } else {
            let newVol = await db.vols.create(req.body);
            res.status(201).json({ message: "Vol créé avec succès", data: newVol })
        }
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(400).json({
                message: err && err.errors ? err.errors.map(e => e.message) : err
            });
        }
        else if (err instanceof UniqueConstraintError) {
            return res.status(400).json({
                message: err && err.errors ? err.errors.map(e => e.message) : err
            });
        }
        else if (err instanceof ValidationErrorItem) {
            return res.status(400).json({
                message: err && err.errors ? err.errors.map(e => e.message) : err
            });
        }
        else {
            return res.status(500).json({ message: err })
        }
    }
};

const getOneVol = async (req, res) => {
    try {
        let id = req.params.id;
        let VolFind = await db.vols.findOne({ where: { id: id } });

        if (VolFind) {
            res.status(200).json({ message: "Vol trouvé avec succès", data: VolFind });
        } else {
            res.status(404).json({ message: "Vol non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const volUpdated = async (req, res) => {
    try {
        let id = req.params.id;
        let findVol = await db.vols.findOne({ where: { id: id } });

        if (findVol) {
            const { villeDest, villeDepart, heureDepart, heureArrivee, maxHeure, prix, agence } = req.body;

            if (req.file) {
                let updateVol = await findVol.update({
                    villeDest: villeDest,
                    villeDepart: villeDepart,
                    heureDepart: heureDepart,
                    heureArrivee: heureArrivee,
                    maxHeure: maxHeure,
                    agence: agence,
                    prix: prix,
                    url: `api/${req.file.path}`
                }, {
                    where: { id: id }
                });
                if (updateVol) {
                    let findVolId = await db.vols.findOne({ where: { id: id } });
                    res.status(200).json({ message: "Vol a été modifié avec succès", data: findVolId });
                }
            } else {
                let updateVol = await findVol.update(req.body, {
                    where: { id: id }
                });
                if (updateVol) {
                    let findVol = await db.vols.findOne({ where: { id: id } });
                    res.status(200).json({ message: "Vol a été modifié avec succès", data: findVol });
                }
            }
        } else {
            res.status(404).json({ message: "Vol non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteVol = async (req, res) => {
    try {
        let id = req.params.id;
        let findVol = await db.vols.findOne({ where: { id: id } });

        if (findVol) {
            let VolDel = await db.vols.destroy({ where: { id: id } });
            if (VolDel === 1) {
                res.status(200).json({ message: "Vol a été supprimé avec succès", data: findVol });
            }
        } else {
            res.status(404).json({ message: "Vol non trouvé avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllVols,
    createVol,
    getOneVol,
    volUpdated,
    deleteVol
}


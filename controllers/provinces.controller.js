const { provinces } = require('../models');
const { DataNotFoundError, BadRequestError } = require('../utils/errors');

const getAll = async (req, res, next) => {
    try {
        const resultProvinces = await provinces.findAll();
        return res.status(200).json({
            message: 'Succesfully',
            data: resultProvinces,
        });
    } catch (err) {
        next(err)
    }
};

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const resultProvince = await provinces.findOne({
            where: {
                id: id,
            }
        });

        if (!resultProvince) {
            throw new DataNotFoundError('Provinsi yang anda cari tidak ditemukan!')
        } 

        return res.status(200).json({
            message: 'Scucessfully',
            data: resultProvince,
        })
    } catch (err) {
        next(err)
    }
}

const createOne = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            throw new BadRequestError('Pastikan field name tidak kosong!');
        }

        const province = await provinces.create({
            name,
        });

        return res.status(201).json({
            message: 'Created',
            data: province
        })
    } catch (err) {
        next(err);
    }
}

const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            throw new BadRequestError('Pastikan field name tidak kosong!');
        }
        
        const province = await provinces.findOne({
            where: {
                id,
            }
        });

        if (!province) {
            throw new DataNotFoundError('Data provinsi yang anda inginkan tidak ditemukan!');
        }

        province.name = name;
        const resultProvince = await province.save();


        return res.status(200).json({
            message: 'Updated',
            data: resultProvince
        })
    } catch (err) {
        next(err);
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const province = await provinces.findOne({
            where: {
                id,
            }
        });

        if (!province) {
            throw new DataNotFoundError('Data provinsi yang anda inginkan tidak ditemukan!');
        }

        await province.destroy();

        return res.status(200).json({
            message: 'Updated',
            data: province
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}
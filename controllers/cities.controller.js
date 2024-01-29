const { cities, provinces } = require('../models');
const { DataNotFoundError, BadRequestError } = require('../utils/errors');

const getAll = async (req, res, next) => {
    try {
        const resultCities = await cities.findAll({
            include: [provinces]
        });
        return res.status(200).json({
            message: 'Succesfully',
            data: resultCities,
        });
    } catch (err) {
        next(err);
    }
};

// const getByProvince = async (req, res, next) => {
//     try {
//         const id = req.params.id;

//         const resultCities = await provinces.findOne({
//             where: {
//                 id: id,
//             },
//             include: [cities],
//         });

//         return res.status(200).json({
//             message: "Scucessfully",
//             data: resultCities,
//         });
//     } catch (err) {
//         next(err);
//     }
// };

const getByProvince = async (req, res, next) => {
    try {
        const { id } = req.params;
        const resultCities = await cities.findAll({
            where: {
                provinceId: id,
            },
            include: [provinces]
        });

        if (!resultCities) {
            throw new DataNotFoundError('Kota yang anda cari tidak ditemukan!')
        }

        return res.status(200).json({
            message: 'Scucessfully',
            data: resultCities,
        })
    } catch (err) {
        next(err)
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const resultCities = await cities.findOne({
            where: {
                id: id,
            },
            include: [provinces]
        });

        if (!resultCities) {
            throw new DataNotFoundError('Kota yang anda cari tidak ditemukan!')
        }

        return res.status(200).json({
            message: 'Scucessfully',
            data: resultCities,
        })
    } catch (err) {
        next(err)
    }
}

const createOne = async (req, res, next) => {
    try {
        const { name, provinceId } = req.body;

        if (!name || !provinceId) {
            throw new BadRequestError('Pastikan name dan province Id tidak kosong!');
        }

        const province = await provinces.findOne({
            where: {
                id: provinceId,
            }
        });

        if (!province) {
            throw new BadRequestError('Pastikan province id valid!');
        }

        const newCity = await cities.create({
            name,
            provinceId
        });

        const city = await cities.findOne({
            where: {
                id: newCity.id,
            },
            include: [provinces]
        })

        return res.status(201).json({
            message: 'Created',
            data: city
        });
    } catch (err) {
        next(err);
    }
}

const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, provinceId } = req.body;

        if (!name || !provinceId) {
            throw new BadRequestError('Pastikan name dan province Id tidak kosong!');
        }

        const city = await cities.findOne({
            where: {
                id: id,
            }
        });

        if (!city) {
            throw new DataNotFoundError('Kota yang anda cari tidak ditemukan!')
        }

        const province = await provinces.findOne({
            where: {
                id: provinceId,
            }
        });

        if (!province) {
            throw new BadRequestError('Pastikan province id valid!');
        }

        city.name = name;
        city.provinceId = provinceId;
        await city.save();

        const resultCities = await cities.findOne({
            include: [provinces],
            where: {
                id
            }
        })

        return res.status(200).json({
            message: 'Updated',
            data: resultCities
        })
    } catch (err) {
        next(err);
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        const city = await cities.findOne({
            where: {
                id,
            },
            include: [provinces]
        });

        if (!city) {
            throw new DataNotFoundError('Kota yang anda inginkan tidak ditemukan!');
        }

        await city.destroy();

        return res.status(200).json({
            message: 'Updated',
            data: city
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
    deleteOne,
    getByProvince,
}
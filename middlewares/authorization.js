const { store } = require("../models");
const { BadRequestError } = require("../utils/errors");

const isUserOwnStore = async (userId, storeId) => {
  try {
    const Store = await store.findOne({
      where: {
        id: storeId,
        userId: userId,
      },
    });

    return !!Store;
  } catch (error) {
    throw error;
  }
};

module.exports = isUserOwnStore;

const productServices = {};
const db = require("../db");

productServices.list = async function (params) {
  let query = ``;
  const table = `Products`;
  const columns = [
    `productId`,
    `productName`,
    `description`,
    `price`,
    `currency`,
    `category as categoryId`,
    `subCategory as subCategoryId`,
    `productCode as itemCode`,
    `productType as itemType`,
    `images as productImageName`,
    `imagesUrl as productImageURL`,
    `moreDetails`,
    `features`,
    `benefits`,
    `specifications`,
    `organizationId`,
    `status`,
    `createdAt`,
    `updatedAt`,
    `brandName`,
    `pricingType`,
    `discount`,
    `stock`,
    `sku`,
    `availableInCountries`,
    `verifiedStatus`,
  ];
  const { pageSize, currentPage, orderBy, orderDir, searchBy = "", searchFields = [] } = params;

  const offset = pageSize * (currentPage - 1);

  query += `select ${columns} from ${table}`;
  if (searchBy) {
    query += ` where `;
    for (let index in searchFields) {
      if (index > 0) {
        query += ` and `;
      }
      query += `${searchFields[index]} = "${searchBy}"`;
    }
  }

  query += ` limit ${pageSize} offset ${offset} order by ${orderBy} ${orderDir}`;
  const result = await db.query(query);
  return result[0];
};
module.exports = productServices;

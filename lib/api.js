const Airtable = require("airtable");

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base("products");

export const getAllProducts = async () => {
  const data = await table
    .select({
      view: "Grid view",
    })
    .firstPage();
  return data.map((record) => {
    return { id: record.id, ...record.fields };
  });
};

export const getProductsByUserSub = async (sub) => {
  const data = await table
    .select({
      filterByFormula: `Sub = "${sub}"`,
    })
    .firstPage();
  return data.map((record) => {
    return { id: record.id, ...record.fields };
  });
};

export const getProductById = async (id) => {
  const data = await table.find(id);
  return { id: data.id, ...data.fields };
};

export const updateProduct = async ({ id, name, link, description }) => {
  const data = await table.update(
    id,
    {
      Name: name,
      Description: description,
      Link: link,
    },

    function (err, records) {
      if (err) {
        console.error(err);
      }
    }
  );
};
export const getVotesByProductId = async (productId) => {
  const data = await base("votes")
    .select({
      view: "Grid view",
      filterByFormula: `ProductId = "${productId}"`,
    })
    .firstPage();

    return data.map((vote) => {
    return { id: vote.id, ...vote.fields };
  });
};
export const upvoteProduct = async ({ productId, sub }) => {
  const data = await base("votes").create({
    ProductId: productId,
    Sub: sub,
  });
};

export const downvoteProduct = async ({ id }) => {
  const data = await base("votes").destroy(id);
};
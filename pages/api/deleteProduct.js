import { withApiAuthRequired } from "@auth0/nextjs-auth0";
const cloudinary = require("cloudinary").v2;
var Airtable = require("airtable");

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405);
  }
  const { id, publicId, votesId } = req.body;

  try {
    const deletedProduct = await base("products").destroy(id);
    const deletedVotes = await base("votes").destroy(votesId)

    const deleteImageFromCloudinary = cloudinary.uploader.destroy(
      publicId,
      function (error, result) {
        if (error) {
          console.log(error);
        }
      }
    );
    return res.status(200).json({ msg: "Product Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
});
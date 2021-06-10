import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
const cloudinary = require('cloudinary').v2;
var Airtable = require('airtable');

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);



export const config = {
  api: {
    bodyParser: {
      sizeLimit: "3mb",
    },
  },
};

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const sub = await session.user.sub;

  if (req.method !== "POST") {
    return res.status(405);
  }
  const { name, description, link, uploadImage } = req.body;

  const image = await cloudinary.uploader.upload(
    uploadImage,
    { folder: "product-hunt-clone" },
    (error, result) => {
      if (error) {
        console.error("An error has occured while uploading the image");
      }
      console.log("Image was uploaded successfully");
    }
  );
const public_id = image.public_id;

    base('products').create([
      {
        "fields": {
          "Name": name,
          "Description": description,
          "Link": link,
          "Sub": sub,
          "PublicId": public_id
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
      return  res.status(500).json({ msg: "Something went wrong." });
      }
    });
    return res.status(200).json({ msg: "Product Added" });
  
});
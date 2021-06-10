import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {updateProduct} from "../../lib/api"

export default withApiAuthRequired(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405);
  }
  const { name, description, link, id } = req.body;

  await updateProduct({ id, name, description, link });

  return res.status(200).json({ msg: "Product Updated" });
  
});
import { downvoteProduct } from "../../lib/api";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {

  if (req.method !== "PUT") {
    return res.status(405);
  }
  const { id } = req.body;

  try {
    const downvotedProduct = await downvoteProduct({ id });
    return res.status(200).json({ msg: "Downvoted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
});
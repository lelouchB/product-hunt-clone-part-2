import { upvoteProduct } from "../../lib/api";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const sub = await session.user.sub;

  if (req.method !== "PUT") {
    return res.status(405);
  }
  const { id } = req.body;

  try {
    const upvotedProduct = await upvoteProduct({ productId:id, sub });
    return res.status(200).json({ msg: "Upvoted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
});
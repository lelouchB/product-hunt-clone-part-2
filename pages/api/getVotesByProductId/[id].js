import { getVotesByProductId } from "../../../lib/api";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405);
  }

  const { id } = req.query;

  try {
    const votes = await getVotesByProductId(id );
    return res.status(200).send(votes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
}
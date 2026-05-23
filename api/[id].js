export default async function handler(req, res) {
  try {
    const { id } = req.query;

    const response = await fetch(
      `https://aloula.faulio.com/api/v1.1/channels/${id}/player`
    );

    const data = await response.json();

    const hls = data?.streams?.hls;

    if (!hls) {
      return res.status(404).send("No HLS stream found");
    }

    return res.redirect(302, hls);

  } catch (err) {
    return res.status(500).send(err.toString());
  }
}

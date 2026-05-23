// api/[id].js

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).send("Missing channel ID");
    }

    // API URL
    const apiUrl = `https://aloula.faulio.com/api/v1.1/channels/${id}/player`;

    // Fetch API
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      return res.status(500).send("API request failed");
    }

    const data = await response.json();

    // Get HLS stream
    const hls = data?.streams?.hls;

    if (!hls) {
      return res.status(404).send("HLS stream not found");
    }

    // Redirect to m3u8
    res.writeHead(302, {
      Location: hls
    });

    res.end();

  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { cnic } = req.body;

  if (!cnic) {
    return res.status(400).json({ message: 'CNIC is required' });
  }

  try {
    const response = await fetch('https://fir.punjabpolice.gov.pk/restapi/All_api/checkPersonForHrmis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'okhttp/4.9.1',
        'PSRMS-API-KEY': 'POLICEPOMOBAPP3G4H5U6K8O8P57909V0C2FFD7F',
        'Cookie': 'd1796422_8a25e425=oh3ctth99b0kb1n3q2h69msmt1rhnlo4'
      },
      body: new URLSearchParams({
        user_id: '3858',
        cnic: cnic,
        group_id: '0',
        region_id: '0',
        district_id: ''
      })
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

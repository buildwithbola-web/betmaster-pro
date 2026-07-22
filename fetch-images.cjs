const https = require('https');

const titles = [
  'Jo%C3%A3o_Fonseca',
  'Marc-Andrea_H%C3%BCsler',
  'Tottenham_Hotspur_F.C.',
  'Milton_Keynes_Dons_F.C.',
  'Minnesota_Lynx',
  'Seattle_Storm',
  'Connecticut_Sun',
  'Indiana_Fever'
].join('|');

const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${titles}&prop=pageimages&format=json&pithumbsize=200`;

https.get(url, { headers: { 'User-Agent': 'BetMasterPro/1.0 (test@test.com)' } }, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    const pages = json.query.pages;
    for (const id in pages) {
      const page = pages[id];
      console.log(`${page.title}: ${page.thumbnail ? page.thumbnail.source : 'No image'}`);
    }
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});

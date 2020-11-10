const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

// Init App
const app = express();

app.get('/', (req, res) => {
    const data = [];

    request(
        'https://results.eci.gov.in/ACTRENDS2020/partywiseresult-S04.htm',
        (err, response, html) => {
            if (err) {
                return console.log(err);
            }

            const $ = cheerio.load(html);

            $('#div1 tbody tr').each((i, el) => {
                if (i > 2) {
                    const tr = $(el);

                    const tds = $(tr.children('td'));

                    const localData = {};

                    tds.each((index, element) => {
                        const td = $(element);

                        if (index == 0) {
                            localData.partyName = td.text();
                        }

                        if (index == 1) {
                            localData.won = td.text();
                        }

                        if (index == 2) {
                            localData.lead = td.text();
                        }

                        if (index == 2) {
                            localData.total = td.text();
                        }
                    });

                    data.push(localData);
                }
            });

            res.json(data);
        }
    );
});

// PORT
const PORT = process.env.PORT || 8000;

// Listen App
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

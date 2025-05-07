const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const inputCsvPath = path.join(__dirname, "csvs", "IMS461.csv");

// Function to generate HTML for each row
function generateHtmlRow(row) {
  const title = row[6];
  const names = row[5];
  const description = row[7];
  const sites = row[8];
  const pages = row[9];

  let html = `<div>\n`;
  html += `  <h2>${title}</h2>\n`;
  html += `  <h3>${names}</h3>\n`;
  html += `  <p>${description}</p>\n`;

  if (sites) {
    html += `  <h4>Personal/Project Websites</h4>\n`;
    html += `  <ul>\n`;
    sites.split(",").forEach((link) => {
      html += `    <li><a href="${link.trim()}" target="_blank">${link.trim()}</a></li>\n`;
    });
    html += `  </ul>\n`;
  }

  if (pages) {
    html += `  <h4>Steam/itch.io Pages</h4>\n`;
    html += `  <ul>\n`;
    pages.split(",").forEach((link) => {
      html += `    <li><a href="${link.trim()}" target="_blank">${link.trim()}</a></li>\n`;
    });
    html += `  </ul>\n`;
  }

  html += `</div>\n`;
  html += `<hr>\n`; // Add horizontal rule after each row
  return html;
}

// Read the CSV file and generate HTML
function processCsv() {
  const rows = [];
  fs.createReadStream(inputCsvPath)
    .pipe(csv({ headers: false }))
    .on("data", (row) => {
      rows.push(row);
    })
    .on("end", () => {
      rows.forEach((row) => {
        const html = generateHtmlRow(row);
        console.log(html);
      });
    });
}

processCsv();

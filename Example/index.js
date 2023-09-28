const wkhtmltopdf = require("wkhtmltopdf");
const fs = require("fs");

exports.handler = async (event) => {
  const html = "<h1>Hello World</h1>";

  // file path to store the generated pdf
  const outputFile = "/tmp/output.pdf";

  await new Promise((resolve, reject) => {
    wkhtmltopdf(html, {
      marginTop: 16,
      marginBottom: 16,
      marginLeft: 20,
      marginRight: 20,
      userStyleSheet: "style.css", // Can attach a CSS file to style the HTML
      allow: ["fonts"],
    })
      .pipe(fs.createWriteStream(outputFile))
      .on("ready", () => console.log("Generating pdf..."))
      .on("finish", () => {
        console.log("PDF generated successfully");
      })
      .on("error", (err) => {
        console.error("Error generating PDF:", err);
      });
  });

  // Read the generated pdf file and return it as a response OR upload it to S3
};

/**
 * /licenses.js
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 14.09.2024
 *
 */

const fs = require('fs');
const path = require('path');

(async () => {
    const stats = await fetch("https://codeup.space/_internal/api/app/stats");
    const statsJson = await stats.json();

    const pkgs = statsJson.packages.packages;

    /*let x = "\\documentclass[main.tex]{subfiles}\n" +
        "\\begin{document}\n" +
        "\\section{Open-Source Lizenzen}\n" +
        "\\begin{tabularx}{\\textwidth}{|X|X|X|}\n" +
        "\\hline\n" +
        "\\textbf{Paket} & \\textbf{Version} & \\textbf{Lizenz} \\\\ \\hline\n";
    */
    let x = "\\documentclass[main.tex]{subfiles}\n" +
        "\\begin{document}\n" +
        "\\section{Open-Source Lizenzen}\n" +
        "\\begin{itemize}\n"
    for (const pkg of pkgs) {
        if (pkg.name.startsWith("@codeup")) {
            continue;
        }
        //x += `${pkg.name} & ${pkg.version} & ${pkg.license} \\\\ \\hline\n`;
        x += `\\item ${pkg.name} (${pkg.version}) - ${pkg.license}\n`;
    }

    x += "\\end{itemize}\n" +
        "\\end{document}";

    x = x.replaceAll(/_/g, "\\_");
    x = x.replaceAll(/\*/g, "\\*");

    fs.writeFileSync(path.join(__dirname, "src", "licenses.tex"), x);
})();

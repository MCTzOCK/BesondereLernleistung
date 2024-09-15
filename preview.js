/**
 * /preview.js
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 24.08.2024
 *
 */

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function runTex() {
    execSync("pdflatex -output-directory ../pdf -job-name CodeUp main.tex", {
        cwd: path.join(__dirname, "src"),
        stdio: "inherit"
    })
}
function runBiber() {
    execSync("biber ../pdf/CodeUp", {
        cwd: path.join(__dirname, "src"),
        stdio: "inherit"
    })
}

runTex();
runTex();
runBiber();
runTex();

if(fs.existsSync(path.join(__dirname, "CodeUp.pdf"))) {
    fs.unlinkSync(path.join(__dirname, "CodeUp.pdf"));
}

fs.copyFileSync(path.join(__dirname, "pdf", "CodeUp.pdf"), path.join(__dirname, "CodeUp.pdf"));

/*
execSync("open -a Preview.app ../pdf/CodeUp.pdf", {
    cwd: path.join(__dirname, "src"),
    stdio: "inherit"
})
 */

#!/usr/bin/env node
/**
 * Satori (which renders the link-preview card) cannot parse variable fonts,
 * and Google no longer ships a static Playfair Display. This pins the weight
 * axis of the variable font already in the repo to produce a static instance.
 *
 * Only needs re-running if the source font changes:
 *   python3 -m pip install fonttools && node scripts/make-static-font.mjs
 */
import { execFileSync } from "node:child_process";

const py = `
from fontTools import ttLib
from fontTools.varLib import instancer
src = "public/assets/fonts/PlayfairDisplay-VariableFont_wght.ttf"
font = ttLib.TTFont(src)
inst = instancer.instantiateVariableFont(font, {"wght": 800}, inplace=False)
inst.save("public/assets/fonts/PlayfairDisplay-ExtraBold.ttf")
print("wrote public/assets/fonts/PlayfairDisplay-ExtraBold.ttf")
`;

execFileSync("python3", ["-c", py], { stdio: "inherit" });

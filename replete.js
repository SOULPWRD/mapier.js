/*jslint node unordered*/

import run from "https://deno.land/x/replete@0.0.25/run.js";
import ecomcon from "./ecomcon.js";

run({
    browser_port: 3000,
    which_node: "node",
    command(message) {
        message.source = ecomcon(message.source, ["demo"]);
        return message;
    }
});
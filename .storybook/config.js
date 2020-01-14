// automatically import all files ending in *.stories.js
import { configure } from "@storybook/vue";

const req = require.context("../tests/stories", true, /\.stories\.js$/); // <- import all the stories at once

configure(req, module);

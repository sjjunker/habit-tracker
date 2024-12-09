import { resolve } from "path";
import { defineConfig } from "vite";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    root: "src/",

    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                habitDetailsView: resolve(__dirname, "src/habitDetailView/index.html"),
                calendar: "node_modules/simple-jscalendar/source/jsCalendar.js",
                calendarStyling: "node_modules/simple-jscalendar/source/jsCalendar.css",
            },

        },
    },
});
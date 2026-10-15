import { createWorker } from "tesseract.js";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import {
    createCanvas,
    DOMMatrix,
    ImageData,
    Path2D
} from "@napi-rs/canvas";
import path from "path";
import { pathToFileURL } from "url";

globalThis.DOMMatrix = DOMMatrix;
globalThis.ImageData = ImageData;
globalThis.Path2D = Path2D;


// IMAGE OCR
export const extractTextFromImage = async (fileBuffer) => {

    const worker = await createWorker("eng");

    try {

        const { data } = await worker.recognize(fileBuffer);

        return data.text;

    } finally {

        await worker.terminate();

    }
};


// PDF TEXT + OCR
export const extractTextFromPDF = async (fileBuffer) => {

    const worker = await createWorker("eng");

    try {
         const standardFontPath = path.join(
            process.cwd(),
            "node_modules/pdfjs-dist/standard_fonts"
        );

        const pdf = await getDocument({
            data: new Uint8Array(fileBuffer),

             standardFontDataUrl:
                pathToFileURL(
                    standardFontPath + path.sep
                ).href

        }).promise;


        let completeText = "";

        console.log(`PDF has ${pdf.numPages} page(s)`);


        for (
            let pageNumber = 1;
            pageNumber <= pdf.numPages;
            pageNumber++
        ) {

            console.log(`Processing page ${pageNumber}`);


            const page = await pdf.getPage(pageNumber);


            // --------------------------------
            // 1. TRY DIRECT PDF TEXT EXTRACTION
            // --------------------------------

            const textContent = await page.getTextContent();

            const pageText = textContent.items
                .map(item => item.str)
                .join(" ");

            console.log("DIRECT PDF TEXT:");
            console.log(pageText);


            if (pageText.trim().length > 30) {

                completeText += `\n${pageText}`;

                continue;
            }


            // --------------------------------
            // 2. FALLBACK TO OCR
            // --------------------------------

            console.log("Direct text insufficient. Starting OCR...");


            const scale = 4;

            const viewport = page.getViewport({
                scale
            });


            const canvas = createCanvas(
                Math.ceil(viewport.width),
                Math.ceil(viewport.height)
            );


            const context = canvas.getContext("2d");


            await page.render({
                canvasContext: context,
                viewport
            }).promise;


            const imageBuffer =
                canvas.toBuffer("image/png");


            const { data } =
                await worker.recognize(imageBuffer);


            console.log("OCR PAGE RESULT:");
            console.log(data.text);


            completeText += `\n${data.text}`;
        }


        return completeText;


    } finally {

        await worker.terminate();

    }
};
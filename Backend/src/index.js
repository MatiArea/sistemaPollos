import app from "./app";
import "@babel/polyfill";

async function main() {
    await app.listen(4200);
    console.log('Server on port 4200');
}

main();
import app from "./app";
import "@babel/polyfill";

async function main() {
    const port = 4000
    await app.listen(port);
    console.log('Server on port ',port);
}

main();
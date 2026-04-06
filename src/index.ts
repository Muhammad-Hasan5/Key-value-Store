import app from "./app.js";

console.log("Hello key-value store");

process.loadEnvFile();

const port: string | undefined = process.env.PORT;

if (!port) {
    console.log("Port is not defined");
    process.exit(1);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



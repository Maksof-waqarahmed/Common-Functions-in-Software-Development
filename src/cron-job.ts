import cron from "node-cron";

console.log("Cron Job Started");

cron.schedule("*/5 * * * *", async () => {
    try {
        console.log("Cron Job Running at:", new Date().toLocaleString());
        await //action what you need
            console.log("Task Completed");
    } catch (error) {
        console.error("Cron Job Failed:", error);
    }
});


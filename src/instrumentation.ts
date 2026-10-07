export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.ENABLE_JOBS === "true") {
    const { startJobs } = await import("./lib/jobs");
    startJobs();
  }
}

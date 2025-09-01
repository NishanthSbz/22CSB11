import axios from "axios";

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

const STACKS = ["backend", "frontend"];
const LEVELS = ["debug", "info", "warn", "error", "fatal"];
const BACKEND_PACKAGES = ["cache", "controller", "cron job", "db", "domain", "handler", "repository", "route", "service"];
const FRONTEND_PACKAGES = ["api", "component", "hook", "page", "state", "style"];
const SHARED_PACKAGES = ["auth", "config", "middleware", "utils"];

/**
 * @param {string} stack - backend | frontend
 * @param {string} level - debug | info | warn | error | fatal
 * @param {string} pkg   - valid package name
 * @param {string} message - descriptive log message
 */
export async function Log(stack, level, pkg, message) {
  try {
    if (!STACKS.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
    if (!LEVELS.includes(level)) throw new Error(`Invalid level: ${level}`);

    const validPackages =
      stack === "backend"
        ? [...BACKEND_PACKAGES, ...SHARED_PACKAGES]
        : [...FRONTEND_PACKAGES, ...SHARED_PACKAGES];

    if (!validPackages.includes(pkg))
      throw new Error(`Invalid package '${pkg}' for stack '${stack}'`);

    const logEntry = { stack, level, package: pkg, message };

    const response = await axios.post(LOG_API_URL, logEntry, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Logging failed:", error.message);
    return { error: true, message: error.message };
  }
}

// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
    dsn: "https://b8795b28c5b417d888f62ba1ef4ce23c@o4512028727115776.ingest.us.sentry.io/4512028823519232",
    integrations: [
        nodeProfilingIntegration(),
        Sentry.mongooseIntegration()

    ],
    dataCollection: {
        // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
        // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#dataCollection
        // userInfo: false,
        // httpBodies: [],
    },

});
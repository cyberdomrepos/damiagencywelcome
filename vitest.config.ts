import { defineConfig } from "vitest/config"; // vitest.config.ts

// https://vitest.dev/config/
export default defineConfig({ //    
    // Vitest configuration
    test: { // Test configuration
        environment: "node", // Use Node.js environment
        globals: true, // Enable global variables like 'describe', 'it', etc.
        coverage: { reporter: ['text', 'lcov'] }, // Code coverage reporters
    }
});
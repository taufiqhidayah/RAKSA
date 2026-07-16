import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/core/**/*.ts"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/core": path.resolve(__dirname, "./src/core"),
      "@/infrastructure": path.resolve(__dirname, "./src/infrastructure"),
      "@/presentation": path.resolve(__dirname, "./src/presentation"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
    },
  },
});

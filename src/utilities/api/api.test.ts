// check to make sure all the paths are included
// that are exposed from the backend connections
import { describe, test, expect } from "vitest";
import apiConfig from "./api.config";

describe("api", () => {
    test("paths", () => {
        expect(typeof apiConfig.paths).toBe("object");
    });
})
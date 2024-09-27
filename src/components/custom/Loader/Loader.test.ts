import { describe, it, expect } from "vitest";
import Loader from ".";

describe("Loader", () => {
    it("should render", () => {
        expect(typeof Loader).toBe("function");
    });
});
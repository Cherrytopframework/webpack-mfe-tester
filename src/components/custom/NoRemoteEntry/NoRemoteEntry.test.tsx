import { describe, it, expect } from "vitest";
import NoRemoteEntry from ".";

describe("NoRemoteEntry", () => {
    it("should render", () => {
        expect(typeof NoRemoteEntry).toBe("function");
    });
});
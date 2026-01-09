// src/helpers/datetime-helpers.test.mjs
import test from "node:test";
import assert from "node:assert/strict";

// Note: To run this directly with node, you'll need to point to the JS version
// or use a loader. If you just want to see the logic:
import { convertUtcToAppStdDateFormat } from "./datetime-helpers.js";

// We use `async` here so that we can use `await` with `t.test`, allowing us to structure nested tests in a sequential way,
// especially if any subtests involve asynchronous operations in the future.
test("Date Formatting Helper", async (t) => {
  await t.test("converts UTC to January 8, 2026", () => {
    const input = "2026-01-08T16:00:00.000Z";
    const expected = "January 8, 2026";
    assert.equal(convertUtcToAppStdDateFormat(input), expected);
  });

  await t.test("handles different months correctly", () => {
    assert.equal(
      convertUtcToAppStdDateFormat("2025-12-25T00:00:00.000Z"),
      "December 25, 2025"
    );
  });

  await t.test("returns Invalid Date for bad strings", () => {
    // Current implementation returns "Invalid Date" via Date object
    assert.equal(convertUtcToAppStdDateFormat("broken-date"), "Invalid Date");
  });
});

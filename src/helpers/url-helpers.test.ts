import test from "node:test";
import assert from "node:assert/strict";
import { isValidFeedUrl } from "./url-helpers";

test("isValidFeedUrl", async (t) => {
  await t.test("returns true for valid https URL", () => {
    assert.equal(isValidFeedUrl("https://example.com/feed"), true);
  });

  await t.test("returns true for valid http URL", () => {
    assert.equal(isValidFeedUrl("http://example.com/feed"), true);
  });

  await t.test("returns true for valid http URL", () => {
    assert.equal(isValidFeedUrl("http://example.com"), true);
  });

  await t.test("returns true for URL with leading/trailing whitespace", () => {
    assert.equal(isValidFeedUrl("  https://example.com/feed  "), true);
  });

  await t.test("returns false for empty string", () => {
    assert.equal(isValidFeedUrl(""), false);
  });

  await t.test("returns false for whitespace-only string", () => {
    assert.equal(isValidFeedUrl("   "), false);
  });

  await t.test("returns false for non-http(s) protocol (ftp)", () => {
    assert.equal(isValidFeedUrl("ftp://example.com/feed"), false);
  });

  await t.test("returns false for non-http(s) protocol (javascript)", () => {
    assert.equal(isValidFeedUrl("javascript:alert(1)"), false);
  });

  await t.test("returns false for malformed URL", () => {
    assert.equal(isValidFeedUrl("not-a-url"), false);
  });

  await t.test("returns false for non-string input (runtime guard)", () => {
    assert.equal(isValidFeedUrl(null as unknown as string), false);
    assert.equal(isValidFeedUrl(undefined as unknown as string), false);
  });
});

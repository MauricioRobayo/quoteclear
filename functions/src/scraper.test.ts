import {
  getPreviousThursday,
  formatDate,
  removeEnclosingQuotationMarks,
} from "./scraper";

describe("getPreviousThursday", () => {
  const thursday = new Date("2021-09-30");
  const dates = [
    new Date("2021-09-30"),
    new Date("2021-10-01"),
    new Date("2021-10-02"),
    new Date("2021-10-03"),
    new Date("2021-10-04"),
    new Date("2021-10-05"),
    new Date("2021-10-06"),
  ];
  it.each(dates)("should return the previous thursday for %p", (date) => {
    expect(getPreviousThursday(date).getTime()).toBe(thursday.getTime());
  });
});

describe("formatDate", () => {
  it("should return september-2-2021", () => {
    expect(formatDate(new Date("2021-09-02"))).toBe("september-2-2021");
  });
});

describe.only("removeEnclosingQuotes", () => {
  const cases = [
    ["hello, world!", "hello, world!"],
    ['"hello, world!"', "hello, world!"],
    ["“hello, world!”", "hello, world!"],
    ["‘hello, world!’", "hello, world!"],
    ["hello, “world!”", "hello, “world!”"],
    ["“hello”, world!", "“hello”, world!"],
    ['“hello, "world!"”', 'hello, "world!"'],
    ['"hello, "world!""', 'hello, "world!"'],
  ];
  it.each(cases)(
    "should remove enclosing quotation marks from %p",
    (text, expected) => {
      expect(removeEnclosingQuotationMarks(text)).toBe(expected);
    }
  );
});

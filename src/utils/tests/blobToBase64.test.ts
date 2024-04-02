import { blobToBase64 } from "../blobToBase64";

describe("blobToBase64", () => {
  it("should convert a blob to base64", async () => {
    const blob = new Blob(["hello world"], { type: "text/plain" });
    const base64 = await blobToBase64(blob);

    expect(base64).toBe("data:text/plain;base64,aGVsbG8gd29ybGQ=");
  });
});

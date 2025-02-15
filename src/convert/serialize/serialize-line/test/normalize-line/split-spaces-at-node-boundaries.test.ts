import { normalizeLine } from "../../normalize-line"

describe("normalize line spaces", () => {
  describe("split spaces between words", () => {
    it("should normalize space on right of word", async () => {
      const nodes = normalizeLine([{ text: "alpha " }, { text: "bravo" }])
      expect(nodes).toEqual([
        { text: "alpha" },
        { text: " " },
        { text: "bravo" },
      ])
    })
    it("should normalize space on left of word", async () => {
      const nodes = normalizeLine([{ text: "alpha" }, { text: " bravo" }])
      expect(nodes).toEqual([
        { text: "alpha" },
        { text: " " },
        { text: "bravo" },
      ])
    })
    it("should normalize spaces on left and right of word", async () => {
      const nodes = normalizeLine([{ text: "alpha " }, { text: " bravo" }])
      expect(nodes).toEqual([
        { text: "alpha" },
        { text: "  " },
        { text: "bravo" },
      ])
    })
  })

  describe("don't split spaces in the middle of a word", () => {
    it("should not normalize boundaries in the middle of a word", async () => {
      const nodes = normalizeLine([
        { text: "alpha b", bold: true },
        { text: "rav" },
        { text: "o charlie", italic: true },
      ])
      expect(nodes).toEqual([
        { text: "alpha b", bold: true },
        { text: "rav" },
        { text: "o charlie", italic: true },
      ])
    })
  })

  describe("don't split spaces in inline code", () => {
    const nodes = normalizeLine([
      { text: "alpha ", bold: true },
      { text: " bravo ", code: true },
      { text: " charlie", italic: true },
    ])
    expect(nodes).toEqual([
      { text: "alpha", bold: true },
      { text: " " },
      { text: " bravo ", code: true },
      { text: " " },
      { text: "charlie", italic: true },
    ])
  })
})

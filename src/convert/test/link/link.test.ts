import { check, serialize } from "../test-utils"

describe("link", () => {
  it("should convert a link", async () => {
    check("[alpha](https://localhost/alpha)", [
      {
        type: "paragraph",
        children: [
          { text: "" },
          {
            type: "anchor",
            href: "https://localhost/alpha",
            children: [{ text: "alpha" }],
          },
          { text: "" },
        ],
      },
    ])
  })

  it("should convert a link surrounded by text", async () => {
    check("alpha [bravo](https://localhost/bravo) charlie", [
      {
        type: "paragraph",
        children: [
          { text: "alpha " },
          {
            type: "anchor",
            href: "https://localhost/bravo",
            children: [{ text: "bravo" }],
          },
          { text: " charlie" },
        ],
      },
    ])
  })

  it("should convert two links surrounded by text", async () => {
    check(
      "alpha [bravo](https://localhost/bravo)[charlie](https://localhost/charlie) delta",
      [
        {
          type: "paragraph",
          children: [
            { text: "alpha " },
            {
              type: "anchor",
              href: "https://localhost/bravo",
              children: [{ text: "bravo" }],
            },
            { text: "" },
            {
              type: "anchor",
              href: "https://localhost/charlie",
              children: [{ text: "charlie" }],
            },
            { text: " delta" },
          ],
        },
      ]
    )
  })

  it("should convert two links surrounded by text one bold one italic", async () => {
    check(
      "alpha **[bravo](https://localhost/bravo)**_[charlie](https://localhost/charlie)_ delta",
      [
        {
          type: "paragraph",
          children: [
            { text: "alpha " },
            {
              type: "anchor",
              href: "https://localhost/bravo",
              children: [{ text: "bravo", bold: true }],
            },
            { text: "" },
            {
              type: "anchor",
              href: "https://localhost/charlie",
              children: [{ text: "charlie", italic: true }],
            },
            { text: " delta" },
          ],
        },
      ]
    )
  })

  it("should convert link with inner and outer marks", async () => {
    check("**[alpha _bravo_](https://localhost/alpha)**", [
      {
        type: "paragraph",
        children: [
          { text: "" },
          {
            type: "anchor",
            href: "https://localhost/alpha",
            children: [
              { text: "alpha ", bold: true },
              { text: "bravo", bold: true, italic: true },
            ],
          },
          { text: "" },
        ],
      },
    ])
  })

  it("should convert link with title tag", async () => {
    check(`**[alpha _bravo_](https://localhost/alpha "charlie")**`, [
      {
        type: "paragraph",
        children: [
          { text: "" },
          {
            type: "anchor",
            href: "https://localhost/alpha",
            title: "charlie",
            children: [
              { text: "alpha ", bold: true },
              { text: "bravo", bold: true, italic: true },
            ],
          },
          { text: "" },
        ],
      },
    ])
  })

  it("should convert link with title tag that is empty string", async () => {
    const markdown = serialize([
      {
        type: "paragraph",
        children: [
          { text: "" },
          {
            type: "anchor",
            href: "https://localhost/alpha",
            children: [
              { text: "alpha ", bold: true },
              { text: "bravo", bold: true, italic: true },
            ],
          },
          { text: "" },
        ],
      },
    ])
    expect(markdown).toEqual(`**[alpha _bravo_](https://localhost/alpha)**`)
  })

  it("should escape a title tag with a double quote", async () => {
    check(`**[alpha _bravo_](https://localhost/alpha "double\\"quote[]")**`, [
      {
        type: "paragraph",
        children: [
          { text: "" },
          {
            type: "anchor",
            href: "https://localhost/alpha",
            title: 'double"quote[]',
            children: [
              { text: "alpha ", bold: true },
              { text: "bravo", bold: true, italic: true },
            ],
          },
          { text: "" },
        ],
      },
    ])
  })

  it("should allow any other characters in title tag and not fail", async () => {
    check(`**[alpha _bravo_](https://localhost/alpha "[]()''")**`, [
      {
        type: "paragraph",
        children: [
          { text: "" },
          {
            type: "anchor",
            href: "https://localhost/alpha",
            title: "[]()''",
            children: [
              { text: "alpha ", bold: true },
              { text: "bravo", bold: true, italic: true },
            ],
          },
          { text: "" },
        ],
      },
    ])
  })

  it("should convert a link with a hash id to be without the link", async () => {
    /**
     * The conversion doesn't convert both ways equally but this is okay.
     *
     * Normally, we should never see an `href` starting with a `$` in the
     * markdown. It doesn't make sense there and the document to markdown
     * serializer won't create it.
     *
     * We use it here to simplify our testing.
     */
    check(
      "[alpha]($abc)",
      [
        {
          type: "paragraph",
          children: [
            { text: "" },
            {
              type: "anchor",
              href: "$abc",
              children: [{ text: "alpha" }],
            },
            { text: "" },
          ],
        },
      ],
      "alpha",
      [
        {
          type: "paragraph",
          children: [{ text: "alpha" }],
        },
      ]
    )
  })

  it("should convert a link with a hash id to be without the link", async () => {
    /**
     * Same as above but with surrounding text
     */
    check(
      "alpha [bravo]($abc) charlie",
      [
        {
          type: "paragraph",
          children: [
            { text: "alpha " },
            {
              type: "anchor",
              href: "$abc",
              children: [{ text: "bravo" }],
            },
            { text: " charlie" },
          ],
        },
      ],
      "alpha bravo charlie",
      [
        {
          type: "paragraph",
          children: [{ text: "alpha bravo charlie" }],
        },
      ]
    )
  })

  it("should convert a link with an image", async () => {
    check(
      "[![Image](https://example.com/image.png)](https://localhost/alpha)",
      [
        {
          type: "paragraph",
          children: [
            { text: "" },
            {
              type: "anchor",
              href: "https://localhost/alpha",
              children: [
                { text: "" },
                {
                  type: "image-inline",
                  url: "https://example.com/image.png",
                  title: undefined,
                  alt: "Image",
                  children: [{ text: "" }],
                },
                { text: "" },
              ],
            },
            { text: "" },
          ],
        },
      ]
    )
  })
})

interface EditorTheme {
  code: string;
  heading: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
  };
  image: string;
  link: string;
  list: {
    listitem: string;
    nested: {
      listitem: string;
    };
    ol: string;
    ul: string;
  };
  paragraph: string;
  placeholder: string;
  quote: string;
  text: {
    bold: string;
    code: string;
    hashtag: string;
    italic: string;
    overflowed: string;
    strikethrough: string;
    underline: string;
    underlineStrikethrough: string;
  };
}

const ExampleTheme: EditorTheme = {
  code: 'editor-code',
  heading: {
    h1: 'editor-heading-h1',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
    h4: 'editor-heading-h4',
    h5: 'editor-heading-h5',
  },
  image: 'editor-image',
  link: 'editor-link',
  list: {
    listitem: 'editor-listitem',
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
  },
  paragraph: 'editor-paragraph',
  placeholder: 'editor-placeholder',
  quote: 'editor-quote',
  text: {
    bold: 'editor-text-bold',
    code: 'editor-text-code',
    hashtag: 'editor-text-hashtag',
    italic: 'editor-text-italic',
    overflowed: 'editor-text-overflowed',
    strikethrough: 'editor-text-strikethrough',
    underline: 'editor-text-underline',
    underlineStrikethrough: 'editor-text-underlineStrikethrough',
  },
};

export default ExampleTheme;

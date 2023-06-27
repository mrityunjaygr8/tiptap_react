import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from '@tiptap/core';

export interface CurlyBoldOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    curlyBold: {
      /**
       * Set a bold mark
       */
      setCurlyBold: () => ReturnType;
      /**
       * Toggle a bold mark
       */
      toggleCurlyBold: () => ReturnType;
      /**
       * Unset a bold mark
       */
      unsetCurlyBold: () => ReturnType;
    };
  }
}

export const curlyBraceInputRegex = /(?:^|\s)((?:\{\{)((?:[^*]+))(?:\}\}))$/;
export const curlyBracePasteRegex = /(?:^|\s)((?:\{\{)((?:[^*]+))(?:\}\}))/g;

export const Bold = Mark.create<CurlyBoldOptions>({
  name: 'curly-bold',

  addOptions() {
    return {
      HTMLAttributes: {
        class: "tiptap--curly-bold--yoyo",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setCurlyBold:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleCurlyBold:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetCurlyBold:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-m': () => this.editor.commands.toggleCurlyBold(),
      'Mod-M': () => this.editor.commands.toggleCurlyBold(),
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: curlyBraceInputRegex,
        type: this.type,
      }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: curlyBracePasteRegex,
        type: this.type,
      }),
    ];
  },
});

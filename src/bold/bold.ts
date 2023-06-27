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
    bold: {
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
        style: {
          color: 'red',
        },
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
      'div',
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

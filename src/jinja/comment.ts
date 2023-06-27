import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from '@tiptap/core';

export interface JinjaCommentOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    jinjaComment: {
      /**
       * Set a bold mark
       */
      setJinjaComment: () => ReturnType;
      /**
       * Toggle a bold mark
       */
      toggleJinjaComment: () => ReturnType;
      /**
       * Unset a bold mark
       */
      unsetJinjaComment: () => ReturnType;
    };
  }
}

export const jinjaCommentInputRegex = /(?:^|\s)((?:\{\#)((?:[^*]+))(?:\#\}))$/;
export const jinjaCommentPasteRegex = /(?:^|\s)((?:\{\#)((?:[^*]+))(?:\#\}))/g;

export const JinjaComment = Mark.create<JinjaCommentOptions>({
  name: 'jinja-comment',

  addOptions() {
    return {
      HTMLAttributes: {
        class: "tiptap--jinja--comment",
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
      setJinjaComment:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleJinjaComment:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetJinjaComment:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-#': () => this.editor.commands.toggleJinjaComment(),
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: jinjaCommentInputRegex,
        type: this.type,
      }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: jinjaCommentPasteRegex,
        type: this.type,
      }),
    ];
  },
});

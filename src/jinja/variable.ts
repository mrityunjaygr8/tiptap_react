import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from '@tiptap/core';

export interface JinjaVariableOptions {
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

export const jinjaVariableInputRegex = /(?:^|\s)((?:\{\{)((?:[^*]+))(?:\}\}))$/;
export const jinjaVariablePasteRegex = /(?:^|\s)((?:\{\{)((?:[^*]+))(?:\}\}))/g;

export const JinjaVariable = Mark.create<JinjaVariableOptions>({
  name: 'jinja-variable',

  addOptions() {
    return {
      HTMLAttributes: {
        class: "tiptap--jinja--variable",
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
      'Mod-V': () => this.editor.commands.toggleJinjaComment(),
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: jinjaVariableInputRegex,
        type: this.type,
      }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: jinjaVariablePasteRegex,
        type: this.type,
      }),
    ];
  },
});

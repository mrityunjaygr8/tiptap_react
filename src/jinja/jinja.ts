import { Extension } from '@tiptap/core'
import { JinjaVariable, JinjaVariableOptions } from './variable';
import { JinjaComment, JinjaCommentOptions } from './comment';

export interface JinjaOptions {
  jinjaVariable:  Partial<JinjaVariableOptions> | false
  jinjaComment: Partial<JinjaCommentOptions> | false
}

export const Jinja = Extension.create<JinjaOptions>({
  name: "jinja2",
  addExtensions() {
    const extensions = [];

    if (this.options.jinjaVariable !== false) {
      extensions.push(JinjaVariable.configure(this.options?.jinjaVariable))
    }
    if (this.options.jinjaComment !== false) {
      extensions.push(JinjaComment.configure(this.options?.jinjaComment))
    }

    return extensions
  }
})

module Jekyll
  class RenderMermaidTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text.strip
    end

    def render(context)
      "<div class=\"mermaid\">#{@text}</div>"
    end
  end
end

Liquid::Template.register_tag('mermaid', Jekyll::RenderMermaidTag)

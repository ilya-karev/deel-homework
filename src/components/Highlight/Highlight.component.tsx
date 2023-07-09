import React from "react"

import './Highlight.styles.css';

type HighlightProps = {
  text: string, 
  highlight: string
}
const Highlight = React.memo(({ text, highlight }: HighlightProps) => {
  if (!highlight) return <span>{text}</span>
  else {
    const regexp = new RegExp(highlight, "i")
    const highlightStart = text.match(regexp)?.index
    if (highlightStart === undefined) return <span>{text}</span>

    const start = text.slice(0, highlightStart)
    const highlighted = text.slice(highlightStart, highlightStart + highlight.length)
    const end = text.slice(highlightStart + highlight.length)


    return (
      <span>
        {start}
        <span className="highlighted">{highlighted}</span>
        {end}
      </span>
    )
  }
})

export default Highlight

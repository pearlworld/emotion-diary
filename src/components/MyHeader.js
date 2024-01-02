const MyHeader = ({ headText, leftChild, rightChild }) => {
  return (
    <header className="header">
      <div className="header_inner">
        <div className="head_left">
          {leftChild}
        </div>
        <div className="head_text">
          {headText}
        </div>
        <div className="head_right">
          {rightChild}
        </div>
      </div>

    </header>
  )
}

export default MyHeader
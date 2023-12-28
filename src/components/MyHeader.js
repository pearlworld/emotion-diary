const MyHeader = ({headText,leftChild,rightChild}) => {
  return(
    <header className="header">
      <div className="header_inner">
        <div className="head_btn_left">
          {leftChild}
        </div>
        <h2 className="head_text">
          {headText}
        </h2>
        <div className="head_btn_right">
          {rightChild}
        </div>
      </div>
      
    </header>
  )
}

export default MyHeader
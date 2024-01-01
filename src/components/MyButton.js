const MyButton = ({ text, type, onclick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button className={["Mybutton", `MyButton_${btnType}`].join(" ")} onClick={onclick}>{text}</button>
  )
}

MyButton.defaultProps = {
  type: "default",
};

export default MyButton
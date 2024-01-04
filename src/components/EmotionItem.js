const EmotionItem = ({
  emotion_id,
  emotion_descript,
  emotion_img,
  onClick,
  isSelected
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)} className={[
        "emotion_item",
        isSelected ? `emotion_on_${emotion_id}` : `emotion_off`
      ].join(" ")}>
      <img src={emotion_img} />
      <span className="emotion_name">{emotion_descript}</span>
    </div>
  )
}

export default EmotionItem
function EmotionItem({ emotion_id, emotion_descript, emotion_img }) {
  return (
    <div className="emotion_item">
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  )
}

export default EmotionItem
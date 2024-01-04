function EmotionItem({ emotion_id, emotion_descript, emotion_img, onClick }) {
  return (
    <div onClick={() => onClick(emotion_id)} className="emotion_item">
      <img src={emotion_img} />
      <span className="emotion_name">{emotion_descript}</span>
    </div>
  )
}

export default EmotionItem
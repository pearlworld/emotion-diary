import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DiaryStateContext } from '../App'

// Component
import MyHeader from '../components/MyHeader'
import MyButton from '../components/MyButton'
import { getStringDate } from '../util/date'
import { emotionList } from '../util/emotion'

const Diary = () => {
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();


  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  }, [])

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
      if (targetDiary) {
        setData(targetDiary)
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }

  }, [id, diaryList]);

  if (!data) {
    return <div className='loading'>로딩중입니다..</div>
  } else {

    const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion));
    console.log(curEmotionData);

    return (
      <div className='diaryDetail'>
        <MyHeader
          headText={`${getStringDate(new Date(data.date))}의 일기`}
          leftChild={<MyButton text={"< 뒤로가기"}
            onClick={() => navigate(-1)} />}
          rightChild={<MyButton text={"수정하기"}
            onClick={() => navigate(`/edit/${data.id}`)} />} />
        <div className='detail_inner'>
          <div className='detail_emotion'>
            <h3>오늘의 감정</h3>
            <img src={curEmotionData.emotion_img}></img>
            <p className='emotion_name'>
              {curEmotionData.emotion_descript}</p>
          </div>
          <div className='detail_content'>
            <p>{data.content}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Diary;

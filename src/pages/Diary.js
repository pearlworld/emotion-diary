import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DiaryStateContext } from '../App'
import { getStringDate } from '../util/date'
import MyHeader from '../components/MyHeader'

const Diary = () => {
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

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
    return (
      <div className='diaryDetail'>
        <MyHeader headText={"일기 상세"} />
      </div>
    )
  }
}

export default Diary;

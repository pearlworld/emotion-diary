import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DiaryDispatchContext } from '../App'

import MyButton from './MyButton'
import MyHeader from './MyHeader'
import EmotionItem from './EmotionItem';

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: '완전 좋음'
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: '좋음'
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: '보통'
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: '나쁨'
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: '완전 나쁨'
  }
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  }
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    // list - 목록, view - 상세
    <div>
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"}
            onClick={() => navigate(-1)} />
        } />
      <div className='form_body'>
        <div className='form_row'>
          <h4 className='form_title'>🗓️ Today</h4>
          <input
            className='form_date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type='date'
          />
        </div>
        <div className='form_row'>
          <h4 className='form_title'>🎈 오늘의 감정</h4>
          <div className='emotion_list'>
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id} {...it}
                onClick={handleClickEmotion}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </div>
        <div className='form_row'>
          <h4 className='form_title'>📃 오늘의 일기</h4>
          <div className='form_content'>
            <textarea
              placeholder='오늘은 어땠나요?'
              value={content}
              ref={contentRef}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='form_foot'>
        <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
        <MyButton
          text={"작성완료"}
          type={"positive"}
          onClick={handleSubmit} />
      </div>
    </div>
  )
}

export default DiaryEditor
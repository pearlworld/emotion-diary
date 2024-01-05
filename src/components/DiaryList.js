import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyButton from './MyButton'
import DiaryItem from './DiaryItem'

// 날짜순 셀렉박스
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" }
]

// 감정순 셀렉박스
const filterOptionList = [
  { value: "all", name: "전체" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" }
]

// 셀렉박스 컴포넌트
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className='selecBox'
      value={value}
      onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  )
}

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest"); // 날짜순 상태관리
  const [filter, setFilter] = useState("all"); // 감정순 상태관리

  const getProcessedDiaryList = () => {

    // 날짜별 비교 함수
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    }

    // 감정순 비교 함수
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    }

    const copyList = JSON.parse(JSON.stringify(diaryList)); // 리스트 복사

    const filteredList = filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare); // 리스트 출력
    return sortedList;
  }

  return (
    <main>
      <div className='list_head'>
        <div className='left_col'>
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className='right_col'>
          <MyButton type={'positive'} text={"새 일기 쓰기"} onClick={() => navigate("/new")} />
        </div>
      </div>
      <div className='list_body'>
        {getProcessedDiaryList().length !== 0 ? (
          getProcessedDiaryList().map((it, idx) => (
            <DiaryItem key={it.id} {...it} />
          ))
        ) : (
          <div className='nodata'>
            <p>이번 달 일기가 아직 없습니다.</p>
          </div>
        )}


      </div>
    </main>
  )
}

DiaryList.defaultProps = {
  diaryList: [],
}

export default DiaryList
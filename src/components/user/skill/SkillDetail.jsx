import styled from 'styled-components'

export const SkillDetail = ({ item, clicked }) => {
  console.log(clicked)
  console.log(item)
  
  if (!item) { // 스킬 정보가 없는 경우를 처리
    return <SelectContainer>스킬을 선택해주세요.</SelectContainer>
  }

  return (
    <Container>
        <div style={{ position: 'relative' }}>
          {clicked && <PinImage/>}
        </div>
      <SkillNameWrap>
        <h2> {/* 스킬 이름 */}
          <SkillName>{item.skill_name}</SkillName>
        </h2>
      </SkillNameWrap>
      <IconWrap>
        <IconImage>
          <img src={item.skill_icon} alt="icon" /> 
        </IconImage>
      </IconWrap>
      <SkillDescriptionWrap>
        <div>{item.skill_description}</div>
      </SkillDescriptionWrap>
      <SkillEffect Data={item.skill_effect}>
        <div>{item.skill_effect}</div>
      </SkillEffect>
    </Container>
  )
}


const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 290px;
  height: 50px;
  color: white; 
  padding: 0px 10px;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  font-family: maple-light;
`

const Container = styled.div`
  width: 290px;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  line-height: 18px;
  color: white; 
  padding: 0px 10px;
  padding-bottom: 10px;
`
const SkillNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px dotted rgb(55, 56, 58);
  h2{
    font-size: 16px;
    padding: 10px 0;
    line-height: 24px;
    text-align: center;
  }
`

const SkillName = styled.div`
  
`



const IconWrap = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px dotted rgb(55, 56, 58);
`

const IconImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 75px;
  background-color: white;
  border-radius: 10px;
  img{
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

`


const PinImage = styled.div`
  position: absolute;
  top: -5px;
  left: -10px;
  width: 11px;
  height: 10px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;
  transform: rotate(45deg);
`;




const SkillDescriptionWrap = styled.div`
  font-size: 13px;
  white-space: pre-wrap;
`

const SkillEffect = styled.div`
  font-size: 13px;
  white-space: pre-wrap;
  ${({ Data }) => Data && `margin-top: 10px;`}
  
`
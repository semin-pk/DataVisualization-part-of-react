import './App.css';

import React from "react"
import ToDo from "./ToDo"
import Sample from "./Sample"
import {Paper, List, Container} from "@material-ui/core"
import AddToDo from './AddToDo';
class App extends React.Component {
  constructor(props){
    super(props)
    //this.state = {item={id : 0, "title":"Hello React", "done" : true}}
    //Ap.js 에 this.state.item 이라는 이름으로 데이터를 생성
    //ToDo에게 item이라는 이름으로 데이터를 전달
    //3개의 객체를 가진 배열 생성
    this.state = {
      items:[]
    }
  }
    //화면이 보여질 때 마다 호출되는 수명주기 함수
  componentDidMount(){
    //ajax 요청 객체 생성
    let request = new XMLHttpRequest()
    //요청 준비
    request.open('GET', 'http://127.0.0.1:8000/list');
    //요청
    request.send('');
    //응답처리
    request.addEventListener('load', () =>{
      //json 데이터 출력
      
      //console.log(request.responseText)
      //JSON 문자열을 데이터로 변환
      let data = JSON.parse(request.responseText);
      console.log(data)
      //서버에서 받아온 데이터를 state에 저장
      this.setState({items : data.list})
    })
  }

  add = (item) => {
    //react는 props는 수정할 수 없고
    //state는 수정이 가능하지만 원본은 직접 수정하는 것은 안되고
    //setState 메서드를 이용해서만 수정이 가능합니다.
    //배열에 데이터를 추가하기 위해서 state의 배열을 복사
    const thisItems = this.state.items;
    //item의 id와 done값을 설정 - title 만 입력하기 때문
    item.id = "ID-" + thisItems.length;
    item.done = false;
    //복사한 데이터에 데이터를 추가
    thisItems.push(item)
    //복사한 데이터를 다시 state에 적용
    this.setState({items:thisItems})
  } 
  delete = (item) => {
    //state나 props 의 데이터는 직접 편집이 안됩니다.
    const thisItems = this.state.items;
    //복사본에서 item를 제거
    //filter 함수는 리턴 타입이 boolean 함수를 매개변수로 받아서
    //리턴 결과가 true인 데이터만 모아서 배열로 리턴하는 함수.
    const newItems = thisItems.filter((e) => e.id !== item.id)

    //원본에 다시 복사
    this.setState({items:newItems})
  }
  select = (item) => {
    let request = new XMLHttpRequest()
    //요청 준비
    const url = 'http://127.0.0.1:8000/todo/?userid=VT-21700'
    request.open('GET', url);
    //요청
    request.send('');
    //응답처리
    request.addEventListener('load', () =>{
      //json 데이터 출력
      
      //console.log(request.responseText)
      //JSON 문자열을 데이터로 변환
      let data = JSON.parse(request.responseText);
      console.log(data)
      //서버에서 받아온 데이터를 state에 저장
      this.setState({selectitem : data.list})
    })
  }
  render(){
    //배열을 순회하면서 출력할 내용을 생성
    //배열을 순회하면서 출력물을 만들 때는 key를 설정해주어야 함.
    //key를 설정하지않으면 출력에 문제가 없지만 콘솔에 에러가 출력
    //let display = this.state.items.length > 0 && (
    //  <Paper style = {{margin:16}}>
    //    <List>
    //      {this.state.items.map((item, idx) =>( 
    //        <ToDo item = {item} key = {idx} delete ={this.delete}/>
    //      ))}
    //    </List>
    //  </Paper>
    //)
  
    return(
      <div className = "App">
        <Container>
          <AddToDo add = {this.add} />
          <ToDo item = {this.state.items} select = {this.select} />
        </Container>
      </div>
    )
  }
}
export default App

